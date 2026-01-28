# Getting Started - Data Street Website

Complete guide to setting up and running the Data Street website locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

### Verify Installation

```bash
node --version   # Should show v18.0.0 or higher
npm --version    # Should show 9.0.0 or higher
git --version    # Should show git version info
```

## Installation Steps

### 1. Clone or Navigate to Project

If you already have the project:
```bash
cd "d:\Data Street\Website V2"
```

If cloning from repository:
```bash
git clone <repository-url>
cd "Data Street/Website V2"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

**Expected installation time**: 2-5 minutes

### 3. Run Development Server

```bash
npm run dev
```

The development server will start on [http://localhost:3000](http://localhost:3000)

You should see output like:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully in 2.5s
```

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Data Street home page with:
- Navigation bar
- Hero section
- Impact metrics
- Why Join Us section
- Featured projects
- And more...

## Project Structure Overview

```
Data Street Website V2/
├── app/                      # Next.js pages (App Router)
│   ├── about/               # About Us page
│   ├── blog/                # Blog listing
│   ├── contact/             # Contact page
│   ├── departments/         # Departments page
│   ├── events/              # Events calendar
│   ├── join-us/             # Recruitment
│   ├── projects/            # Projects showcase
│   ├── admin/               # Admin dashboard (Phase 2)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
│
├── components/              # Reusable UI components
│   ├── NavBar.tsx           # Navigation
│   ├── Footer.tsx           # Footer
│   ├── Hero.tsx             # Hero sections
│   ├── Section.tsx          # Section wrapper
│   ├── Card.tsx             # Card component
│   ├── Grid.tsx             # Grid layout
│   └── AnimatedCounter.tsx  # Animated counters
│
├── lib/                     # Utilities and helpers
│   ├── utils.ts             # Helper functions
│   ├── types.ts             # TypeScript types
│   └── data.ts              # Mock data (Phase 1)
│
├── server/                  # Backend (Phase 2)
│   └── README.md            # Backend setup guide
│
├── public/                  # Static assets
│   └── (images, fonts, etc.)
│
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
├── README.md                # Project overview
├── DEPLOYMENT.md            # Deployment guide
└── GETTING_STARTED.md       # This file
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## Development Workflow

### 1. Making Changes

The development server has **hot reload** enabled. Any changes you make to files will automatically update in the browser.

**Try it:**
1. Open `app/page.tsx`
2. Change the hero title
3. Save the file
4. See changes instantly in browser

### 2. Adding New Pages

Create a new folder in `app/` with a `page.tsx` file:

```bash
# Create new page
mkdir app/new-page
```

Create `app/new-page/page.tsx`:
```tsx
export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
    </main>
  );
}
```

Access at: http://localhost:3000/new-page

### 3. Using Components

Import and use existing components:

```tsx
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';

export default function MyPage() {
  return (
    <>
      <NavBar />
      <Section title="My Section">
        <Card title="My Card" description="Card content" />
      </Section>
      <Footer />
    </>
  );
}
```

### 4. Styling

This project uses **Tailwind CSS**. Style elements with utility classes:

```tsx
<div className="bg-navy text-white p-8 rounded-lg">
  <h1 className="font-heading text-4xl font-bold mb-4">
    Title
  </h1>
  <p className="font-body text-lg">
    Content
  </p>
</div>
```

**Available brand colors:**
- `bg-navy` / `text-navy` - Deep Navy (#0B132B)
- `bg-teal` / `text-teal` - Accent Teal (#00BFA6)
- `bg-gray-cool` / `text-gray-cool` - Cool Gray (#DDE1E4)

### 5. Dark Mode

Dark mode is automatically enabled. Use dark: variants:

```tsx
<div className="bg-white dark:bg-navy text-navy dark:text-white">
  Content adapts to theme
</div>
```

Toggle dark mode with the moon/sun icon in the navigation bar.

## Common Tasks

### Adding a New Component

1. Create file in `components/`:
```bash
# Example: Button component
touch components/Button.tsx
```

2. Write component:
```tsx
export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors"
    >
      {children}
    </button>
  );
}
```

3. Use it:
```tsx
import Button from '@/components/Button';

<Button onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

### Adding Mock Data

Edit `lib/data.ts` to add sample content:

```tsx
export const newProjects: Project[] = [
  {
    id: 'proj-6',
    title: 'My New Project',
    description: 'Project description',
    domain: 'AI/ML',
    status: 'Active',
    tags: ['Python', 'TensorFlow'],
    startDate: new Date(),
  },
];
```

### Installing New Packages

```bash
# Example: Install a charting library
npm install recharts

# For TypeScript types
npm install --save-dev @types/recharts
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Or ignore and continue
npm run dev
```

### Styling Not Working

```bash
# Rebuild Tailwind CSS
npm run dev
# Tailwind auto-rebuilds on file changes
```

## Next Steps

### Phase 1 (Current - Frontend Complete)
- ✅ All pages implemented
- ✅ Responsive design
- ✅ Dark mode
- ✅ Animations
- ✅ Component library

### Phase 2 (Backend & Admin - Coming Soon)
- [ ] Set up Express.js backend
- [ ] Implement MongoDB database
- [ ] Add authentication
- [ ] Build admin dashboard
- [ ] API integration

### Future Enhancements
- [ ] Member portal
- [ ] AI project showcase
- [ ] Public API
- [ ] Analytics dashboard

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)

## Need Help?

- **Documentation**: Check README.md for overview
- **Deployment**: See DEPLOYMENT.md for hosting guide
- **Backend**: See server/README.md for Phase 2 setup
- **Issues**: Create an issue in the repository
- **Contact**: dev@datastreet.org

## Tips for Success

1. **Start Small**: Familiarize yourself with existing pages before creating new ones
2. **Use Components**: Reuse existing components instead of recreating
3. **Follow Patterns**: Look at existing pages for code structure examples
4. **Test Mobile**: Use browser DevTools to test responsive design
5. **Git Commits**: Make small, frequent commits with clear messages

---

Happy coding! 🚀

**Data Street Team**
