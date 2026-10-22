from flask import Flask, render_template, request, jsonify
from detector import analyze_message

app = Flask(__name__)

@app.get("/")
def index():
    return render_template("index.html")

@app.post("/analyze")
def analyze():
    data = request.get_json(silent=True) or request.form
    message = (data.get("message") or "").strip()
    if len(message) < 8:
        return jsonify({"error": "Please enter a message with at least 8 characters so it can be analyzed."}), 400
    if len(message) > 5000:
        return jsonify({"error": "Please keep the message under 5,000 characters."}), 400
    return jsonify(analyze_message(message))

if __name__ == "__main__":
    app.run(debug=True)
