import pandas as pd
import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# 1. Load dataset
df = pd.read_csv("data/complaints_150_with_categories.csv")

# 2. Remove rows without category
df = df.dropna(subset=["category"])

# 3. Features and labels
X = df["complaint"]
y = df["category"]

# 4. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. Convert text to vectors
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# 6. Train model
model = LogisticRegression()
model.fit(X_train_vec, y_train)

# 7. Evaluate model
y_pred = model.predict(X_test_vec)

print("\n📊 Model Evaluation:\n")
print(classification_report(y_test, y_pred))

# 8. Save model
with open("models/model.pkl", "wb") as f:
    pickle.dump(model, f)

# 9. Save vectorizer
with open("models/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("\n✅ Model and vectorizer saved successfully!")