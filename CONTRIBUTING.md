# Contributing to repo-sense

First off, thanks for taking the time to contribute! 🎉

## 🚀 Getting Started

```bash
git clone git@github.com:lijiajing-11/repo-sense.git
cd repo-sense
npm install
npm run build
```

## 🔧 Development Workflow

1. **Create a branch:** `git checkout -b feat/your-idea`
2. **Make your changes** in `src/`
3. **Build:** `npm run build`
4. **Test:** `npm test`
5. **Commit:** Use conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
6. **Push:** `git push -u origin feat/your-idea`
7. **Open a Pull Request**

## 📝 Code Style

- **TypeScript** — strict mode enforced
- **4-space indentation** (use `npm run format` to auto-fix)
- **Descriptive variable names** — no single-letter variables outside loops
- **No `any`** — use proper types or `unknown`

## 🧪 Testing

- Write tests for all new features
- Run `npm test` before committing
- Test error cases: network failures, 404s, rate limits

## 📦 Pull Request Guidelines

- Keep PRs focused — one feature/fix per PR
- Update the README if your change affects usage
- Include a screenshot or GIF for UI changes
- Reference the issue number if applicable

## 🐛 Reporting Bugs

Open an issue with:
- Your OS + Node.js version
- The exact command you ran
- The full error output
- Expected vs actual behavior

## 💡 Feature Requests

Open an issue with the `enhancement` tag. Describe what you want to build and why it fits repo-sense.

## 📜 Code of Conduct

Be excellent to each other. We're here to build cool things. ✨

---

*Beta Team — Open Source with ❤️*
