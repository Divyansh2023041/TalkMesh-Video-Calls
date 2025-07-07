# ✨ TalkMesh – Real-Time Chat & Video Calling App ✨

![TalkMesh Banner](path/to/your/banner-image.png)

## 🚀 Overview

**TalkMesh** is a full-stack real-time chat and video calling web application built with the MERN stack. It enables secure 1-on-1 and group conversations with high-quality video communication, screen sharing, and intelligent user management.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue)](https://talkmesh-video-call.onrender.com/)
---

## 🔥 Features

- 💬 Real-time messaging with typing indicators and emoji reactions
- 📹 1-on-1 and group video calling with mute/unmute & camera toggle
- 🔒 JWT-based Authentication & Secure Routing
- 🌐 Scalable backend architecture using Express + MongoDB
- ⚛️ Built with React, TailwindCSS, and Zustand for modern UI & state management
- 📡 Stream.IO integration for instant messaging and call signaling
- 🧠 Real-time status: Online.
- 🛠️ Error handling for both frontend and backend
- 🚀 Free deployment ready
- ⏱️ Lightweight, fast, and responsive UI

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Zustand, Stream.IO Client
- **Backend**: Node.js, Express, MongoDB, Stream.IO Server
- **Others**: JWT, Dotenv, CORS.
- 


---

## 📁 .env Setup

### Backend (`/backend`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development



Frontend (/frontend)
VITE_BACKEND_API=http://localhost:5000

🧩 Run the Project

🔧 Run the Backend
cd backend
npm install
npm run dev

💻 Run the Frontend
cd frontend
npm install
npm run dev

