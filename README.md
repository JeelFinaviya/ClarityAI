# ClarityAI — Understanding Intelligence Platform

> **Do you actually understand it?**

ClarityAI is an AI-powered cognitive diagnostic platform designed to evaluate true conceptual understanding versus passive familiarity.

---

## 🏛️ Architecture

```
[ React + Vite + Tailwind Frontend ]
                │
                ▼ (HTTP POST /api/analyze/)
[ Django REST Framework Backend ]
                │
                ▼ (Google GenAI Python SDK)
[ Google Gemini Model (Structured JSON) ]
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Create & activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and set your GEMINI_API_KEY

# Start Django development server
python manage.py runserver 127.0.0.1:8000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Open **`http://127.0.0.1:5173/`** in your browser.

---

## 🔒 Security & Deployment Notes

* The Google Gemini API key is securely isolated on the Django backend and never transmitted to client browsers.
* CORS origins and backend API base URLs are configurable via environment variables (`CORS_ALLOWED_ORIGINS` on backend, `VITE_API_BASE_URL` on frontend).
