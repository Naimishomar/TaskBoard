# 📝 My TaskBoard - Full Stack To-Do Management App

A full-stack TaskBoard app built with **Next.js** as part of the Applyo Full Stack Developer Assessment. Users can register or log in, create multiple task boards (like “Work”, “Personal”), and manage their tasks securely.

---

## 🚀 Features

### 👤 Authentication & Authorization
- JWT-based user authentication
- User registration and login
- Protected routes (only logged-in users can access taskboards)
- Authorization: users can only access their own boards and tasks

### ✅ Task Management
- Create multiple boards (e.g., Work, Personal, Groceries)
- Within each board, users can:
  - Add, edit, and delete tasks
  - Toggle task status: Pending ↔ Completed
  - Include due date, creation date, and optional description

### 💻 Frontend (Next.js)
- Clean, responsive UI (mobile + desktop)
- Full CRUD support via UI for boards and tasks
- Real-time feedback on user actions

### 🔗 Backend (API Routes)
- RESTful APIs for:
  - Authentication (register, login)
  - CRUD operations on boards and tasks
- Data stored in memory (JSON object), no real database

---
