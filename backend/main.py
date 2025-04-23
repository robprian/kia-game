from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import json
import os
from pathlib import Path

app = FastAPI(title="EduSakti API")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load manifest data
def load_manifest():
    manifest_path = Path(__file__).parent / "manifest.json"
    try:
        with open(manifest_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"levels": {}, "subjects": {}, "questions": {}}

# Models
class Question(BaseModel):
    subject: str
    question: str

class ExamSession(BaseModel):
    level: str
    subject: str
    questions: List[Dict]

class ExamSubmission(BaseModel):
    session_id: str
    answers: List[Dict]

# Routes
@app.get("/levels")
async def get_levels():
    manifest = load_manifest()
    return {"levels": manifest.get("levels", {})}

@app.post("/ask")
async def ask_question(question: Question):
    # Mock AI response - In production, integrate with an AI service
    return {
        "answer": f"Here is the answer for your {question.subject} question: {question.question}",
        "confidence": 0.95
    }

@app.post("/exam/start")
async def start_exam(level: str, subject: str):
    manifest = load_manifest()
    questions = manifest.get("questions", {}).get(level, {}).get(subject, [])
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found for this level and subject")
    
    # In production, store session in database
    return {
        "session_id": "mock-session-123",
        "questions": questions,
        "time_limit": 3600  # 1 hour in seconds
    }

@app.post("/exam/submit")
async def submit_exam(submission: ExamSubmission):
    # Mock grading logic - In production, implement proper grading
    return {
        "score": 85,
        "max_score": 100,
        "feedback": [
            {"question_id": 1, "correct": True, "explanation": "Your answer was correct because..."},
            {"question_id": 2, "correct": False, "explanation": "The correct answer should be..."}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
