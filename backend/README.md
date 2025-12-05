# Dog Behavior Video Analysis Backend

This backend service uses Google's Gemini AI to analyze dog behavior videos and provide comprehensive behavioral assessments.

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or using a virtual environment (recommended):

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure API Key

Your Google Gemini API key is already configured in the `.env` file:
```
GOOGLE_API_KEY=AIzaSyDY3oS_gbCM8o5HzhPmFEyQPxBPZng47EE
```

**Important Security Notes:**
- The `.env` file is in `.gitignore` to prevent accidentally committing your API key
- Never share your API key publicly
- If you need a new API key, visit: https://makersuite.google.com/app/apikey

### 3. Run the Backend Server

From the `backend` directory, run:

```bash
python3 main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload
```

The server will start on `http://localhost:8000`

You should see:
```
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### 4. Stop the Server

Press `CTRL+C` in the terminal where the server is running.

## Testing the API

Visit these URLs to verify the server is running:
- http://localhost:8000 - API root (returns: `{"message": "Dog Behavior Analysis API"}`)
- http://localhost:8000/docs - Interactive API documentation (Swagger UI)

## API Endpoints

### POST /analyze-videos/

Upload multiple dog behavior videos for analysis.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Multiple video files with key "files"

**Response:**
```json
{
  "individual_analyses": [
    {
      "video_name": "video1.mp4",
      "analysis": {
        "aggression_level": "Moderate",
        "triggers": "hand near bowl",
        "warnings_given": "growling, stiffness",
        "bite_contact": false,
        "description": "Dog showed moderate warning signs when approached during feeding."
      }
    }
  ],
  "comprehensive_analysis": {
    "overall_aggression_level": "Moderate",
    "common_triggers": ["hand near bowl", "touching paws"],
    "warning_patterns": "Consistent growling and body stiffness",
    "bite_risk_assessment": "Medium",
    "recommendations": [
      "Avoid approaching during feeding time",
      "Use positive reinforcement training",
      "Consult with a professional dog behaviorist"
    ],
    "summary": "The dog displays moderate aggression primarily during resource guarding situations."
  }
}
```

## Customizing the Analysis Prompts

The AI prompts can be customized in `main.py`:

1. **Individual video analysis prompt** (line 43-54)
2. **Comprehensive synthesis prompt** (line 84-97)

Look for the comment `# Define the Prompt` in the code.

## Troubleshooting

### "GOOGLE_API_KEY not found" error
- Ensure the `.env` file exists in the backend directory
- Check that `.env` contains: `GOOGLE_API_KEY=your_actual_key`

### "Video processing failed" error
- Ensure the video format is supported (mp4, mov, avi, etc.)
- Verify your API key has sufficient quota

### CORS errors
- Make sure the frontend runs on `http://localhost:5173` (Vite default)
- To change the allowed origin, edit the CORS settings in `main.py` (line 18)

### Module not found errors
- Install all dependencies: `pip install -r requirements.txt`
- Use Python 3.8 or higher

## Development Notes

- The backend uses **FastAPI** for the REST API
- Videos are uploaded to **Google Gemini API** for analysis
- The model used is **gemini-2.5-flash**
- Temporary files are automatically cleaned up after processing
