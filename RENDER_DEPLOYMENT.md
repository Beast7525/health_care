# 🚀 HealthLens AI — Render Deployment Guide

This repository is organized into two standalone subdirectories for seamless zero-downtime deployment on [Render](https://render.com/):

```
hackthon/
├── backend/    <-- Node.js + Express + Mongoose REST API (Render Web Service)
├── frontend/   <-- React + Vite + Tailwind CSS Web App (Render Static Site)
└── RENDER_DEPLOYMENT.md
```

---

## 1. Deploying the Backend (Render Web Service)

1. Log in to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub / GitLab repository.
3. Configure the Web Service settings:
   - **Name**: `healthlens-ai-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the following **Environment Variables**:
   - `PORT`: `5000`
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/healthlens?retryWrites=true&w=majority` *(Your MongoDB Atlas URI)*
   - `CLIENT_URL`: `https://healthlens-ai-frontend.onrender.com` *(Your Render Frontend URL once created)*
5. Click **Create Web Service**. Render will deploy your backend and provide a public URL like:
   `https://healthlens-ai-backend.onrender.com`

---

## 2. Deploying the Frontend (Render Static Site)

1. In Render Dashboard, click **New +** -> **Static Site**.
2. Connect the same repository.
3. Configure the Static Site settings:
   - **Name**: `healthlens-ai-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add the following **Environment Variable**:
   - `VITE_API_URL`: `https://healthlens-ai-backend.onrender.com/api` *(Your deployed Backend URL from Step 1)*
5. Click **Create Static Site**.

---

## 3. Local Development Commands

### Run Backend Locally:
```bash
cd backend
npm install
npm start
```
*(Runs on http://localhost:5000)*

### Run Frontend Locally:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on http://localhost:5173)*
