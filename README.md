# Goa 2026 — The Boys Trip

A premium, mobile-first trip planner website for 7 friends going to Goa.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Firebase Auth** (Google login)
- **Firebase Firestore** (expense tracking)
- **Recharts** (analytics charts)
- **PWA** support

---

## Setup

### 1. Clone & Install

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Google Authentication**: Authentication → Sign-in method → Google
4. Enable **Firestore**: Firestore Database → Create database (production mode)
5. Deploy Firestore rules from `firestore.rules`
6. Go to Project Settings → Your apps → Add Web App → copy config

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your Firebase values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Adding New Itinerary Days

The navigation and all day pages are **fully dynamic**. To add a new day:

1. Open `data/itinerary.ts`
2. Add a new key: `day5: [...]`
3. The new day appears automatically in the sidebar, bottom nav, and routing — no other changes needed.

```ts
// data/itinerary.ts
export const itinerary: Record<string, Activity[]> = {
  day1: [...],
  day2: [...],
  day3: [...],
  day4: [...],
  day5: [          // ← just add this
    {
      time: "9:00 AM",
      title: "Sunrise at Palolem",
      mapsUrl: "https://maps.google.com/?q=Palolem+Beach",
    },
  ],
};
```

---

## Project Structure

```
goa-trip/
├── app/
│   ├── (app)/               # Protected routes
│   │   ├── layout.tsx       # Sidebar + bottom nav (auto-updates with itinerary days)
│   │   ├── home/page.tsx    # Hero, countdown, stats, ticket
│   │   ├── day/[day]/page.tsx  # Dynamic day pages
│   │   ├── reels/page.tsx   # Instagram reels gallery
│   │   ├── pictures/page.tsx   # Masonry photo gallery
│   │   └── expenses/page.tsx   # Expense tracker with charts
│   ├── login/page.tsx       # Google Sign-in
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Design tokens & utilities
├── data/
│   ├── trip.ts              # Trip metadata
│   ├── itinerary.ts         # Day-by-day activities ← edit this
│   └── reels.ts             # Instagram reels list ← edit this
├── lib/
│   ├── firebase.ts          # Firebase init
│   ├── auth-context.tsx     # Auth state provider
│   └── pictures.ts          # Gallery image list
├── public/
│   ├── hero-image.jpg
│   ├── train-ticket.pdf
│   ├── picture-inspos/      # Pose inspiration images
│   └── manifest.json        # PWA manifest
├── firestore.rules          # Security rules
└── .env.example
```

---

## Firestore Data Structure

```
users/
  {uid}/
    expenses/
      {expenseId}/
        description: string
        amount: number
        category: string  ("Food" | "Transport" | "Stay" | "Activities" | "Shopping" | "Drinks" | "Other")
        date: string      (YYYY-MM-DD)
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all `NEXT_PUBLIC_FIREBASE_*` environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## Firestore Security Rules Deployment

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```
