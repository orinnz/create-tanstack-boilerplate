# 🚀 Create TanStack Boilerplate

A fast, production-ready CLI to scaffold [TanStack Start](https://tanstack.com/start/latest) applications (React + Vite + TypeScript + Tailwind). Use this tool to generate opinionated, scalable starters with optional i18n, auth, UI, and testing presets — perfect for teams and projects that need a solid default stack.

[![npm version](https://img.shields.io/npm/v/create-tanstack-boilerplate.svg)](https://www.npmjs.com/package/create-tanstack-boilerplate) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Issues](https://img.shields.io/github/issues/phuocAnonydev14/create-tanstack-boilerplate)](https://github.com/phuocAnonydev14/create-tanstack-boilerplate/issues)

## ✨ Features

✨ **Interactive Setup** - Answer a few questions and get a fully configured project  
🎨 **UI Components** - Optional Radix UI + Tailwind CSS + shadcn/ui integration  
🌍 **Internationalization** - Multi-language support with Inlang/Paraglide  
⚡ **State Management** - Optional Jotai or Zustand  
🔐 **Authentication** - Google OAuth ready  
🎭 **Animations** - Framer Motion support  
✅ **Testing** - Vitest + Testing Library setup  
🎯 **Code Quality** - Biome linter/formatter + Husky + lint-staged
☁️ **Cloudflare Deployment** - Adds `@cloudflare/vite-plugin` and automatically creates a `wrangler.json` for easy deployment to Cloudflare Pages.  

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started in 2 minutes
- **[Examples & Patterns](EXAMPLES.md)** - Common use cases and code examples
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines
- **[Testing Guide](TESTING.md)** - How to test the CLI
- **[Changelog](CHANGELOG.md)** - Version history

## 🚀 Quick Start

### NPM
```bash
npx create-tanstack-boilerplate
```

### PNPM
```bash
pnpm create tanstack-boilerplate
```

### Yarn
```bash
yarn create tanstack-boilerplate
```

## 🎯 What You Get

The CLI will guide you through:

1. **Project name** - Name of your new project
2. **Package manager** - Choose between pnpm, npm, or yarn
3. **Features** - Select which features you want:
   - 🌍 Internationalization (i18n)
   - 🎨 UI Components (Radix UI + Tailwind)
   - ⚡ State Management (Jotai)
   - 🔐 Authentication (Google OAuth)
   - 🎭 Animations (Framer Motion)
   - ✅ Testing (Vitest)
   - 🎯 Code Quality (Biome + Husky)

4. **Languages** (if i18n selected) - Choose which languages to support
5. **Base locale** (if i18n selected) - Set your default language
6. **Git initialization** - Initialize a git repository

## 📸 Example

```bash
$ npx create-tanstack-boilerplate

🚀 Create TanStack Start Boilerplate

✔ Project name: … my-awesome-app
✔ Select a package manager: › pnpm
✔ Select features to include: › i18n, ui, quality
✔ Select languages to support: › en, vi
✔ Select base/default language: › en
✔ Initialize git repository? … yes

📦 Creating project structure...

✓ Project created successfully!

Next steps:

  cd my-awesome-app
  pnpm install
  pnpm dev
```

## 📁 Project Structure

```
my-app/
├── src/
│   ├── routes/              # TanStack Router routes
│   ├── components/          # React components
│   ├── lib/                 # Utility libraries
│   ├── styles/              # Global styles
│   └── ...
├── messages/                # i18n translations (if selected)
├── tests/                   # Test files (if selected)
└── ...
```

See [EXAMPLES.md](EXAMPLES.md) for detailed structure examples.

## 🛠️ Tech Stack

### Core (Always Included)

- ⚡ **TanStack Start** - Full-stack React framework
- ⚛️ **React 19** - Latest React
- 🔄 **TanStack Router** - Type-safe routing
- 🔍 **TanStack Query** - Data fetching & caching
- 📦 **Vite** - Lightning-fast build tool
- 🎯 **TypeScript** - Type safety

### Optional Features

See [EXAMPLES.md](EXAMPLES.md) for detailed feature descriptions and usage examples.

## 🧪 Development

### Local Testing

```bash
# Clone the repo
git clone <your-repo>
cd create-tanstack-boilerplate

# Install dependencies
pnpm install

# Test locally
node index.js

# Or link globally
npm link
create-tanstack-boilerplate
```

See [TESTING.md](TESTING.md) for comprehensive testing guide.

### Publishing

Quick publish (for maintainers):
```bash
npm login
npm publish
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. Fork the repo
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT - See [LICENSE](LICENSE) file for details.

## 🙏 Credits

Built with ❤️ using:
- [TanStack Start](https://tanstack.com/start)
- [Prompts](https://github.com/terkelg/prompts)
- [Kolorist](https://github.com/marvinhagemeister/kolorist)

## 📊 Stats

- **Package Size**: ~25KB
- **Dependencies**: 3
- **Node Version**: >=18.0.0
- **License**: MIT

---

**Happy coding! 🚀**

Made with ❤️ by the community
## Links

- **NPM Package**: https://www.npmjs.com/package/create-tanstack-boilerplate
- **GitHub Repository**: https://github.com/phuocAnonydev14/create-tanstack-boilerplate
- **Issue Tracker**: https://github.com/phuocAnonydev14/create-tanstack-boilerplate/issues

---
