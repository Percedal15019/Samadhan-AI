import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

# Load data
df = pd.read_csv("data/complaints_150.csv")

# Text data
texts = df["complaint"]

# Convert text → vectors
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# Apply clustering
k = 5  # number of clusters
model = KMeans(n_clusters=k, random_state=42)

df["cluster"] = model.fit_predict(X)

# Show results
for i in range(k):
    print(f"\n🔹 Cluster {i}:")
    cluster_data = df[df["cluster"] == i]["complaint"].head(5)
    
    for c in cluster_data:
        print("-", c)