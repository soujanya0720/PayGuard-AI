# PayGuard AI — Payment Scam Awareness Demo

PayGuard AI is a responsive web application prototype that checks a pasted SMS, email, or payment request for common scam warning signs. It gives a demo risk indicator, explains the patterns found, and provides practical safety steps.

> **Important:** This is an educational student prototype, not a production fraud detection service. The current detector uses transparent keyword/pattern rules, not a trained AI model. It may miss scams or flag legitimate messages. A low score does not mean a message is safe. This project is not affiliated with or endorsed by PayPal.

## Features

- Responsive desktop and mobile interface
- Text-only message analysis
- Transparent signals for urgency, OTP/PIN/password requests, payment pressure, prize/refund claims, threats, remote-access requests, and selected suspicious links
- Risk indicator with explanations
- Practical safety recommendations
- No database and no message persistence
- Example messages for quick demonstration
- Input validation and safe DOM rendering

## Requirements

- Python 3.9 or newer
- pip

## Run locally

1. Extract the ZIP file.
2. Open a terminal in the `PayGuard_AI` folder.
3. Create and activate a virtual environment (recommended).

   **Windows**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```

   **macOS/Linux**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the app:
   ```bash
   python app.py
   ```
6. Open `http://127.0.0.1:5000` in your browser.

## Demo walkthrough

1. Click **Urgent OTP request**.
2. Click **Analyze message**.
3. Review the score, warning signs, and safety tips.
4. Try **Ordinary message** and compare the result.

## Project structure

```text
PayGuard_AI/
├── app.py
├── detector.py
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── app.js
    └── style.css
```

## How the current detector works

`detector.py` checks the text against a small set of explainable patterns and adds weights for matched categories. The score is capped at 100 and grouped into low, medium, and high indicator bands. This is a baseline screening demo, not a probability that the message is fraudulent.

## Responsible-use and privacy notes

- Do not paste passwords, OTPs, bank account numbers, card details, or other sensitive personal data.
- The app does not intentionally save the submitted message; Flask processes it in memory for the request.
- URL checks are limited pattern checks; the app does not visit or verify links.
- Never use the score alone to decide whether to make a payment.
- If you need to report a suspected financial cybercrime in India, contact your bank/payment provider promptly and use official government reporting channels.

## Future improvements

- Integrate a properly evaluated AI text-classification model
- Add multilingual support and calibrated confidence estimates
- Evaluate on a labeled dataset and report precision/recall
- Add tests, rate limiting, deployment hardening, and abuse monitoring
- Improve URL reputation checks through a trusted, privacy-reviewed provider

## Hackathon submission reminder

Only claim features that you have run and tested. Update the Devpost story to accurately describe the implementation, add screenshots of your running application, and disclose that this version uses rule-based detection unless you integrate and evaluate a genuine AI model.
