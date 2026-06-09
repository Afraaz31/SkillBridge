<div align="center">

# 🌉 SkillBridge

### Bridge the gap between learning and employability

A full-stack MERN career development platform that helps students track skills, build projects, and measure job readiness with a **0–100% readiness score**.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-blue?style=for-the-badge)](https://skill-bridge-seven-delta.vercel.app)
[![Backend API](https://img.shields.io/badge/⚡_API-Live_on_Render-green?style=for-the-badge)](https://skillbridge-api-zbge.onrender.com/api/health)
[![GitHub Stars](https://img.shields.io/github/stars/Afraaz31/SkillBridge?style=for-the-badge)](https://github.com/Afraaz31/SkillBridge)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

</div>

---

## 💡 Why SkillBridge?

Most students learn randomly, build incomplete projects, and have no way to measure if they're actually job-ready. SkillBridge solves this by combining **skill tracking + project tracking + readiness scoring + gap analysis** in one platform.

Users pick a target role → track their skills and projects → get a readiness score → see exactly what's missing. Not just "I know React" but **"I know React — here's my proof, and I'm 72% ready for a MERN role."**

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | JWT login/register with bcrypt password hashing & protected routes |
| 📊 **Dashboard** | Stat cards, readiness score ring (0–100%), weak areas & next steps |
| 🛠️ **Skill Tracking** | Add skills with category, level, status (Not Started → Completed) & proof links |
| 🚀 **Project Tracking** | Track projects with tech stack, completion %, GitHub & live links |
| 🎯 **Gap Analysis** | Compare skills against role requirements — matched ✅, missing ❌, weak ⚠️ |
| 👤 **Profile** | Set target role (Frontend/Backend/Full Stack/MERN/Java), bio & social links |
| 🛡️ **Security** | Helmet headers, rate limiting on auth routes, input validation |

---

## 📈 How Readiness Score Works

The score is calculated from **4 weighted components**:

```
Skills Completion (40%)  →  Your completed skills ÷ role's required skills
Project Completion (30%) →  Your completed projects ÷ role's minimum projects
Proof Uploaded (15%)     →  Skills with evidence links ÷ total skills
Consistency (15%)        →  Activity in last 30 days
```

**Example:** Targeting MERN Developer with 5/9 skills done, 2/4 projects, 3/5 with proof, active this week → **Score: 61%**

---

## 🧱 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios, Context API |
| **Backend** | Node.js, Express.js, Mongoose, JWT, bcrypt, Helmet, Rate Limiter |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel (frontend), Render (backend) |
| **Tools** | Git, GitHub, Postman, MongoDB Compass |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/Afraaz31/SkillBridge.git
cd SkillBridge
```

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

```bash
npm run seed     # Seed the 5 role templates
npm start        # Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev      # App runs on http://localhost:5173
```

Open `http://localhost:5173` → Register → Start tracking! 🎉

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Login & get JWT token |
| `GET` | `/api/auth/me` | Get logged-in user |
| `PUT` | `/api/auth/profile` | Update profile |

### Skills & Projects (all protected 🔒)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET / POST` | `/api/skills` | Get all skills / Add skill |
| `PUT / DELETE` | `/api/skills/:id` | Update / Delete skill |
| `GET / POST` | `/api/projects` | Get all projects / Add project |
| `PUT / DELETE` | `/api/projects/:id` | Update / Delete project |

### Dashboard & Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Stats + readiness score |
| `GET` | `/api/gap-analysis` | Skill gap analysis for target role |
| `GET` | `/api/roles` | Get 5 role templates |

---

## 📁 Project Structure

```
SkillBridge/
├── backend/src/
│   ├── config/          # DB connection, env, seed data
│   ├── controllers/     # Auth, skills, projects, dashboard, gap analysis
│   ├── middleware/      # JWT auth, error handler, rate limiter
│   ├── models/          # User, Skill, Project, RoleTemplate schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Readiness score calculation engine
│   └── server.js        # Entry point
│
├── frontend/src/
│   ├── components/      # Reusable UI components
│   ├── context/         # AuthContext & ToastContext (global state)
│   ├── layouts/         # Sidebar layout
│   ├── pages/           # Dashboard, Skills, Projects, GapAnalysis, Profile
│   ├── services/        # Axios API instance with JWT interceptor
│   └── App.jsx          # Router & route definitions
│
└── README.md
```

---

## 🔮 Future Roadmap

- [ ] 🤖 AI-powered project feedback & code review
- [ ] 📄 Auto-generate resume from skills & projects
- [ ] 👀 Recruiter view — public portfolio page
- [ ] 🧩 Coding challenge integration (LeetCode, HackerRank)
- [ ] 💼 Job matching based on readiness score
- [ ] 📱 Mobile app version

---

## 🤝 Contributing

Contributions are welcome!

1. 🍴 Fork the repository
2. 🌱 Create a feature branch (`git checkout -b feature-name`)
3. 📝 Commit your changes (`git commit -m 'Add feature'`)
4. 📤 Push to branch (`git push origin feature-name`)
5. 🔁 Open a Pull Request

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🖥️ Frontend | [skill-bridge-seven-delta.vercel.app](https://skill-bridge-seven-delta.vercel.app) |
| ⚡ Backend API | [skillbridge-api-zbge.onrender.com](https://skillbridge-api-zbge.onrender.com/api/health) |

---

<div align="center">

**Built with ❤️ by [Afraz Ahmed](https://github.com/Afraaz31)**

B.E. Computer Science — PDA College of Engineering, Kalaburagi

*"Turning vague learning into measurable employability."*

⭐ **Star this repo if you found it useful!**

</div>
