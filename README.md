# 🎧 Stüdyo® - Your Sound, Your Space

**Stüdyo®** is a next-generation music platform that blends streaming, personalization, and creative expression. Built for listeners, loved by creators — Stüdyo® redefines how we experience sound.

## 🚀 Features

- 🎵 **Stream Seamlessly** – Discover music curated for your mood and moments.
- 🎚️ **Creator Tools** – Upload, mix, and share your own tracks.
- 🧠 **Smart Recommendations** – playlists tailored to your taste.
- 🎨 **Profile Customization** – Make your listening space truly yours.
- 🌍 **Global Vibes** – Explore audio from around the world in one place.

## 🔥 Taglines

> *"Feel Every Beat."*  
> *"Where Music Finds Its Shape."*  
> *"Not Just Music. A Movement."*  
> *"The Future Sounds Like This."*

## 🛠️ Tech Stack (Example)

- **Frontend:** Next JS, Tailwind CSS, Framer Motion  
- **Backend:** Laravel, MySQL  

## 📁 File Structure

STÜDYO/
├── client/   → Next.js frontend
└── server/   → Laravel backend

**📂 Frontend (Next.js)**

client/
├── app/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Next.js routes
│   │   ├── index.tsx        # Home
│   │   ├── player.tsx       # Music player
│   │   └── api/             # API routes (if any)
│   ├── styles/              # CSS, Tailwind, or SCSS
│   ├── context/             # Global state (e.g. Auth, Player)
│   
├── public/                  # Static assets like icons and OG images
├── .env.local               # Env variables (e.g. API base URL)
├── next.config.js           # Next.js config

**📂 Backend(Laravel)**
server/
├── app/
│   ├── Http/
│   ├── Models/
│   └── Services/
├── routes/
│   └── api.php         # API routes
├── database/
│   └── migrations/
├── config/
│   └── cors.php
├── .env
├── composer.json
└── artisan


## 🚀 Deployment (Vercel + Laravel API)

**Front-end** : Vercel + Github
**back-end** : Render + Github

## 🌐 Live Demo

Check out the live platform: [studyo-beta.vercel.app](https://www.studyo-beta.vercel.app)  


## 📄 License
This project is licensed under the MIT License.
© 2025 Stüdyo® — All rights reserved.

## ❤️ Credits
Developed and designed by **Mounir Lagzouli**
Follow me on Instagram 

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/22BadHacker/studyo-frontend.git

# Go into the project directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev

