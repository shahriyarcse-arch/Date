# 💖 Date Proposal App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, romantic, and visually stunning web application for proposing a date. Built with love by **[Shahriyar](https://github.com/shahriyarcse-arch)**.

The app features a playful escaping "No" button powered by spring physics, custom SVG icons throughout, an animated confetti celebration, background music, and a passcode-protected admin dashboard to track responses in real-time.

**Tech Stack**: React 19 + Vite 8, Framer Motion, Supabase, Tailwind CSS, canvas-confetti

**Live Demo**: [https://date-pearl-one.vercel.app](https://date-pearl-one.vercel.app)

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
- **Real-time Updates** — Dashboard uses Supabase Realtime subscriptions (no polling)
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
VITE_ADMIN_PASSCODE=5040
```

Restart the dev server after adding your keys.

---

## 🚢 Deploy to Vercel

This project is deployed on Vercel. To deploy your own fork:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSCODE`
4. Deploy — Vercel auto-deploys on every push to `main`

---

## 🔐 Admin Dashboard

- Click the floating gear icon (⚙️) in the bottom-right corner of the proposal screen
- Enter the passcode to access the admin panel
- The passcode is set via the `VITE_ADMIN_PASSCODE` environment variable

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

The app uses a custom glassmorphism design system with:

- **Colors**: Rose/pink palette (`#E11D48` primary) with CSS custom properties
- **Typography**: Poppins (headings) + Inter (body) via Google Fonts
- **Glassmorphism**: Frosted glass containers with `backdrop-filter: blur`, semi-transparent borders
- **Dark Mode**: Full theme support via `prefers-color-scheme` with separate token sets
- **Animations**: Framer Motion spring physics, 150-400ms timing
- **Icons**: Custom inline SVG icons throughout

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Attribution to [Shahriyar](https://github.com/shahriyarcse-arch) must be preserved in any distributed version.

---

<p align="center">Made with ❤️ for unforgettable moments ✨</p>
