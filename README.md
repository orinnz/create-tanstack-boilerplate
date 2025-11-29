# 🚀 Create TanStack Boilerplate

A fast, production-ready CLI to scaffold [TanStack Start](https://tanstack.com/start/latest) applications (React + Vite + TypeScript + Tailwind). Use this tool to generate opinionated, scalable starters with tanstack libraries, optional i18n, Form Management, Validation, UI, Cloudflare Deployment, and testing presets — perfect for teams and projects that need a solid default stack.

[![npm version](https://img.shields.io/npm/v/create-tanstack-boilerplate.svg)](https://www.npmjs.com/package/create-tanstack-boilerplate) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Issues](https://img.shields.io/github/issues/phuocAnonydev14/create-tanstack-boilerplate)](https://github.com/phuocAnonydev14/create-tanstack-boilerplate/issues)

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
   - 📋 Form Management (TanStack Form)
   - 🛡️ Validation (Zod/ArkType)
   - 🎭 Animations (Framer Motion)
   - ✅ Testing (Vitest)
   - 🎯 Code Quality (Biome + Husky)
   - ☁️ Cloudflare Deployment (Workers)

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
- **Dependencies**: Minimal (prompts, kolorist, changesets)
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
