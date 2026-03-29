import pandas as pd

# Load dataset (WITH categories)
df = pd.read_csv("data/complaints_150_with_categories.csv")

# Convert date column
df["date"] = pd.to_datetime(df["date"])

# Remove rows without category
df = df.dropna(subset=["category"])

# Count complaints per day per category
daily_category_counts = df.groupby(["date", "category"]).size().reset_index(name="count")

print("\n📊 Daily Category Counts:\n")
print(daily_category_counts.head())

# Detect spikes per category
print("\n🚨 Category-wise Spikes:\n")

# Loop through each category
for category in df["category"].unique():
    
    category_data = daily_category_counts[daily_category_counts["category"] == category]
    
    mean = category_data["count"].mean()
    threshold = mean * 1.5
    
    spikes = category_data[category_data["count"] > threshold]
    
    if not spikes.empty:
        print(f"\n🔴 {category} SPIKES:")
        
        for _, row in spikes.iterrows():
            print(f"Date: {row['date'].date()} | Complaints: {row['count']}")