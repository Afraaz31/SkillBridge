# SkillBridge — Complete Project Handoff

> A backup document explaining the project, teaching method, and current progress.
> Use this if the chat session is lost so a new Claude session can continue seamlessly.

---

## 1. About the User (Afraaz)

- **Role:** Backend learner building SkillBridge step-by-step
- **Goal:** Learning complete MERN backend through a real project
- **Style:** Beginner-friendly, learns by doing small focused steps
- **Important preference:** Only do what the user explicitly asks. Don't auto-generate code ahead of instructions. Explain before building.

---

## 2. The Teaching Method We Used

This is the method to follow in any new session:

### Pattern: User gives prompt → Claude builds it → User tests → Move forward

1. **User gives one focused instruction** (e.g., "Create src/controllers/auth.controller.js with register function that...")
2. **Claude builds exactly that** — no extra files, no extra features
3. **Claude explains briefly** what was built, how it works, and how to test in Postman/browser
4. **User tests it** (Postman, browser, MongoDB Compass)
5. **User says next step** → repeat

### What works:
- Short, focused responses (no walls of text)
- File path references as clickable markdown links: `[server.js](backend/src/server.js)`
- Brief "why" explanations after building (not 500-word essays)
- One concept at a time
- Tables for comparisons (method | URL | description)
- Tailwind classes used inline (no separate CSS files)

### What to avoid:
- Building features the user didn't ask for
- Long pre-explanations before code
- Adding error handling for impossible scenarios
- Adding comments that just describe what the code does

---

## 3. SkillBridge — The Full Vision

**Name:** SkillBridge
**Type:** Career development SaaS platform
**Stack:** MERN (MongoDB, Express, React, Node.js)

### What it is:
A platform for students, freshers, and self-learners (especially developers) that:
- Tracks skills they are learning
- Tracks projects they are building
- Measures progress
- Calculates job readiness for target roles
- Gives feedback on weak areas
- Builds a proof-based portfolio

### Problem it solves:
- Students learn randomly from YouTube/Udemy
- Don't know what to learn next
- Build incomplete projects
- Can't measure if they're job-ready
- No structured proof of progress
- Resume looks weak because skills aren't backed by projects

### Core formula:
**Learning + Building + Proof of Work + Job Readiness = Employable**

### Target users:
- College students
- Fresh graduates
- Self-taught developers
- Internship seekers
- Entry-level job seekers

### Target roles supported:
- Frontend Developer
- Backend Developer
- Full Stack Developer
- MERN Developer
- Java Developer

---

## 4. Tech Stack

### Frontend
- React (with Vite)
- React Router DOM (for routing)
- Axios (for API calls)
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Context API for auth state

### Backend
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS, dotenv, cookie-parser

---

## 5. Current Folder Structure

```
C:\Backend-Claude\
│
├── backend/
│   ├── .env                ← real env vars (gitignored)
│   ├── .env.example        ← template
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules/
│   └── src/
│       ├── server.js                       ← entry point
│       ├── config/
│       │   ├── db.js                       ← MongoDB connection
│       │   ├── env.js                      ← env var loader
│       │   └── seedRoles.js                ← seed script for role templates
│       ├── controllers/
│       │   ├── auth.controller.js          ← register, login, getMe, updateProfile
│       │   ├── dashboard.controller.js     ← dashboard stats + readiness
│       │   ├── gapAnalysis.controller.js   ← gap analysis logic
│       │   ├── health.controller.js
│       │   ├── project.controller.js       ← projects CRUD
│       │   ├── role.controller.js          ← list 5 roles
│       │   └── skill.controller.js         ← skills CRUD
│       ├── middleware/
│       │   ├── auth.js                     ← protect middleware (JWT verify)
│       │   ├── errorHandler.js
│       │   └── notFound.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Skill.js
│       │   ├── Project.js
│       │   └── RoleTemplate.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── dashboard.routes.js
│       │   ├── gapAnalysis.routes.js
│       │   ├── health.routes.js
│       │   ├── project.routes.js
│       │   ├── role.routes.js
│       │   └── skill.routes.js
│       └── services/
│           └── readinessScore.js           ← pure readiness calculation logic
│
└── frontend/
    ├── package.json
    ├── vite.config.js                      ← Tailwind plugin + /api proxy to :5000
    ├── index.html
    └── src/
        ├── main.jsx                        ← BrowserRouter + AuthProvider wrappers
        ├── App.jsx                         ← routes definition
        ├── index.css                       ← @import "tailwindcss"
        ├── components/                     ← (empty, for future)
        ├── pages/
        │   ├── Login.jsx
        │   └── Register.jsx
        ├── layouts/
        │   └── AppLayout.jsx                ← sidebar layout for protected pages
        ├── services/
        │   └── api.js                       ← axios instance with JWT interceptor
        ├── context/
        │   └── AuthContext.jsx              ← user/token/login/register/logout
        ├── hooks/                          ← (empty)
        ├── utils/                          ← (empty)
        └── assets/
```

---

## 6. Database Schemas (Mongoose Models)

### User
- name (required, trimmed)
- email (required, unique, validated)
- password (required, min 6 chars, select: false)
- targetRole (enum: Frontend/Backend/Full Stack/MERN/Java Developer)
- bio (max 200 chars)
- github
- linkedin
- timestamps

### Skill
- userId (ref User, required)
- name (required, trimmed)
- category (enum: Frontend/Backend/Database/Tools/DSA/Other)
- level (enum: Beginner/Intermediate/Advanced)
- status (enum: Not Started/Learning/Practicing/Project Applied/Completed)
- evidenceLinks ([String])
- notes (String)
- timestamps

### Project
- userId (ref User, required)
- title (required, trimmed)
- description (required)
- techStack ([String])
- githubLink
- liveLink
- status (enum: Planned/In Progress/Completed)
- completionPercent (0-100, default 0)
- screenshots ([String])
- learnings
- challenges
- timestamps

### RoleTemplate
- roleName (unique, required)
- requiredSkills ([String])
- recommendedSkills ([String])
- minProjects (default 3)
- description
- timestamps

5 RoleTemplates are seeded via `npm run seed`: Frontend, Backend, Full Stack, MERN, Java.

---

## 7. API Endpoints Built

All require `Authorization: Bearer <token>` header EXCEPT auth/register, auth/login, /health, /roles.

### Auth (`/api/auth`)
| Method | Route | Purpose |
|---|---|---|
| POST | `/register` | Create user, return JWT |
| POST | `/login` | Verify creds, return JWT |
| GET | `/me` | Get logged-in user data |
| PUT | `/profile` | Update name/bio/targetRole/github/linkedin |

### Skills (`/api/skills`)
| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Get all user's skills |
| POST | `/` | Add a skill |
| PUT | `/:id` | Update a skill (ownership check) |
| DELETE | `/:id` | Delete a skill (ownership check) |

### Projects (`/api/projects`)
| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Get all user's projects |
| POST | `/` | Add a project |
| PUT | `/:id` | Update a project |
| DELETE | `/:id` | Delete a project |

### Other
- `GET /api/health` — health check (public)
- `GET /api/roles` — list 5 role templates (public)
- `GET /api/dashboard` — stats + readiness score (protected)
- `GET /api/gap-analysis` — gap analysis report (protected)

---

## 8. Readiness Score Formula

Located in `backend/src/services/readinessScore.js`.

| Component | Weight | What it measures |
|---|---|---|
| skillScore | 40% | Required skills with status Completed/Practicing/Project Applied |
| projectScore | 30% | Completed projects / minProjects (capped at 1) |
| proofScore | 15% | Skills with evidence links / total skills |
| consistencyScore | 15% | Skills/projects updated in last 30 days / total |

Returns: `totalScore, strengths, weakAreas, nextSteps`

---

## 9. Frontend Build So Far

### Done
- Vite + React + Tailwind v4 set up
- Proxy `/api` → `http://localhost:5000` (so no CORS issues)
- AuthContext: stores user/token, login/register/logout, persists via localStorage, fetches user on app load via `/auth/me`
- Axios instance with request interceptor that auto-attaches Bearer token
- Login page (with form validation, error display, loading state)
- Register page (same pattern)
- React Router with PublicRoute (redirects logged-in users away from /login)
- AppLayout (sidebar with 5 nav links, active link highlight, user info, logout button)

### NOT done yet (next phase)
- Wire AppLayout into App.jsx with ProtectedRoute
- Dashboard page (fetch /api/dashboard, show stats + readiness)
- Skills page (CRUD UI for skills)
- Projects page (CRUD UI for projects)
- Gap Analysis page (fetch /api/gap-analysis, display)
- Profile page (edit profile via /api/auth/profile)
- Push frontend to GitHub

---

## 10. Important Context for the New Session

### Git status
- Backend has its own `.git` inside `backend/` folder
- Pushed to GitHub repo: `https://github.com/Afraaz31/SkillBridge.git`
- Frontend NOT yet pushed to GitHub
- User considering: one repo for both vs. separate repos

### Environment
- OS: Windows 11 Pro
- Shell: PowerShell (but Bash also available)
- Node 18+
- MongoDB Atlas cluster at `cluster31.fkgpem9.mongodb.net`
- Working directory: `C:\Backend-Claude\`

### Things the user knows / patterns we use
- File splitting: routes → controllers → models
- `protect` middleware on protected routes
- `userId` on Skill/Project to enforce ownership
- `req.user._id` from auth middleware
- `req.body` destructuring shorthand `{ name }` instead of `{ name: name }`
- `findByIdAndUpdate(id, body, { new: true, runValidators: true })`
- `Promise.all([...])` for parallel queries

### Commands the user uses
- `npm run dev` (both backend and frontend)
- `npm run seed` (seeds RoleTemplates)
- `git add .`, `git commit -m "..."`, `git push`

---

## 11. The Original Plan (15 sections)

For reference, this is the full vision document the user shared:

### MVP Features
- Auth (signup, login, JWT)
- User profile + target role
- Skill CRUD
- Project CRUD
- Dashboard with summary
- Readiness score
- Gap analysis

### Phases:
- **Phase 1:** Project foundation (Express, MongoDB, folder structure) ✅
- **Phase 2:** Authentication ✅
- **Phase 3:** User profile + role selection ✅
- **Phase 4:** Skill management ✅
- **Phase 5:** Project management ✅
- **Phase 6:** Dashboard ✅
- **Phase 7:** Gap analysis ✅
- **Phase 8:** Frontend UI ⏳ in progress

### Future (after MVP)
- AI-based project feedback
- AI career suggestions
- Streak/consistency tracker
- Resume generation
- Recruiter view
- Peer review/community
- Coding challenge integration
- Internship/job matching

---

## 12. How a New Session Should Continue

If the chat is lost, the new Claude session should:

1. **Read this file first** to get full context
2. **Read MEMORY.md** at `C:\Users\hp\.claude\projects\c--Backend-Claude\memory\MEMORY.md` for user preferences
3. **Acknowledge the user** ("Hey, I've read the handoff doc, you were working on X")
4. **Ask what's next** — don't auto-generate anything
5. **Follow the teaching style:** short responses, file path links, build only what's asked
6. **Use the existing patterns** (routes → controllers → models, protect middleware, ownership checks)

---

## 13. Quick Start Commands (after pull from GitHub)

```bash
# Backend
cd backend
npm install
# Add .env file with MONGO_URI, JWT_SECRET, etc.
npm run seed     # one-time: seed role templates
npm run dev      # starts on :5000

# Frontend
cd frontend
npm install
npm run dev      # starts on :5173 (or :5174 if 5173 taken)
```

---

**End of handoff document.**
**Last updated:** 2026-05-17
**Built by:** Afraaz Ahmed + Claude
