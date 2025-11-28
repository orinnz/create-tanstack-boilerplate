# 🎬 Demo & Testing Guide

## Quick Demo

### 1. Run the CLI

```bash
cd /home/phuoc/Icetea/aicademy/aicademy-frontend/create-boilerplate
node index.js
```

### 2. Example Interaction

```
🚀 Create TanStack Start Boilerplate

✔ Project name: demo-app
✔ Select a package manager: pnpm
✔ Select features to include: i18n, ui, quality
✔ Select languages to support: en, vi
✔ Select base/default language: en
✔ Initialize git repository? yes

📦 Creating project structure...

✓ Project created successfully!

Next steps:

  cd demo-app
  pnpm install
  pnpm dev
```

## Testing Checklist

### ✅ Basic Tests

- [ ] CLI runs without errors
- [ ] All prompts work correctly
- [ ] Project directory is created
- [ ] All files are generated
- [ ] package.json is valid

### ✅ Feature Tests

Test each feature combination:

#### 1. Minimal (No features)
```bash
node index.js
# Name: test-minimal
# Features: (none)
```

Expected files:
- ✅ src/routes/__root.tsx
- ✅ src/routes/index.tsx
- ✅ src/client.tsx
- ✅ src/router.tsx
- ✅ package.json
- ✅ tsconfig.json
- ✅ vite.config.ts

#### 2. With i18n
```bash
node index.js
# Name: test-i18n
# Features: i18n
# Languages: en, vi
# Base: en
```

Expected files:
- ✅ All from minimal +
- ✅ project.inlang/settings.json
- ✅ messages/en.json
- ✅ messages/vi.json

#### 3. With UI
```bash
node index.js
# Name: test-ui
# Features: ui
```

Expected files:
- ✅ All from minimal +
- ✅ tailwind.config.mjs
- ✅ components.json
- ✅ src/lib/utils.ts

#### 4. Full Stack
```bash
node index.js
# Name: test-full
# Features: all
```

Expected files:
- ✅ All features combined
- ✅ vitest.config.ts
- ✅ biome.json
- ✅ tests/setup.ts

### ✅ Generated Project Tests

For each generated project:

```bash
cd test-app

# 1. Install dependencies
pnpm install
# Should complete without errors

# 2. Check TypeScript
pnpm tsc --noEmit
# Should have no errors

# 3. Run dev server
pnpm dev
# Should start on port 3000

# 4. Build for production
pnpm build
# Should complete successfully

# 5. Run tests (if testing enabled)
pnpm test
# Should pass

# 6. Lint (if quality enabled)
pnpm lint
# Should pass
```

## Manual Testing Script

Create a test script:

```bash
#!/bin/bash

echo "🧪 Running comprehensive tests..."

# Test 1: Minimal
echo "\n📦 Test 1: Minimal setup"
node index.js << EOF
test-minimal
pnpm


yes
EOF

# Test 2: With i18n
echo "\n📦 Test 2: With i18n"
node index.js << EOF
test-i18n
pnpm
i18n
en vi
en
yes
EOF
  
  # Create project
  node index.js << EOF
test-$name
pnpm
$features
$langs
en
yes
EOF
  
  # Test project
  cd test-$name
  pnpm install
  pnpm tsc --noEmit
  pnpm build
  cd ..
  
  echo "✅ $name passed"
done

echo "🎉 All tests passed!"
```

## Performance Testing

### Measure CLI Speed

```bash
time node index.js << EOF
perf-test
pnpm


yes
EOF
```

Expected: < 2 seconds

### Measure Generated Project

```bash
cd perf-test
time pnpm install
time pnpm build
```

## Visual Testing

### 1. Check Terminal Output

- ✅ Colors display correctly
- ✅ Prompts are clear
- ✅ Progress messages show
- ✅ Success message appears

### 2. Check Generated Files

```bash
# Use tree to visualize
tree test-app -L 3 -I node_modules
```

## Edge Cases

### Test Invalid Inputs

1. **Empty project name**
```
✔ Project name: 
❌ Should show error
```

2. **Invalid characters**
```
✔ Project name: my app!@#
❌ Should show error
```

3. **Existing directory**
```
✔ Project name: existing-dir
❌ Should show error
```

4. **Cancel operation**
```
Press Ctrl+C during prompts
✅ Should exit gracefully
```

## Regression Testing

After making changes:

```bash
# 1. Test all feature combinations
./test-all.sh

# 2. Test on different OS
# - Linux ✅
# - macOS ✅
# - Windows ✅

# 3. Test with different Node versions
nvm use 18 && node index.js
nvm use 20 && node index.js
nvm use 22 && node index.js

# 4. Test with different package managers
# - pnpm ✅
# - npm ✅
# - yarn ✅
```

## User Acceptance Testing

### Scenario 1: New Developer

"I want to create a simple React app"

```bash
npx create-tanstack-boilerplate
# Select: minimal features
# Result: Should work out of the box
```

### Scenario 2: International Project

"I need a multi-language website"

```bash
npx create-tanstack-boilerplate
# Select: i18n, ui
# Languages: en, vi, ja
# Result: Should have all translation files
```

### Scenario 3: Production App

"I need a full-featured application"

```bash
npx create-tanstack-boilerplate
# Select: all features
# Result: Should have testing, linting, etc.
```

## Bug Reporting Template

If you find issues:

```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Run `node index.js`
2. Select features: ...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: 
- Node version: 
- Package manager: 

**Screenshots**
If applicable
```

## Success Criteria

Before publishing:

- ✅ All tests pass
- ✅ No TypeScript errors
- ✅ Generated projects build successfully
- ✅ Documentation is complete
- ✅ Examples work
- ✅ No console errors
- ✅ Clean code (no TODOs)

---

**Ready to test! 🧪**
