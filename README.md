# Vibe Pulse

> AI-Powered Mood & Stress Journal - Transform scattered feelings into actionable well-being insights

Vibe Pulse is a modern web application that helps you track your emotional well-being through AI-powered journaling. Write about your day, receive compassionate AI reflections, and visualize your mood patterns and stress levels over time.

## ✨ Features

- **AI-Powered Journal Analysis**: Get personalized mood, stress level, topic, summary, and advice from your journal entries using OpenAI
- **Daily Affirmations**: Receive uplifting daily affirmations to start your day on a positive note
- **Interactive Dashboard**: Visualize your emotional journey with:
  - Stress level charts and trends
  - Mood distribution analytics
  - Journal entry history with pagination
  - Filterable analytics by time period
- **Secure Authentication**: Powered by Clerk for seamless sign-in/sign-up
- **Responsive Design**: Beautiful, modern UI that works on all devices with a mobile-friendly menu
- **Private & Secure**: Your data is stored securely in Supabase with encrypted journal entries

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Supabase](https://supabase.com/)
- **AI**: [OpenAI](https://openai.com/) (via Vercel AI SDK)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) 20+ installed
- [pnpm](https://pnpm.io/) package manager (or npm/yarn)
- A [Supabase](https://supabase.com/) account and project
- A [Clerk](https://clerk.com/) account
- An [OpenAI](https://openai.com/) API key

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd vibe-pulse
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp env.example .env.local
```

Fill in your environment variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

### 4. Set up Supabase database

Create a `journal_entries` table in your Supabase database:

```sql
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  text TEXT NOT NULL,
  mood TEXT NOT NULL,
  stress_level INTEGER NOT NULL CHECK (stress_level >= 0 AND stress_level <= 10),
  topic TEXT NOT NULL,
  summary TEXT NOT NULL,
  advice TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_created_at ON journal_entries(created_at DESC);
```

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
vibe-pulse/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/                # API routes
│   │   │   ├── affirmation/    # Daily affirmation endpoint
│   │   │   ├── analyze/        # Journal analysis endpoint
│   │   │   └── journal-entries/ # Journal entries CRUD
│   │   ├── dashboard/          # Analytics dashboard page
│   │   ├── journal/            # Journal entry page
│   │   ├── layout.tsx          # Root layout with Clerk provider
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── homepage/           # Landing page sections
│   │   ├── layout/             # Header, Footer, MobileMenu
│   │   └── ui/                 # Reusable UI components (shadcn)
│   ├── constants/              # Static data and constants
│   ├── lib/
│   │   ├── services/           # API service functions
│   │   └── supabase/           # Supabase client configurations
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── env.example                 # Environment variables template
└── package.json
```

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Design System

The application uses a custom color palette defined in `src/app/globals.css`:

- **Background**: Light green (`oklch(0.97 0.05 150)`)
- **Primary (Buttons)**: Orange (`oklch(0.72 0.2 50)`) with white text
- **Cards**: Slightly lighter green for elevated surfaces
- **Charts**: Warm, calming colors for data visualization

## 🔒 Security Notes

- Never commit `.env.local` to version control
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side
- Clerk handles authentication securely with session management
- Journal entries are user-scoped and protected by authentication

## 🚢 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

The application is optimized for Vercel's platform with Next.js App Router support.

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the maintainers.

---

Built with ❤️ using Next.js and modern web technologies.
