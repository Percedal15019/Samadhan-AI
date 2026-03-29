from transformers import pipeline

# Load sentiment model
sentiment_model = pipeline("sentiment-analysis")

def analyze_sentiment(text):
    result = sentiment_model(text)[0]
    
    label = result["label"]
    score = result["score"]
    
    return {
        "sentiment": label,
        "confidence": round(score, 2)
    }

def get_priority(sentiment, text):
    text = text.lower()
    
    if "fraud" in text or "unauthorized" in text:
        return "CRITICAL"
    
    if sentiment == "NEGATIVE":
        return "HIGH"
    elif sentiment == "POSITIVE":
        return "LOW"
    else:
        return "MEDIUM"

# Test
if __name__ == "__main__":
    test = [
        "ATM didn't give cash, very bad service",
        "Transaction completed successfully",
        "UPI failed again, frustrated"
    ]
    
    for t in test:
        print(f"\nComplaint: {t}")
        print(analyze_sentiment(t))