# 🧠 ClarityAI — Understanding Intelligence Platform

> ## **Do you actually understand it?**

ClarityAI is an AI-powered cognitive diagnostic platform designed to evaluate **true conceptual understanding versus passive familiarity**.

Instead of simply generating answers, ClarityAI analyzes a user's explanation to identify their level of understanding, knowledge gaps, missing concepts, and potential misconceptions.

---

## ✨ Key Features

* 🧠 AI-powered conceptual understanding analysis
* 🔍 Cognitive diagnostic evaluation
* 📊 Structured understanding assessment
* 🎯 Knowledge gap identification
* ⚠️ Misconception detection
* 💡 Intelligent improvement feedback
* 🤖 Google Gemini-powered analysis
* 📄 Structured JSON responses
* ⚡ Modern React-based user interface
* 🔒 Secure backend-only API key handling
* 🌐 Configurable frontend and backend environments

---

## 🏛️ Architecture

```text
[ React + Vite + Tailwind Frontend ]
                │
                ▼
      HTTP POST /api/analyze/
                │
                ▼
[ Django REST Framework Backend ]
                │
                ▼
    Google GenAI Python SDK
                │
                ▼
[ Google Gemini Model (Structured JSON) ]
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS

### Backend

* Python
* Django
* Django REST Framework

### AI

* Google Gemini
* Google GenAI Python SDK
* Structured JSON output

---

## 📂 Project Structure

```text
ClarityAI/
│
├── backend/
│   ├── analysis/              # AI analysis application
│   │   ├── gemini_service.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── clarity/               # Django project configuration
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

# 🚀 Quick Start

## Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js
* npm

---

## 1️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

### Create a virtual environment

```bash
python -m venv venv
```

### Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

Create a `.env` file based on `.env.example`.

#### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

#### macOS/Linux

```bash
cp .env.example .env
```

Edit `.env` and configure your Gemini API key.

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit your actual `.env` file or API key to GitHub.

### Start the Django development server

```bash
python manage.py runserver 127.0.0.1:8000
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file based on `.env.example`.

#### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

#### macOS/Linux

```bash
cp .env.example .env
```

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Start the Vite development server

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

in your browser.

---

# 🔄 How It Works

```text
User
 │
 ▼
Selects or enters a topic
 │
 ▼
Explains their understanding
 │
 ▼
React Frontend
 │
 ▼
POST /api/analyze/
 │
 ▼
Django REST Framework
 │
 ▼
Gemini AI Analysis
 │
 ├── Understanding Evaluation
 ├── Knowledge Gap Detection
 ├── Concept Identification
 ├── Misconception Detection
 └── Improvement Feedback
 │
 ▼
Structured JSON Response
 │
 ▼
ClarityAI Results Interface
```

---

# 🧠 Core Philosophy

ClarityAI focuses on the difference between:

### Passive Familiarity

> “I've seen this concept before, so I think I understand it.”

and

### True Understanding

> “I can explain this concept clearly, connect it to related ideas, and identify why it works.”

The platform is designed to evaluate whether a user **actually understands a concept**, rather than simply recognizing familiar terminology.

---

# 🔒 Security

ClarityAI follows security best practices for handling sensitive configuration.

* 🔐 Gemini API keys remain exclusively on the backend.
* 🚫 API keys are never transmitted to the browser.
* 📁 `.env` files are excluded from Git.
* 🌐 CORS origins are configurable through environment variables.
* 🔗 Backend API URLs are configurable through environment variables.
* 🔑 Sensitive configuration is not hardcoded.

---

# ⚙️ Environment Variables

## Backend

```env
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173
```

## Frontend

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Refer to the included `.env.example` files for the expected configuration.

---

# 📡 API

## Analyze Understanding

### Endpoint

```text
POST /api/analyze/
```

The frontend sends the user's explanation to the Django backend.

The backend processes the request using Google Gemini and returns structured analysis data for the frontend to display.

---

# 🌐 Deployment

The application is designed with deployment in mind.

Configuration is environment-based:

* Backend secrets are stored using environment variables.
* Gemini API keys remain backend-only.
* CORS origins can be configured for production.
* Frontend API URLs can be configured without modifying application logic.

Before production deployment, configure:

* `GEMINI_API_KEY`
* `CORS_ALLOWED_ORIGINS`
* `VITE_API_BASE_URL`

---

# 🗺️ Future Improvements

Potential future enhancements include:

* 👤 User authentication
* 📚 Analysis history
* 📊 Understanding progress tracking
* 📈 Learning analytics
* 🧠 Personalized learning recommendations
* 🗂️ Topic management
* 💾 Persistent database storage
* ☁️ Full production deployment
* 📱 Enhanced mobile experience

---

# 👨‍💻 Author

**Jeel Finaviya**

Computer Science & Information Technology Student
Full-Stack Developer | AI & Generative AI Enthusiast

GitHub: [JeelFinaviya on GitHub](https://github.com/JeelFinaviya?utm_source=chatgpt.com)

---

# 📄 License

This project is currently **private and proprietary**.

---

## 💡 ClarityAI

> **Technology should not only give us answers. It should help us discover whether we truly understand the answers.**

### 🧠 **ClarityAI — Do you actually understand it?**
