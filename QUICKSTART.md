# 🚀 Quick Start Guide

## For Users (Creating a New Project)

### 1. Run the CLI

```bash
npx create-tanstack-boilerplate
# or
pnpm create tanstack-boilerplate
# or
yarn create tanstack-boilerplate
```

### 2. Answer the Prompts

```
🚀 Create TanStack Start Boilerplate

✔ Project name: my-app
✔ Select a package manager: pnpm
✔ Select features to include: i18n, ui, quality
✔ Select languages to support: en, vi
✔ Select base/default language: en
✔ Initialize git repository? yes
```

### 3. Install & Run

```bash
cd my-app
pnpm install
pnpm dev
```

### 4. Open Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## For Developers (Working on the CLI)

### 1. Clone & Setup

```bash
git clone <your-repo>
cd create-tanstack-boilerplate
pnpm install
```

### 2. Test Locally

```bash
# Run directly
node index.js

# Or link globally
npm link
create-tanstack-boilerplate
```

### 3. Make Changes

Edit `index.js` and test your changes.

### 4. Publish

See [PUBLISHING.md](PUBLISHING.md) for detailed publishing instructions.

---

## Feature Combinations


### Recommended for Production
- ✅ i18n
- ✅ UI Components
- ✅ Testing
- ✅ Code Quality

---

## Common Use Cases

### 1. Simple Landing Page
```
Features: ui
Time: ~2 minutes
```

### 2. Multi-language Website
```
Features: i18n, ui, quality
Languages: en, vi, ja
Time: ~3 minutes
```

### 3. Full Application
```
Features: all
Time: ~5 minutes
```

---

## Troubleshooting

### CLI Not Found

```bash
# Update npm
npm install -g npm@latest

# Clear cache
npm cache clean --force

# Try again
npx create-tanstack-boilerplate@latest
```

### Installation Errors

```bash
# Use specific Node version (18+)
node --version  # Should be >= 18.0.0

# Try different package manager
npm create tanstack-boilerplate
# or
pnpm create tanstack-boilerplate
```

### Generated Project Won't Start

```bash
# Clear node_modules
rm -rf node_modules
pnpm install

# Check Node version
node --version

# Run dev server
pnpm dev
```

---

## Next Steps After Setup

### 1. Explore the Structure

```
my-app/
├── src/routes/        # Add your pages here
├── src/components/    # Create components
└── src/styles/        # Customize styles
```

### 2. Add Your First Route

Create `src/routes/about.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>About Page</div>
}
```

### 3. Add Components (if UI selected)

```bash
# Add shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card
```

### 4. Setup i18n (if selected)

Edit `messages/en.json` and `messages/vi.json`:

```json
{
  "welcome": "Welcome!",
  "about": "About Us"
}
```

Use in components:

```tsx
import * as m from '@/paraglide/messages'

function Home() {
  return <h1>{m.welcome()}</h1>
}
```

---

## Resources

- 📚 [TanStack Start Docs](https://tanstack.com/start)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🧩 [Radix UI](https://radix-ui.com)
- 🌍 [Inlang](https://inlang.com)
- ✅ [Vitest](https://vitest.dev)

---

**Happy coding! 🎉**
