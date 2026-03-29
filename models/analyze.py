import pickle
from sentiment import analyze_sentiment, get_priority
from response_generator import generate_response

# 🔹 Load classifier model
with open("models/model.pkl", "rb") as f:
    model = pickle.load(f)

# 🔹 Load vectorizer
with open("models/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)


def analyze_complaint(text):
    # 1️⃣ Category prediction
    vec = vectorizer.transform([text])
    category = model.predict(vec)[0]

    # 2️⃣ Sentiment analysis
    sentiment_result = analyze_sentiment(text)
    sentiment = sentiment_result["sentiment"]

    # 3️⃣ Priority calculation
    priority = get_priority(sentiment, text)

    # Response generator
    response = generate_response(category, sentiment, priority)

    return {
        "complaint": text,
        "category": category,
        "sentiment": sentiment,
        "priority": priority,
        "response": response
    }


# 🔹 Test block
if __name__ == "__main__":
    tests = [
        "ATM didn't give cash but money deducted",
        "UPI failed again, very frustrating",
        "Fraud transaction happened in my account",
        "Loan processing is slow"
    ]

    for t in tests:
        result = analyze_complaint(t)

        print("\n==============================")
        print("Complaint:", result["complaint"])
        print("Category:", result["category"])
        print("Sentiment:", result["sentiment"])
        print("Priority:", result["priority"])
        print("Response:", result["response"])