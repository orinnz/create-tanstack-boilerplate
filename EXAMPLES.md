# 📸 Examples & Screenshots

## Example Projects

### 1. Minimal Setup

**Features**: Core only

```bash
npx create-tanstack-boilerplate
# Select: No features
```

**Result**:
- ⚡ TanStack Start
- ⚛️ React 19
- 🔄 TanStack Router
- 📦 Vite
- 🎯 TypeScript

**Use Case**: Simple SPA, prototypes, learning

---

### 2. UI-Focused Project

**Features**: UI Components, Code Quality

```bash
npx create-tanstack-boilerplate
# Select: ui, quality
```

**Result**:
- Everything from Minimal +
- 🎨 Tailwind CSS 4
- 🧩 Radix UI
- 🎭 shadcn/ui ready
- 🎯 Biome linter
- 🐶 Husky hooks

**Use Case**: Landing pages, marketing sites, portfolios

---

### 3. Multi-language Website

**Features**: i18n, UI, Quality

```bash
npx create-tanstack-boilerplate
# Select: i18n, ui, quality
# Languages: en, vi, ja
# Base: en
```

**Result**:
- Everything from UI-Focused +
- 🌍 Inlang/Paraglide
- 🗣️ Multi-language support
- 📝 Translation files

**Use Case**: International websites, SaaS products

**Example Usage**:

```tsx
// messages/en.json
{
  "welcome": "Welcome!",
  "cta": "Get Started"
}

// messages/vi.json
{
  "welcome": "Chào mừng!",
  "cta": "Bắt đầu"
}

// Component
import * as m from '@/paraglide/messages'

function Hero() {
  return (
    <div>
      <h1>{m.welcome()}</h1>
      <button>{m.cta()}</button>
    </div>
  )
}
```

---

### 4. Full-Stack Application

**Features**: All features

```bash
npx create-tanstack-boilerplate
# Select all features
│   ├── en.json
│   └── vi.json
├── tests/
│   ├── setup.ts
│   └── example.test.tsx
├── public/
├── project.inlang/
│   └── settings.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.mjs
├── biome.json
└── components.json
```

---

## Common Patterns

### 1. Creating a New Page

```tsx
// src/routes/blog.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: Blog,
})

function Blog() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Blog</h1>
    </div>
  )
}
```

### 2. Using UI Components (if selected)

```bash
# Install shadcn components
npx shadcn@latest add button card dialog
```

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function Dashboard() {
  return (
    <Card>
      <h2>Dashboard</h2>
      <Button>Click me</Button>
    </Card>
  )
}
```

### 3. i18n with Route Parameters

```tsx
// src/routes/$lang/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import * as m from '@/paraglide/messages'

export const Route = createFileRoute('/$lang/')({
  component: Home,
})

function Home() {
  const { lang } = Route.useParams()
  return <h1>{m.welcome()}</h1>
}
```

### 4. State Management

```tsx
// src/store/cart.ts
import { atom } from 'jotai'

export const cartAtom = atom([])
export const cartCountAtom = atom((get) => get(cartAtom).length)

// Component
import { useAtom, useAtomValue } from 'jotai'
import { cartAtom, cartCountAtom } from '@/store/cart'

function Cart() {
  const [cart, setCart] = useAtom(cartAtom)
  const count = useAtomValue(cartCountAtom)
  
  return <div>Items: {count}</div>
}
```

### 5. Testing

```tsx
// tests/home.test.tsx
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Home from '@/routes/index'

test('renders home page', () => {
  render(<Home />)
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome')
})
```

---

## Package Manager Comparison

| Feature | pnpm | npm | yarn |
|---------|------|-----|------|
| Speed | ⚡⚡⚡ | ⚡ | ⚡⚡ |
| Disk Space | 💾 Efficient | 💾 Standard | 💾 Standard |
| Monorepo | ✅ Excellent | ⚠️ OK | ✅ Good |
| Recommended | ✅ Yes | ⚠️ OK | ⚠️ OK |

---

## Performance Tips

### 1. Code Splitting

```tsx
import { lazy } from 'react'

const Dashboard = lazy(() => import('./routes/dashboard'))
```

### 2. Image Optimization

```tsx
// Use WebP format
<img src="/images/hero.webp" alt="Hero" loading="lazy" />
```

### 3. Bundle Analysis

```bash
pnpm build
# Check .output/public for bundle sizes
```

---

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
pnpm build

# Deploy .output/public
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## Migration Guide

### From Create React App

1. Move `src/` content to new project
2. Update imports (no need for `react-app-env.d.ts`)
3. Convert routes to TanStack Router format
4. Update `index.html` if needed

### From Next.js

1. Convert pages to TanStack Router routes
2. Update API routes (use TanStack Start API routes)
3. Update imports
4. Adjust styling (Tailwind config)

---

## FAQ

**Q: Can I add features later?**  
A: Yes! Manually install packages and copy setup code.

**Q: Which package manager should I use?**  
A: pnpm is recommended for speed and efficiency.

**Q: Can I use JavaScript instead of TypeScript?**  
A: TypeScript is recommended, but you can rename `.ts` to `.js`.

**Q: How do I add more languages?**  
A: Edit `project.inlang/settings.json` and add new message files.

**Q: Can I customize the templates?**  
A: Yes! Fork the repo and modify `index.js`.

---

**More examples coming soon! 🚀**
