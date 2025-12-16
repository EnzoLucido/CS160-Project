# CS160-Project - Dog Shelter Matching App

A full-stack web application that helps dog owners find suitable shelter dogs by analyzing their own dog's behavior through AI-powered video analysis. The app uses Google's Gemini AI to assess dog behavior from videos and provides comprehensive behavioral profiles for better shelter matching.

## Features

- **AI-Powered Behavior Analysis**: Upload videos of your dog in various scenarios (eating, walking, playing, interacting with children/animals)
- **Comprehensive Assessment**: Get detailed aggression levels, trigger identification, and behavioral recommendations
- **Find a Shelter**: Search for dog shelters near you
- **Shelter Details**: View shelter information including address, phone, and website
- **Send Dog Information**: Send your dog's behavioral profile to shelters for matching
- **My Dogs**: Manage your dog profiles and video analyses
- **Profile**: View and edit your user profile
- **Status Tracking**: Monitor the status of your dog information sent to shelters

## Prerequisites

Before running this project, make sure you have the following installed:

### Frontend Requirements
- **Node.js** (version 20.19.0 or higher, or 22.12.0 or higher)
  - Check your version: `node --version`
  - Download from: https://nodejs.org/
- **npm** (comes with Node.js)
  - Check your version: `npm --version`

### Backend Requirements
- **Python** (version 3.8 or higher)
  - Check your version: `python3 --version`
  - Download from: https://www.python.org/
- **pip** (comes with Python)
  - Check your version: `pip --version`

### API Key
- **Google Gemini API Key**
  - Get your free API key from: https://makersuite.google.com/app/apikey

## Quick Start Guide

Follow these steps to get the application running:

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd CS160-Project
```

### Step 2: Set Up the Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure your API key**:
   - Create a `.env` file in the `backend` directory (if it doesn't exist)
   - Add your Google Gemini API key:
     ```
     GOOGLE_API_KEY=your_actual_api_key_here
     ```
   - **Security Note**: Never commit your `.env` file to version control

5. **Start the backend server**:
   ```bash
   python3 main.py
   ```

   Or using uvicorn directly:
   ```bash
   uvicorn main:app --reload
   ```

   The backend server will start on **http://localhost:8000**

   You should see:
   ```
   INFO:     Started server process [xxxxx]
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   ```

6. **Verify the backend is running**:
   - Visit http://localhost:8000 (should show: `{"message": "Dog Behavior Analysis API"}`)
   - Visit http://localhost:8000/docs for interactive API documentation

### Step 3: Set Up the Frontend

1. **Open a new terminal** (keep the backend running in the first terminal)

2. **Navigate to the React app directory**:
   ```bash
   cd react-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will start on **http://localhost:5173**

   The development server includes:
   - Hot Module Replacement (HMR) - changes appear instantly without refresh
   - Fast refresh for React components
   - Detailed error messages in the browser

### Step 4: Use the Application

1. Open your browser and go to **http://localhost:5173**
2. Upload videos of your dog in different scenarios
3. Get AI-powered behavioral analysis
4. Search for shelters and send your dog's profile for matching

**Important**: Both the backend (port 8000) and frontend (port 5173) must be running simultaneously for the app to work properly.

## Project Structure

```
CS160-Project/
├── backend/
│   ├── main.py                       # FastAPI backend server
│   ├── requirements.txt              # Python dependencies
│   ├── .env                          # API key configuration (not in git)
│   └── README.md                     # Backend documentation
├── react-app/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Home page with feature cards
│   │   │   ├── ShelterSearch.jsx     # Shelter search page
│   │   │   ├── ShelterDetail.jsx     # Shelter details page
│   │   │   ├── Confirmation.jsx      # Confirmation page
│   │   │   └── ...                   # Other pages
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── main.jsx                  # Application entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── index.html                    # HTML template
│   ├── package.json                  # Dependencies and scripts
│   └── vite.config.js               # Vite configuration
├── animals/                          # Sample video files
├── eating/                           # Sample eating behavior videos
└── README.md                         # This file
```

## Technologies Used

### Frontend
- **React** 19.2.0 - UI library
- **React Router DOM** 7.9.6 - Client-side routing
- **Vite** 7.2.4 - Build tool and dev server
- **ESLint** - Code linting and quality

### Backend
- **FastAPI** - Modern Python web framework
- **Google Generative AI** - Gemini 2.5 Flash model for video analysis
- **Uvicorn** - ASGI server
- **Python-dotenv** - Environment variable management

## API Documentation

### Backend Endpoints

#### POST /analyze-videos/

Upload multiple dog behavior videos for AI analysis.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Multiple video files with key "files"

**Response:**
```json
{
  "individual_analyses": [
    {
      "video_name": "eating.mp4",
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

## Available Scripts

### Frontend (from `react-app` directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

### Backend (from `backend` directory)
- `python3 main.py` - Start the FastAPI server
- `uvicorn main:app --reload` - Start with auto-reload on code changes

## Troubleshooting

### Backend Issues

#### "GOOGLE_API_KEY not found" error
- Ensure the `.env` file exists in the `backend` directory
- Check that `.env` contains: `GOOGLE_API_KEY=your_actual_key`
- Make sure there are no extra spaces or quotes around the key

#### "Video processing failed" error
- Ensure the video format is supported (mp4, mov, avi, etc.)
- Verify your API key has sufficient quota
- Check that the video file is not corrupted

#### Module not found errors
- Make sure you've activated your virtual environment
- Install all dependencies: `pip install -r requirements.txt`
- Use Python 3.8 or higher

#### Port 8000 already in use
- Stop any other processes using port 8000
- Or modify the port in `main.py` (change `uvicorn.run(app, host="0.0.0.0", port=8000)`)

### Frontend Issues

#### Port 5173 already in use
- Vite will automatically try the next available port (5174, 5175, etc.)
- Or manually specify a port in `vite.config.js`

#### Dependencies not installing
Try clearing npm cache and reinstalling:
```bash
cd react-app
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Node version issues
Make sure you're using Node.js version 20.19.0+ or 22.12.0+. You can use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:
```bash
nvm install 22
nvm use 22
```

#### CORS errors
- Make sure the backend is running on `http://localhost:8000`
- Make sure the frontend is running on `http://localhost:5173`
- Check CORS settings in `backend/main.py` if you've changed ports

### General Issues

#### Videos not uploading
- Check that both frontend and backend servers are running
- Verify the backend URL in the frontend code matches `http://localhost:8000`
- Check browser console for error messages

#### Analysis not working
- Verify your Google Gemini API key is valid and has quota
- Check the backend terminal for error messages
- Ensure video files are in a supported format

## Customizing the AI Analysis

You can customize the AI prompts in `backend/main.py`:

1. **Individual video analysis prompt** (around line 43-54)
2. **Comprehensive synthesis prompt** (around line 84-97)

Look for the comment `# Define the Prompt` in the code to modify how the AI analyzes videos.

## Security Notes

- The `.env` file is in `.gitignore` to prevent accidentally committing your API key
- Never share your API key publicly
- Never commit the `.env` file to version control
- If your API key is exposed, regenerate it immediately at https://makersuite.google.com/app/apikey

## License

This project is for educational purposes as part of CS160.