# 🛡️ ScamHero AI

![ScamHero AI Banner](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue) ![Node.js](https://img.shields.io/badge/Backend-Node.js-green) ![FastAPI](https://img.shields.io/badge/AI_API-FastAPI-teal)

## 📌 Overview
**ScamHero AI** is a comprehensive scam detection and community reporting platform specifically tailored for the Malaysian context. It combines a fine-tuned AI model (XLM-RoBERTa) with a robust rule engine to accurately identify scam messages in mixed languages, including Bahasa Malaysia, English, and Manglish. 

Our mission is to help users identify potential phishing attempts, fake loans, OTP theft, and other localized scam tactics before they fall victim.

## 🚀 Key Features
- **Hybrid AI Scam Detection**: A powerful 3-phase approach combining an AI model (70% weight) and a 60+ regex-based Rule Engine (30% weight).
- **Multilingual Context Understanding**: Trained on 3,000+ local messages to understand slang and vernacular (e.g., *"kena block"*, *"send OTP cepat"*).
- **Community Reporting Feed**: A platform where users can publicly report scams, upload screenshot evidence, and warn others.
- **Secure Authentication**: User login, signup, and protected actions backed by Firebase.
- **Responsive UI**: A modern, aesthetic frontend built with React, Vite, and Tailwind CSS.

---

## 🏗️ System Architecture

The application is split into three main micro-components:

1. **Frontend (`/frontend`)**: Built with React, Vite, and Tailwind. It connects to the Node backend for community feeds and to the FastAPI backend for scam predictions.
2. **Backend (`/backend`)**: A Node.js Express server handling report submissions, file uploads, and community feed delivery. 
3. **AI Scam Detection API (`/AI Scam detection` or external)**: A FastAPI server that runs the `xlm-roberta-base` model. It accepts a text message and returns a scam probability score (0.0 to 1.0).

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [Git](https://git-scm.com/)

---

## ⚙️ New User Setup & Installation

Follow these steps to get the full system running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/scamhero-ai.git
cd scamhero-ai
```

### 2. AI Model API Setup
The AI model needs its own FastAPI server to run inference.
*(If your AI folder is named differently or kept as a separate repository, navigate there instead).*

```bash
cd "AI Scam detection"

# Install required Python packages
pip install fastapi uvicorn transformers torch numpy

# Start the FastAPI server
uvicorn api:app --host 0.0.0.0 --port 8000
```
> **Note:** The AI server runs on `http://localhost:8000`. You can expose it via ngrok (`ngrok http 8000`) if your frontend expects a public URL. Read more about the model inside [`MODEL_HANDOVER.md`](./MODEL_HANDOVER.md).

### 3. Backend Setup (Node.js)
The Express backend handles user-submitted reports and media uploads.

```bash
cd backend

# Install dependencies
npm install

# Create an uploads folder (if not automatically created)
mkdir uploads

# (Optional) Add a .env file for custom configuration
# PORT=5000

# Start the server
node server.js
```
> **Note:** The backend runs on `http://localhost:5000`.

### 4. Frontend Setup (React + Vite)
```bash
cd frontend

# Install dependencies
npm install
```

Create a `.env` file in the `frontend` root directory and add your Firebase configuration and API endpoints:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Point these to your running backend and AI API instances
VITE_BACKEND_URL=http://localhost:5000
VITE_AI_API_URL=http://localhost:8000
```

Start the frontend development server:
```bash
npm run dev
```
> **Note:** The frontend will be available at `http://localhost:5173`.

---

## 🧠 AI Model Details
The AI prediction engine is a core part of ScamHero. It utilizes a combination of:
- **XLM-RoBERTa** (Multilingual transformer model)
- **Rule Engine** (Custom regex targeting local phishing domains and keywords)
- **Fusion Logic** (Final Score = `0.70 * AI + 0.30 * Rules`)

If the final score is `≥ 0.50`, the message is flagged as a **SCAM**.
For full technical details about the model, dataset, and threshold configurations, please refer to the [Model Handover Document](./MODEL_HANDOVER.md).

---

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
