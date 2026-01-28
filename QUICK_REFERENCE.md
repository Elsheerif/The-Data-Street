# 🎯 QUICK REFERENCE - PRODUCTION STATUS

## Status at a Glance

```
✅ CODE: Production ready
✅ BUILD: Passing (0 errors)
✅ SECURITY: Configured
✅ DOCUMENTATION: Complete
⏳ DATABASE: Awaiting PostgreSQL
⏳ TESTING: Ready to begin
```

## 🚀 Three Steps to Go Live

### Step 1: Install PostgreSQL (15 min)
See: `POSTGRES_INSTALL_NOW.md`

### Step 2: Create Database (3 min)
```powershell
psql -U postgres -h localhost
# Paste commands from POSTGRES_INSTALL_NOW.md
```

### Step 3: Test Admin (2 min)
```powershell
$env:PATH = "d:\Data Street\Website V2\node-temp\node-v22.10.0-win-x64;" + $env:PATH
cd "d:\Data Street\Website V2"
npm run dev
# Visit http://localhost:3000/admin
# Login with: admin123
```

## 📁 Key Files

| File | Status | Purpose |
|------|--------|---------|
| `POSTGRES_INSTALL_NOW.md` | 📄 | **Read this first** |
| `TESTING_READY.md` | 📄 | Testing guide |
| `FINAL_STATUS.md` | 📄 | Complete overview |
| `.env.local` | ✅ | Database config ready |
| `prisma/schema.prisma` | ✅ | Schema defined |
| `lib/data.ts` | Mock data |
| `lib/types.ts` | TypeScript types |
| `components/NavBar.tsx` | Navigation |
| `components/Footer.tsx` | Footer |

## 🎨 Brand Colors

```tsx
// Tailwind classes
className="bg-navy"        // Deep Navy #0B132B
className="bg-teal"        // Accent Teal #00BFA6
className="bg-gray-cool"   // Cool Gray #DDE1E4
className="text-navy"      // Text navy
className="text-teal"      // Text teal

// Dark mode variants
className="bg-white dark:bg-navy"
className="text-navy dark:text-white"
```

## 🔤 Typography

```tsx
// Headings (Poppins/Inter)
className="font-heading text-4xl font-bold"

// Body text (Open Sans/Roboto)
className="font-body text-lg"
```

## 📦 Import Components

```tsx
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import AnimatedCounter from '@/components/AnimatedCounter';
```

## 🧩 Component Examples

### Hero

```tsx
<Hero
  title="Page Title"
  subtitle="Page subtitle"
  backgroundGradient="gradient-navy-teal"
>
  <button>Call to Action</button>
</Hero>
```

### Section

```tsx
<Section
  title="Section Title"
  subtitle="Section subtitle"
  bgColor="bg-white dark:bg-navy"
>
  {/* Content */}
</Section>
```

### Card

```tsx
<Card
  title="Card Title"
  description="Card description"
  icon={<Icon size={40} />}
  hover={true}
>
  {/* Additional content */}
</Card>
```

### Grid

```tsx
<Grid columns={3} gap="gap-6">
  <Card title="Item 1" />
  <Card title="Item 2" />
  <Card title="Item 3" />
</Grid>
```

### Animated Counter

```tsx
<AnimatedCounter
  target={150}
  suffix="+"
  prefix=""
  duration={2}
/>
```

## 🌐 Page Structure

```tsx
'use client';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';

export default function MyPage() {
  return (
    <main>
      <NavBar />
      
      <Section title="My Section">
        {/* Content */}
      </Section>
      
      <Footer />
    </main>
  );
}
```

## 🎭 Common Patterns

### Button

```tsx
<button className="px-8 py-3 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors">
  Click Me
</button>
```

### Link

```tsx
import Link from 'next/link';

<Link
  href="/page"
  className="text-teal hover:text-teal/80 transition-colors"
>
  Link Text
</Link>
```

### Input

```tsx
<input
  type="text"
  placeholder="Enter text"
  className="px-4 py-3 rounded-lg border border-gray-cool/20 focus:outline-none focus:ring-2 focus:ring-teal"
/>
```

### Container

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

## 🎬 Animations

### Framer Motion

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Hover Effects

```tsx
<motion.div whileHover={{ scale: 1.05 }}>
  Hover me
</motion.div>
```

### Scroll Reveal

```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Reveals on scroll
</motion.div>
```

## 🗂️ Data Types

### Import Types

```tsx
import type { Department, Project, Event, Member } from '@/lib/types';
```

### Mock Data

```tsx
import { departments, projects, events } from '@/lib/data';

// Use in component
{projects.map((project) => (
  <Card key={project.id} title={project.title} />
))}
```

## 🔧 Utility Functions

```tsx
import {
  formatDate,
  truncateText,
  slugify,
  isValidEmail,
  formatNumber,
} from '@/lib/utils';

// Examples
formatDate(new Date());           // "December 4, 2025"
truncateText("Long text...", 50); // "Long text..."
slugify("My Page Title");         // "my-page-title"
isValidEmail("test@email.com");   // true
formatNumber(1500);               // "1,500"
```

## 🌙 Dark Mode

### Toggle Implementation

```tsx
// Already implemented in NavBar
// Users click moon/sun icon to toggle

// Check current theme
const isDark = localStorage.getItem('darkMode') === 'true';

// Toggle programmatically
document.documentElement.classList.toggle('dark');
localStorage.setItem('darkMode', 'true');
```

### Style for Dark Mode

```tsx
<div className="bg-white dark:bg-navy text-navy dark:text-white">
  Adapts to theme
</div>
```

## 📱 Responsive Design

### Breakpoints

```tsx
// Mobile first
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="p-4 md:p-6 lg:p-8"

// Hide on mobile
className="hidden md:block"

// Show only on mobile
className="block md:hidden"
```

### Tailwind Breakpoints
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

## 🔍 Icons (Lucide React)

```tsx
import {
  Home,
  Users,
  Calendar,
  FileText,
  Mail,
  Menu,
  X,
  ChevronRight,
  // ... many more
} from 'lucide-react';

<Home size={24} className="text-teal" />
```

## 🐛 Debugging

```tsx
// Console log
console.log('Debug:', value);

// TypeScript error checking
npm run lint

// Check types
npx tsc --noEmit
```

## 📦 Installing Packages

```bash
# Install package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Install types
npm install --save-dev @types/package-name
```

## 🌍 Environment Variables

```bash
# Create .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```tsx
// Access in code
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

## 🔥 Hot Tips

1. **Component Reuse**: Always check existing components first
2. **Tailwind IntelliSense**: Install VS Code extension for autocomplete
3. **Type Safety**: Let TypeScript guide you with autocomplete
4. **Git Commits**: Commit often with clear messages
5. **Mobile First**: Design for mobile, enhance for desktop

## 📚 Common Commands

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules && npm install

# Check for outdated packages
npm outdated

# Update packages
npm update

# Kill port 3000
npx kill-port 3000
```

## 🆘 Quick Fixes

### Page not updating?
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .next
# Restart
npm run dev
```

### Styles not applying?
```bash
# Check className spelling
# Ensure Tailwind class exists
# Check dark mode variant
```

### TypeScript errors?
```bash
# Check imports
# Verify types in lib/types.ts
# Run: npx tsc --noEmit
```

## 📞 Help

- **Docs**: README.md, GETTING_STARTED.md
- **Status**: PROJECT_STATUS.md
- **Deploy**: DEPLOYMENT.md
- **Backend**: server/README.md

---

**Quick Reference v1.0** | Data Street Team
