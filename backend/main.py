from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import google.generativeai as genai
import time
import os
import tempfile
import shutil
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://cs-160-project.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")

genai.configure(api_key=GOOGLE_API_KEY)


def analyze_single_video(video_path: str) -> dict:
    print(f"Uploading {video_path}...")
    video_file = genai.upload_file(path=video_path)

    while video_file.state.name == "PROCESSING":
        print('.', end='')
        time.sleep(2)
        video_file = genai.get_file(video_file.name)

    if video_file.state.name == "FAILED":
        raise ValueError("Video processing failed.")

    # Define the Prompt
    prompt = """
    You are an expert canine behaviorist conducting a clinical assessment of a dog.
    Analyze the provided video carefully, paying attention to micro-signals, body language, and context.
    Your task is to generate a detailed safety assessment.
    Output a JSON object with the following fields:
    - aggression_level: (None, Moderate, or Severe),
    - warning_patterns: A string describing warning patterns the dog is displaying (separate multiple patterns with commas and spaces, e.g., "Growling, Snapping, Lunging")
    - description: A 3-sentence summary of the behavior.

    Return ONLY the JSON object, no additional text.
    """

    model = genai.GenerativeModel(model_name="models/gemini-2.5-flash")

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = model.generate_content([video_file, prompt])
            break
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"\nRetry {attempt + 1}/{max_retries - 1} after error: {str(e)}")
                time.sleep(2)
            else:
                genai.delete_file(video_file.name)
                raise

    genai.delete_file(video_file.name)

    try:
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()

        return json.loads(response_text)
    except json.JSONDecodeError:
        return {
            "error": "Failed to parse JSON",
            "raw_response": response.text
        }


def synthesize_analysis(video_analyses: List[dict]) -> dict:
    summary_text = "Here are the individual video analyses:\n\n"
    for i, analysis in enumerate(video_analyses, 1):
        summary_text += f"Video {i}:\n{json.dumps(analysis, indent=2)}\n\n"

    # Define the Prompt
    prompt = f"""
    {summary_text}

    Based on these multiple dog behavior assessments, provide a comprehensive behavioral profile in JSON format with these fields:
    - overall_aggression_level: (None, Mild, Moderate, or Severe)
    - warning_patterns: A string describing common warning signs the dog displays (separate multiple patterns with commas and spaces, e.g., "Growling, Snapping, Lunging, Attempting to bite")
    - summary: (2-3 sentence comprehensive behavioral assessment)

    Return ONLY the JSON object, no additional text.
    """

    model = genai.GenerativeModel(model_name="models/gemini-2.5-flash")
    response = model.generate_content(prompt)

    try:
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()

        return json.loads(response_text)
    except json.JSONDecodeError:
        return {
            "error": "Failed to parse JSON",
            "raw_response": response.text
        }


@app.get("/")
async def root():
    return {"message": "Dog Behavior Analysis API"}


@app.post("/analyze-videos/")
async def analyze_videos(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")

    video_analyses = []
    temp_dir = tempfile.mkdtemp()

    try:
        for i, file in enumerate(files):
            temp_file_path = os.path.join(temp_dir, f"video_{i}_{file.filename}")
            with open(temp_file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            try:
                analysis = analyze_single_video(temp_file_path)
                video_analyses.append({
                    "video_name": file.filename,
                    "analysis": analysis
                })
            except Exception as e:
                video_analyses.append({
                    "video_name": file.filename,
                    "error": str(e)
                })

        comprehensive_analysis = synthesize_analysis([v["analysis"] for v in video_analyses if "analysis" in v])

        return {
            "individual_analyses": video_analyses,
            "comprehensive_analysis": comprehensive_analysis
        }

    finally:
        shutil.rmtree(temp_dir)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
