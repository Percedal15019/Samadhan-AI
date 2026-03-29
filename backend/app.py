from fastapi import FastAPI
from pydantic import BaseModel
import pickle

# Import your modules
from models.sentiment import analyze_sentiment, get_priority
from models.response_generator import generate_response

# Create app
app = FastAPI()

# Load model
with open("models/model.pkl", "rb") as f:
    model = pickle.load(f)

# Load vectorizer
with open("models/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)


# Request format
class Complaint(BaseModel):
    complaint: str


# Root route
@app.get("/")
def home():
    return {"message": "Samadhan AI Backend Running"}


# Main API
@app.post("/analyze")
def analyze(data: Complaint):
    
    text = data.complaint

    # 🔹 Category
    vec = vectorizer.transform([text])
    category = model.predict(vec)[0]

    # 🔹 Sentiment
    sentiment_result = analyze_sentiment(text)
    sentiment = sentiment_result["sentiment"]

    # 🔹 Priority
    priority = get_priority(sentiment, text)

    # 🔹 Response
    response = generate_response(category, sentiment, priority)

    return {
        "complaint": text,
        "category": category,
        "sentiment": sentiment,
        "priority": priority,
        "response": response
    }