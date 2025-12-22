# 🎨 DoodleTales

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**DoodleTales** is an AI-powered interactive storytelling game where your drawings become the story. Draw your actions, and watch as AI interprets them to create a unique, pixel-art adventure tailored to your imagination.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwind-css)

## ✨ Features

- 🎮 **Interactive Storytelling**: Create unique adventures by drawing your actions
- 🤖 **AI-Powered Narrative**: Google's Gemini AI interprets your drawings and generates compelling story continuations
- 🎨 **Pixel-Art Aesthetics**: Beautiful 16-bit style visuals generated for each scene
- 🖌️ **Drawing Canvas**: Intuitive sketch interface for expressing your actions
- 🔐 **User Authentication**: Secure login system with NextAuth and Supabase
- 🌙 **Dark Mode**: Seamless theme switching for comfortable viewing
- 📱 **Responsive Design**: Play on any device

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm** or **bun**
- A **Supabase** account ([supabase.com](https://supabase.com))
- A **Google AI API key** for Gemini ([ai.google.dev](https://ai.google.dev))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/doodletales.git
   cd doodletales
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in the required environment variables:
   ```env
   # Authentication
   AUTH_SECRET=your-auth-secret-here  # Generate with: npx auth secret
   
   # Database (Supabase)
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_KEY=your-supabase-service-key
   
   # Security
   SCRIPT_KEY=your-script-key-here
   ```

4. **Set up Supabase Database**
   
   Create a `users` table in your Supabase database with the following schema:
   ```sql
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     ai_api_key TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to start playing!

## 🎮 How to Play

1. **Sign up** or **log in** to your account
2. **Configure your AI API key** (Google Gemini) in the settings
3. **Choose a theme** for your adventure
4. **Draw your actions** on the canvas when prompted
5. **Watch the AI** interpret your drawings and continue the story
6. **Keep drawing** to shape your unique narrative!

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
  - Dialog, Dropdown Menu, Hover Card, Label, Navigation Menu, Popover, Progress, Scroll Area, Select, Separator, Slot, Tooltip
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Additional icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### AI & Image Generation
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI integration toolkit
- **[@ai-sdk/google](https://sdk.vercel.ai/providers/ai-sdk-providers/google)** - Google Gemini integration
- **[Shiki](https://shiki.style/)** - Syntax highlighting

### Authentication & Database
- **[NextAuth.js 5](https://authjs.dev/)** - Authentication for Next.js
- **[Supabase](https://supabase.com/)** - PostgreSQL database and auth backend
- **[@auth/supabase-adapter](https://authjs.dev/reference/adapter/supabase)** - Supabase adapter for NextAuth
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** / **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing

### Drawing & Visualization
- **[react-sketch-canvas](https://www.npmjs.com/package/react-sketch-canvas)** - Canvas drawing component
- **[XYFlow React](https://reactflow.dev/)** - Node-based UI components

### Animation & Effects
- **[Motion](https://motion.dev/)** - Animation library
- **[GSAP](https://gsap.com/)** - Professional-grade animation
- **[Lottie React](https://www.npmjs.com/package/lottie-react)** - Lottie animations
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component

### Utilities
- **[clsx](https://www.npmjs.com/package/clsx)** - Conditional className utility
- **[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)** - Merge Tailwind classes
- **[class-variance-authority](https://cva.style/docs)** - Component variants
- **[nanoid](https://www.npmjs.com/package/nanoid)** - Unique ID generator
- **[uuid](https://www.npmjs.com/package/uuid)** - UUID generation
- **[sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[cmdk](https://cmdk.paco.me/)** - Command menu component
- **[streamdown](https://www.npmjs.com/package/streamdown)** - Markdown streaming
- **[tokenlens](https://www.npmjs.com/package/tokenlens)** - Token counting
- **[use-stick-to-bottom](https://www.npmjs.com/package/use-stick-to-bottom)** - Auto-scroll hook

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Linting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting
- **[@stylistic/eslint-plugin](https://eslint.style/)** - Code style rules
- **[Commitizen](http://commitizen.github.io/cz-cli/)** - Conventional commits
- **[PostCSS](https://postcss.org/)** - CSS processing

## 📁 Project Structure

```
DoodleTales/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── describe-image/   # Image interpretation endpoint
│   │   ├── generate-image/   # Image generation endpoint
│   │   └── generate-story/   # Story generation endpoint
│   ├── context/              # React contexts
│   ├── game/                 # Game page
│   ├── hooks/                # Custom React hooks
│   ├── services/             # Service layer (Supabase, etc.)
│   ├── signup/               # Signup page
│   └── theme-provider/       # Theme selection page
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── APIOptions.tsx        # API configuration
│   ├── Navbar.tsx            # Navigation bar
│   └── login-form.tsx        # Login form
├── lib/                      # Utility libraries
│   └── prompts.ts            # AI prompts
├── public/                   # Static assets
├── resources/                # Additional resources
├── auth.config.ts            # NextAuth configuration
├── auth.ts                   # NextAuth setup
└── package.json              # Dependencies
```

## 🔧 Configuration

### API Keys Setup

After signing up, you'll need to configure your Google AI API key:

1. Get your API key from [Google AI Studio](https://ai.google.dev/)
2. Navigate to the API Options page after login
3. Enter your API key
4. Start creating stories!

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Copy your project URL and service key
3. Add them to your `.env.local` file
4. Run the database migration to create the `users` table

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes using Commitizen (`git cz` or `npm run commit`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 DoodleTales

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **Google Gemini** for powering the AI narrative generation
- **Vercel** for the AI SDK and Next.js framework
- **Supabase** for the database and authentication backend
- **shadcn/ui** for the beautiful component library
- All the amazing open-source libraries that make this project possible

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ and AI**
