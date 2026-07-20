# 💖 Date Proposal App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, romantic, and visually stunning web application for proposing a date. Built with love by **[Shahriyar](https://github.com/shahriyarcse-arch)**.

The app features a playful escaping "No" button powered by spring physics, custom SVG icons throughout, an animated confetti celebration, background music, and a passcode-protected admin dashboard to track responses in real-time.

**Tech Stack**: React 19 + Vite, Framer Motion, Supabase, Tailwind CSS

---

## ✨ Features

- **Interactive Proposal Flow** — 6-step journey from "Will you go on a date?" to confirmation
- **Playful "No" Button** — Dodge mechanic with spring animations that makes saying "no" nearly impossible
- **Custom Calendar Picker** — Full date selection with month navigation and time slot cards
- **Confetti Celebration** — Fireworks effect on the final confirmation screen
- **Background Music** — "Always With Me" flute version from Spirited Away, with mute toggle
- **Animated Floating Hearts** — Ambient background decoration
- **Dark Mode Support** — Automatically adapts to system color scheme
- **Keyboard Accessible** — Full keyboard navigation with visible focus rings
- **Admin Dashboard** — Passcode-protected view of all submitted responses with delete capability
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Supabase Integration** — Real-time database for storing proposals

---

## 🚀 Getting Started

### Run Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** to see it in action!

### Build for Production

```bash
npm run build

# Preview the built app
npm run preview
```

---

## 🗄️ Database Setup (Required)

The app uses Supabase to store responses. Create a free account at [supabase.com](https://supabase.com/).

### 1. Create Tables

Run these SQL queries in your Supabase SQL Editor:

**`responses` table** — stores date proposal answers:

```sql
create table responses (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text,
  food text,
  date date,
  time text,
  created_by text default '',
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);
```

**`proposals` table** — stores short unique links:

```sql
create table proposals (
  id text primary key,
  sender_name text not null,
  recipient_name text default '',
  passcode text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Restart the dev server after adding your keys.

---

## 🔐 Admin Dashboard

- Click the floating gear icon (⚙️) in the bottom-right corner of the proposal screen
- Enter the passcode to access the admin panel
- **Default passcode**: `5040`

---

## 📁 Project Structure

```
src/
├── App.jsx                   # Root component with routing
├── main.jsx                  # Entry point
├── index.css                 # Design system & all styles
├── db.js                     # Supabase database client
└── components/
    ├── ProposalFlow.jsx      # Interactive proposal flow (6 steps)
    ├── Dashboard.jsx         # Admin dashboard with table
    └── PublicLanding.jsx     # Landing page
```

---

## 🎨 Design System

The app uses a custom design system with:

- **Colors**: Rose/pink palette (`#DB2777` primary) with soft gradients
- **Typography**: Varela Round (headings) + Nunito Sans (body)
- **Glassmorphism**: Frosted glass containers with backdrop blur
- **Dark Mode**: Full theme support via `prefers-color-scheme`
- **Animations**: Framer Motion spring physics, 150-400ms timing
- **Icons**: Custom SVG icons (no emoji-as-icon anti-pattern)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Attribution to [Shahriyar](https://github.com/shahriyarcse-arch) must be preserved in any distributed version.

---

<p align="center">Made with ❤️ for unforgettable moments ✨</p>
