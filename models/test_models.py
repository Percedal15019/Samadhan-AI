import pickle

# Load model
with open("models/model.pkl", "rb") as f:
    model = pickle.load(f)

# Load vectorizer
with open("models/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Test inputs
tests = [
    "Money deducted but ATM didn't give cash",
    "UPI transaction failed",
    "My card is blocked",
    "Fraud transaction happened"
]

for t in tests:
    vec = vectorizer.transform([t])
    pred = model.predict(vec)[0]
    print(f"\nComplaint: {t}")
    print(f"Predicted Category: {pred}")