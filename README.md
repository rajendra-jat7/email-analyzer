# 📧 Email Analyzer

A simple full-stack app to analyze raw email headers and extract the **receiving chain** with the **ESP (Email Service Provider)** type.

## 🚀 Tech Stack
- Frontend: React + Vite (Vercel)
- Backend: NestJS + Mongoose (Render)
- Database: MongoDB Atlas

## 📂 Project Structure
email-analyzer/
├── frontend/ # React app
└── backend/ # NestJS app


## ⚙️ Setup

### Backend
```bash
cd backend
npm install
MONGO_URI=mongodb+srv://<username>:<password>@cluster-url/emaildb
ORIGIN=http://localhost:5173
PORT=4000
```
### Create .env file :
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster-url/emaildb
ORIGIN=http://localhost:5173
PORT=4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### 🌐 Deployment
- Frontend → Vercel
- Backend → Render
- DB → MongoDB Atlas