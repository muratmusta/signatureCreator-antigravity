# SignatureOS - Premium Email Signature Generator

A production-grade SaaS platform for creating professional email signatures. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### Core Features
- 🎨 **Drag-and-Drop Editor** - Intuitive visual editor with live preview
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🎯 **10+ Premium Templates** - Professional, Creative, Minimal, and Modern categories
- ☁️ **Cloud Sync** - Save and access your signatures anywhere
- 🔍 **Search & Filter** - Quickly find your projects
- 📊 **Dashboard Analytics** - Track your signature usage
- 🎭 **Guest Mode** - Try without signing up

### Premium Features
- 🖼️ **Logo Upload** - Drag-and-drop with auto-generation fallback
- 🎨 **Color Customization** - Preset colors + custom picker
- 📐 **Layout Control** - Reorder signature blocks
- 💾 **Auto-Save** - Never lose your work
- 📥 **Export Options** - HTML, PDF, PNG (coming soon)

### Technical Excellence
- ⚡ **Optimized Performance** - Code splitting, lazy loading, image optimization
- 🔒 **Secure Authentication** - Magic link + guest mode via Supabase
- ♿ **Accessibility** - WCAG 2.1 compliant, keyboard navigation
- 🔍 **SEO Optimized** - Meta tags, OpenGraph, JSON-LD, sitemap
- 📈 **Analytics Ready** - Google Analytics & Plausible support
- 🐛 **Error Monitoring** - Sentry integration ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase**
   
   Create a `signatures` table:
   ```sql
   create table signatures (
     id uuid default gen_random_uuid() primary key,
     user_id uuid not null,
     title text not null,
     data jsonb not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security
   alter table signatures enable row level security;

   -- Create policies
   create policy "Users can view their own signatures"
     on signatures for select
     using (auth.uid() = user_id);

   create policy "Users can insert their own signatures"
     on signatures for insert
     with check (auth.uid() = user_id);

   create policy "Users can update their own signatures"
     on signatures for update
     using (auth.uid() = user_id);

   create policy "Users can delete their own signatures"
     on signatures for delete
     using (auth.uid() = user_id);
   ```

   Create a `logos` storage bucket:
   - Go to Storage in Supabase dashboard
   - Create a new bucket named `logos`
   - Make it public
   - Set max file size to 2MB

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📦 Production Deployment

### Build

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Deploy to Other Platforms

The app is a standard Next.js 14 app and can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Drag & Drop**: dnd-kit
- **Notifications**: Sonner
- **Email Rendering**: @react-email
- **Date Formatting**: date-fns

## 📁 Project Structure

```
v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Public pages (landing)
│   │   ├── (app)/              # Protected pages (dashboard, settings)
│   │   ├── (auth)/             # Auth pages (login, register)
│   │   └── auth/callback/      # OAuth callback
│   ├── components/
│   │   ├── Actions/            # Action buttons (Save, Download, Copy)
│   │   ├── Editor/             # Editor components
│   │   ├── Form/               # Form inputs
│   │   ├── Layout/             # Layout components
│   │   ├── Preview/            # Preview components
│   │   ├── Templates/          # Email signature templates
│   │   └── ui/                 # Reusable UI components
│   ├── context/                # React Context providers
│   ├── data/                   # Static data (personas, etc.)
│   ├── lib/                    # Utilities (Supabase, analytics, etc.)
│   ├── styles/                 # Design tokens
│   └── types/                  # TypeScript types
├── public/                     # Static assets
└── next.config.js              # Next.js configuration
```

## 🎯 Roadmap

### ✅ Completed (v1.0)
- Design system foundation
- Landing page & dashboard
- Editor with template gallery
- Performance & SEO optimization

### 🔄 In Progress
- Advanced editor features (Undo/Redo, version history)
- PDF/PNG export
- Email client preview

### 📋 Planned
- Team collaboration
- Enterprise features (SSO, custom domains)
- API for integrations
- Mobile app

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For support, email support@signatureos.com or open an issue.

---

Built with ❤️ by the SignatureOS team
