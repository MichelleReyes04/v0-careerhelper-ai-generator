# CareerHelper - AI-Powered Career Guidance

An AI-powered career recommendation app for students. Get personalized career path suggestions based on your major, interests, experience level, and goals.

## Features

- **AI Career Generator** - Get personalized career recommendations powered by OpenAI
- **Google Authentication** - Secure sign-in with Google via Supabase Auth
- **Save Recommendations** - Save and revisit your favorite career paths
- **Modern Dashboard** - Clean, responsive UI with sidebar navigation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **AI**: Vercel AI SDK with OpenAI

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A Supabase account
- A Google Cloud account

---

### Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd v0-careerhelper-ai-generator
pnpm install
```

---

### Step 2: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Fill in:
   - **Name**: CareerHelper (or your preferred name)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click **Create new project** and wait for setup (~2 minutes)

---

### Step 3: Run the Database Migration

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `scripts/001_create_tables.sql` and paste it
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned" - this is correct!

This creates:
- `profiles` table (auto-populated on user signup)
- `saved_recommendations` table
- Row Level Security (RLS) policies
- Auto-create profile trigger

---

### Step 4: Get Your Supabase Credentials

1. In Supabase, go to **Settings > API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

---

### Step 5: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services > OAuth consent screen**
   - Choose **External**
   - Fill in App name, User support email, Developer email
   - Click **Save and Continue** through the steps
4. Go to **APIs & Services > Credentials**
5. Click **Create Credentials > OAuth client ID**
6. Select **Web application**
7. Add **Authorized JavaScript origins**:
   ```
   https://YOUR_SUPABASE_PROJECT_ID.supabase.co
   ```
8. Add **Authorized redirect URIs**:
   ```
   https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback
   ```
9. Click **Create**
10. Copy the **Client ID** and **Client Secret**

---

### Step 6: Add Google Auth to Supabase

1. In Supabase, go to **Authentication > Providers**
2. Find **Google** and click to expand
3. Toggle **Enable Sign in with Google** to ON
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

---

### Step 7: Configure Supabase URLs

1. In Supabase, go to **Authentication > URL Configuration**
2. Set **Site URL** to your app URL:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`
3. Add to **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```
4. Click **Save**

---

### Step 8: Set Up Environment Variables

1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your values in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

### Step 9: Run the App

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and you should see the landing page!

---

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add your environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

**Important**: After deploying, update your Supabase URL Configuration with your Vercel production URL.

---

## Project Structure

```
├── app/
│   ├── api/
│   │   └── generate-career/    # AI streaming endpoint
│   ├── auth/
│   │   ├── callback/           # OAuth callback handler
│   │   ├── error/              # Auth error page
│   │   └── login/              # Login page
│   ├── dashboard/
│   │   ├── generate/           # AI career generator
│   │   ├── saved/              # Saved recommendations
│   │   └── page.tsx            # Dashboard home
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── dashboard-sidebar.tsx
│   └── saved-recommendations-list.tsx
├── lib/
│   └── supabase/               # Supabase client setup
├── scripts/
│   └── 001_create_tables.sql   # Database migration
└── middleware.ts               # Auth protection
```

---

## Troubleshooting

### "Invalid login credentials"
- Check that Google OAuth is enabled in Supabase
- Verify your Client ID and Secret are correct

### "Redirect URI mismatch"
- Make sure the redirect URI in Google Cloud Console matches exactly:
  `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

### Database errors
- Run the migration script in Supabase SQL Editor
- Check that RLS policies are enabled

### AI not working
- The app uses Vercel AI Gateway which works automatically on Vercel
- For local development, you may need to set `OPENAI_API_KEY` in `.env.local`

---

## Built with v0

This project was built with [v0](https://v0.app). You can continue developing by visiting:

[Continue working on v0](https://v0.app/chat/projects/prj_j2AAlT8n0RvM1JQVxL5q2YuPR2LX)

---

## License

MIT
