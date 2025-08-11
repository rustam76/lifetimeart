# LifetimeArt - Home Renovation & Design Website

![LifetimeArt Logo](public/assets/Logo.webp)

A modern, responsive website for LifetimeArt, a home renovation and design company based in London. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [SEO Optimization](#seo-optimization)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)

## ✨ Features

- **Modern UI/UX Design**: Clean, responsive interface built with Tailwind CSS
- **Performance Optimized**: Fast loading with Next.js App Router and Turbopack
- **SEO Ready**: Includes sitemap generation and metadata optimization
- **Responsive Design**: Fully responsive across all device sizes
- **Component-Based Architecture**: Modular components for easy maintenance
- **TypeScript Integration**: Type-safe code for better development experience
- **Animation Effects**: Smooth animations with Framer Motion

## 🏗️ Project Structure

```
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Homepage
│   ├── robots.txt/       # Robots.txt configuration
│   ├── sitemap.xml/      # Sitemap configuration
│   └── server-sitemap.xml/ # Server-side sitemap
├── components/           # React components
│   ├── about-us.tsx      # About Us section
│   ├── contact.tsx       # Contact form
│   ├── faq.tsx           # FAQ section
│   ├── footer.tsx        # Footer component
│   ├── hero.tsx          # Hero section
│   ├── navbar.tsx        # Navigation bar
│   ├── our-work.tsx      # Portfolio/Work section
│   ├── services.tsx      # Services section
│   ├── testimonials.tsx  # Testimonials section
│   └── ui/               # Reusable UI components
│       ├── badge.tsx     # Badge component
│       ├── button.tsx    # Button component
│       ├── input.tsx     # Input component
│       ├── project-card.tsx # Project card component
│       └── more...       # Other UI components
├── lib/                  # Utility functions and helpers
├── public/               # Static assets
│   ├── assets/           # Images and media files
│   └── sitemap.xml       # Generated sitemap
└── next-sitemap.config.js # Sitemap configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/lifetimeart.git
cd lifetimeart
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💻 Development

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Adding New Components

1. Create a new component file in the `components` directory
2. Import and use the component in your pages

### Styling

This project uses Tailwind CSS for styling. The main configuration is in:

- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles

## 🔍 SEO Optimization

The project includes SEO optimization with:

- **Metadata Configuration**: Set up in `app/layout.tsx`
- **Sitemap Generation**: Automatically generated with `next-sitemap`
- **Robots.txt**: Configured for search engine crawling

### Sitemap Configuration

The sitemap is automatically generated during the build process using `next-sitemap`. The configuration is in `next-sitemap.config.js`.

To manually generate the sitemap:

```bash
npx next-sitemap
```

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build settings

### Other Hosting Options

You can also deploy to other platforms like Netlify, AWS, or any hosting provider that supports Node.js applications.

## 🛠️ Technologies Used

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **SEO**: [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- **Development Tools**: ESLint, Turbopack

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ by LifetimeArt Team
