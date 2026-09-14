# 🧠 ClarityAI

> ## **Do you actually understand?**

ClarityAI is an AI-powered knowledge analysis platform that evaluates a user's understanding of a topic, identifies knowledge gaps and misconceptions, and provides meaningful, actionable feedback using Generative AI.

Rather than simply generating answers, ClarityAI focuses on analyzing **how well a user actually understands a concept**.

---

## ✨ Features

* 🧠 **AI-Powered Knowledge Analysis**
* 🔍 **Understanding Evaluation**
* 🎯 **Knowledge Gap Identification**
* ⚠️ **Misconception Detection**
* 💡 **Intelligent AI Feedback**
* 📊 **Structured Analysis Results**
* ⚡ **Modern and Responsive User Interface**
* 🔐 **Secure Backend Architecture**
* 🌐 **Configurable Frontend API URL**
* 🗄️ **PostgreSQL-Compatible Production Architecture**
* 🔒 **Backend-Only Gemini API Integration**

---

## 🎯 The Core Question

ClarityAI is built around one important question:

> **Do you actually understand?**

A user provides an explanation of a topic, and ClarityAI analyzes it to identify:

* ✅ Concepts the user understands
* ❌ Missing concepts
* ⚠️ Potential misconceptions
* 📉 Knowledge gaps
* 💡 Areas for improvement

The goal is to help users develop **deeper and more meaningful understanding**, rather than simply memorizing information.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Modern CSS

### Backend

* Python
* FastAPI
* Google Gemini API

### Database

* PostgreSQL-compatible architecture

### AI

* Generative AI
* Knowledge Analysis
* Understanding Evaluation
* Structured AI Feedback

---

## 📂 Project Structure

```text
ClarityAI/
│
├── frontend/                 # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/                  # Backend application
│   ├── app/
│   ├── requirements.txt
│   ├── .env.example
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your system:

* Node.js
* npm
* Python 3.10 or higher

---

# ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_database_connection_string_here
CORS_ORIGINS=http://localhost:5173
```

You can use `.env.example` as a reference.

> ⚠️ **Never commit your `.env` file or API keys to GitHub.**

---

## ▶️ Run the Backend

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The backend will run on the configured local server.

---

# 💻 Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

## 🔒 Security

ClarityAI follows basic security practices for handling sensitive configuration.

* API keys are stored using environment variables.
* `.env` files are excluded from version control.
* Gemini API keys remain backend-only.
* Secrets are never exposed to the frontend.
* CORS configuration is environment-based.
* Frontend API URLs are configurable.
* Production deployment supports PostgreSQL-compatible databases.

---

## 🌐 Environment Configuration

### Backend

Sensitive values should be configured through environment variables.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_database_url
CORS_ORIGINS=http://localhost:5173
```

### Frontend

The frontend API URL should be configurable for development and production environments.

Example:

```env
VITE_API_URL=http://localhost:8000
```

---

## 🧠 How ClarityAI Works

```text
User
  │
  ▼
Provides Topic + Explanation
  │
  ▼
ClarityAI Backend
  │
  ▼
Generative AI Knowledge Analysis
  │
  ├── Understanding Evaluation
  ├── Knowledge Gap Detection
  ├── Misconception Identification
  └── Improvement Suggestions
  │
  ▼
Structured Analysis Result
  │
  ▼
Actionable Feedback for the User
```

---

## 🎯 Project Goals

ClarityAI aims to provide a meaningful way to evaluate knowledge and understanding.

The platform focuses on:

* Deep learning understanding
* Knowledge gap detection
* Identifying misconceptions
* Personalized feedback
* Improving conceptual clarity

---

## 📈 Future Improvements

Potential future enhancements include:

* 👤 User Authentication
* 📚 Analysis History
* 📊 Knowledge Progress Dashboard
* 📈 Learning Analytics
* 🗂️ Topic Management
* 🧠 Personalized Learning Recommendations
* 🗄️ Full PostgreSQL Persistence
* 📱 Improved Mobile Experience
* ☁️ Production Deployment

---

## 🔐 Important Security Notice

Before pushing this project to GitHub, verify that the following files are **not committed**:

```text
.env
backend/.env
node_modules/
venv/
.venv/
```

Your repository should include:

```text
.env.example
```

The `.env.example` file must contain **placeholder values only**.

---

## 👨‍💻 Author

**Jeel Finaviya**

Computer Science & Information Technology Student
Full-Stack Developer | AI & Generative AI Enthusiast

GitHub: https://github.com/JeelFinaviya

---

## 📄 License

This project is currently **private and proprietary**.

---

## 💡 Project Philosophy

> **Technology should not only provide answers. It should help us understand whether we truly understand.**

**ClarityAI — Do you actually understand? 🧠**
~