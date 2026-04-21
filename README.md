# STORY-01: User Signup

Built with XP + TDD. One story, traced from acceptance criteria to working software.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Project Structure

```
Ai_Story_card/
├── backend/
│   └── src/
│       ├── services/AuthService.ts       # Validation, hashing, in-memory user store
│       ├── routes/signup.ts              # POST /api/signup controller
│       ├── app.ts                        # Express app
│       └── server.ts                     # Entry point (app.listen)
└── frontend/
    └── src/
        ├── components/SignupForm.tsx      # Form with validation + API call
        ├── pages/SignupPage.tsx           # Page shell
        └── main.tsx                      # React entry point
```

---

## Install Dependencies

Run this once before anything else.

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## Run the App

You need two terminals running at the same time.

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
```
Backend starts at `http://localhost:3001`

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
```
Frontend starts at `http://localhost:5173`

Open `http://localhost:5173` in your browser.

---

## Run the Tests

**Backend tests** (AuthService + API layer):
```bash
cd backend
npm test
```

**Frontend tests** (SignupForm component):
```bash
cd frontend
npm test
```

---

## Demo Checklist

Once both servers are running, verify each acceptance criterion:

- [ ] Open `http://localhost:5173` — signup form renders
- [ ] Submit with a bad email — inline error appears
- [ ] Submit with a password under 8 characters — inline error appears
- [ ] Submit with mismatched passwords — inline error appears
- [ ] Submit valid details — success message appears
- [ ] Submit the same email again — duplicate error appears
- [ ] All backend and frontend tests pass

---

## What Is In Scope

| Feature | Status |
|---|---|
| Signup form (email, password, confirm password) | Done |
| Client-side validation | Done |
| Server-side validation | Done |
| Duplicate email rejection | Done |
| Password hashing (bcrypt) | Done |
| Success / error feedback in UI | Done |

**Out of scope:** login, email verification, forgot password, OAuth, CAPTCHA.
