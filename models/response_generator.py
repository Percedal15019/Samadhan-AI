def generate_response(category, sentiment, priority):
    
    if priority == "CRITICAL":
        return "We have detected a critical issue related to your account. Our team is taking immediate action. Please contact customer support urgently."

    if category == "ATM Issue":
        return "We apologize for the inconvenience caused with the ATM service. The issue is being investigated and any deducted amount will be refunded shortly."

    elif category == "UPI Issue":
        return "We regret the inconvenience with your UPI transaction. Please wait while we verify the issue. If the amount is debited, it will be reversed soon."

    elif category == "Card Issue":
        return "We understand your concern regarding your card issue. Please visit your nearest branch or contact support to resolve it quickly."

    elif category == "Loan Issue":
        return "We appreciate your patience regarding the loan process. Our team is reviewing your request and will update you soon."

    elif category == "Net Banking Issue":
        return "We apologize for the inconvenience with net banking. Please try again later or reset your credentials if the issue persists."

    else:
        return "Thank you for reaching out. Your complaint has been registered and our team will get back to you shortly."


# 🔹 Test
if __name__ == "__main__":
    
    tests = [
        ("ATM Issue", "NEGATIVE", "HIGH"),
        ("UPI Issue", "NEGATIVE", "HIGH"),
        ("Fraud", "NEGATIVE", "CRITICAL")
    ]
    
    for t in tests:
        print("\nInput:", t)
        print("Response:", generate_response(*t))