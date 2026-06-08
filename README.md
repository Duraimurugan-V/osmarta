# OSMARTA 🚀

OSMARTA is an AI-Powered Digital Commerce Ecosystem that bridges the gap between Tamil Nadu's local commerce and global technology. It connects buyers directly with farmers, retailers, and service providers with **0% commission** and **No middlemen**.

## 🏗️ Architecture (V2)

The platform has been completely rebuilt from a static HTML prototype into a modern, decoupled production architecture:
- **Frontend:** React (Vite) for blazing-fast SPA performance.
- **Backend:** Python (FastAPI) for AI endpoints and data processing.
- **Database & Auth:** Supabase (PostgreSQL) for live data and Google OAuth integration.

## ✨ Core Features
- **Direct Connect:** Contact sellers directly via WhatsApp and Phone calls right from the product listings.
- **Dynamic Marketplace:** Filter between Farm Produce, Retail Products, Food, and Local Services.
- **Owner Inbox:** Sellers have a dedicated dashboard to manage, approve, or reject buyer inquiries in real-time.
- **Community Voice:** Users can share product reviews or personal platform experiences with images and location tagging.
- **AI Intelligence Hub:** Serverless Python endpoints generate live market insights and predict market prices for farm produce and retail items based on trends.

## 🚀 Quick Start (Local Development)

You need two terminal windows to run both the frontend and the AI backend.

### 1. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend (Python/FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn api.index:app --reload
```

### 3. Environment Setup
Create a `.env.local` inside the `frontend` directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:8000
```

## 🌍 Deployment Options
- **Frontend** is configured for automatic deployment on **Netlify** (reads the `netlify.toml` file).
- **Backend** is configured for automatic deployment on **Vercel** serverless functions (reads the `vercel.json` file).
