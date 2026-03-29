import streamlit as st
import pandas as pd
import requests

st.title("🏦 Samadhan AI - Complaint Intelligence System")


# 🧠 SECTION 1: ANALYZER


st.header("Quick Complaint Analyzer")

complaint = st.text_area("Enter Customer Complaint")

if st.button("Analyze Complaint"):
    response = requests.post(
        "http://127.0.0.1:8000/analyze",
        json={"complaint": complaint}
    )

    data = response.json()

    col1, col2, col3 = st.columns(3)

    col1.metric("Category", data["category"])
    col2.metric("Sentiment", data["sentiment"])
    col3.metric("Priority", data["priority"])

    st.info(data["response"])

# Divider
st.divider()


# 📊 SECTION 2: BULK ANALYSIS


st.header("Bulk Complaint Analysis")

uploaded_file = st.file_uploader("Upload Complaint CSV", type=["csv"])

if uploaded_file is not None:
    
    df = pd.read_csv(uploaded_file)
    st.write("📄 Preview:", df.head())

    if st.button("Analyze All Complaints"):

        results = []

        progress = st.progress(0)

        for i, complaint in enumerate(df["complaint"]):
            response = requests.post(
                "http://127.0.0.1:8000/analyze",
                json={"complaint": complaint}
            )

            data = response.json()

            results.append({
                "complaint": complaint,
                "category": data["category"],
                "sentiment": data["sentiment"],
                "priority": data["priority"]
            })

            progress.progress((i + 1) / len(df))

        result_df = pd.DataFrame(results)

        st.subheader("🔍 Analysis Results")
        st.write(result_df)

        st.subheader("📊 Insights")

        st.write("### Category Distribution")
        st.bar_chart(result_df["category"].value_counts())

        st.write("### Sentiment Distribution")
        st.bar_chart(result_df["sentiment"].value_counts())

        st.write("### Priority Distribution")
        st.bar_chart(result_df["priority"].value_counts())