<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/repo--sense-β--Labs-8B5CF6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1e1b4b">
    <img src="https://img.shields.io/badge/repo--sense-β--Labs-8B5CF6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=f5f3ff" alt="repo-sense Banner">
  </picture>
</p>

<h1 align="center">🔍 repo-sense <code>rs</code></h1>

<p align="center">
  <b>Your GitHub repo, reimagined.<br>
  Beautiful terminal intelligence. 6 metrics. One command.</b>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://www.npmjs.com/package/repo-sense"><img src="https://img.shields.io/npm/v/repo-sense?style=flat&color=8B5CF6" alt="npm"/></a>
  <a href="#"><img src="https://img.shields.io/npm/dm/repo-sense?style=flat&color=6366f1" alt="npm downloads"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat" alt="MIT License"/></a>
  <a href="https://github.com/li1050109098/beta-project-arena"><img src="https://img.shields.io/github/stars/li1050109098/beta-project-arena?style=flat&color=facc15" alt="GitHub Stars"/></a>
  <a href="#"><img src="https://img.shields.io/badge/CLI-%F0%9F%94%A5%20hot-8B5CF6?style=flat" alt="CLI Ready"/></a>
  <br/>
  <a href="#-quick-start"><img src="https://img.shields.io/badge/▶️-Quick%20Start-22c55e?style=flat" alt="Quick Start"/></a>
  <a href="#-commands"><img src="https://img.shields.io/badge/📖-Commands-8B5CF6?style=flat" alt="Commands"/></a>
  <a href="#-comparison"><img src="https://img.shields.io/badge/⚔️-Comparison-f59e0b?style=flat" alt="Comparison"/></a>
  <a href="#-development"><img src="https://img.shields.io/badge/🛠️-Development-3b82f6?style=flat" alt="Development"/></a>
</p>

---

## 🎯 What is repo-sense?

**repo-sense** (`rs`) is a gorgeous TypeScript CLI that gives you **real-time GitHub repository intelligence** — not just stars, but everything that matters. Think of it as your open-source command center: watch your repos grow, compare them side-by-side, and know exactly where you stand.

```bash
# Watch a repo's live dashboard
rs watch owner/my-repo

# Battle two repos head-to-head
rs battle owner/repo-A competitor/repo-B

# Zero install? No problem
npx repo-sense watch owner/my-repo
```

### ✨ Why repo-sense?

| What makes it special | Why you'll love it |
|-----------------------|-------------------|
| **📊 6 metrics, not just stars** | Stars + forks + open issues + language + description + license — the full picture |
| **🎨 Beautiful terminal UI** | Colored tables, live spinners, formatted dashboards — screenshot-worthy output |
| **⚡ Real-time dashboards** | Auto-refreshing `rs watch` with growth indicators, no manual polling |
| **🏆 Gamified comparisons** | `rs battle` shows a visual winner — perfect for hackathons & rivalries |
| **🚀 Zero-friction install** | `npx repo-sense` just works — no Python, no deps, no setup |
| **🔧 Modern TypeScript** | Compiled to a single binary with `tsup` — fast, reliable, portable |

> 🏁 **Who's it for?** Indie devs launching OSS projects, startup teams tracking GitHub presence, open-source maintainers, and anyone who wants to feel like they're running mission control.

---

## 🚀 Quick Start

### Option 1: Zero install (recommended)

```bash
# Run instantly — no setup required
npx repo-sense watch li1050109098/beta-project-arena
```

### Option 2: Global install

```bash
# Install once, use everywhere
npm install -g repo-sense

# Now just 'rs' anywhere
rs watch li1050109098/beta-project-arena
```

### Option 3: From source

```bash
git clone https://github.com/li1050109098/beta-project-arena.git
cd beta-project-arena
npm install
npm run build
./dist/rs watch li1050109098/beta-project-arena
```

> **No config files. No API tokens required** (but set `GITHUB_TOKEN` for higher rate limits).

---

## ⚙️ Setup (Optional)

For **unauthenticated** use, GitHub's API allows 60 requests/hour — enough to get started. For extended use, set a token:

```bash
# Create a .env file (copied from the template)
cp .env.example .env
# Or set it directly
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
```

[Generate a token here](https://github.com/settings/tokens) — no permissions needed, just public repo access.

---

## 📖 Commands

| Command | Description | Example |
|---------|-------------|---------|
| `rs watch <repo>` | Live dashboard with auto-refresh | `rs watch owner/project` |
| `rs battle <repo1> <repo2>` | Side-by-side comparison with winner | `rs battle teamA/lib teamB/lib` |
| `rs --help` | Show all commands and options | `rs --help` |
| `rs --version` | Show version | `rs --version` |

### `rs watch` — The command center

```bash
rs watch li1050109098/beta-project-arena --refresh 10
```

Polls the GitHub API every 10 seconds (default: 30) and displays a live dashboard:

```
╔══════════════════════════════════════════════╗
║  🔍 li1050109098/beta-project-arena          ║
╠══════════════════════════════════════════════╣
║  ⭐ Stars          42  (+2 since last)  📈   ║
║  🍴 Forks           7                        ║
║  🐛 Open Issues     3                        ║
║  🔤 Language     TypeScript                  ║
║  📝 License      MIT                         ║
║  Last check:  16:30:00  (2s ago)             ║
║  Rate limit:  58/60 remaining                ║
╚══════════════════════════════════════════════╝
```

### `rs battle` — Head-to-head smackdown

```bash
rs battle li1050109098/beta-project-arena li1050109098/alpha-project
```

```
╔══════════════════════════════════════════════════════════╗
║  🏟️  REPO BATTLE                                         ║
╠══════════════════════════════════════════════════════════╣
║           │ beta-project-arena  │ alpha-project          ║
║  ⭐ Stars │  42 ⭐              │  12 ⭐                ║
║  🍴 Forks │   7                 │   2                    ║
║  🐛 Issues│   3                 │   1                    ║
║  🔤 Lang  │ TypeScript         │ Python                 ║
║  📝 Lic.  │ MIT                │ MIT                    ║
╠══════════════════════════════════════════════════════════╣
║  🏆  beta-project-arena is WINNING!                       ║
║  (42 ⭐ vs 12 ⭐ — 30 star lead)                         ║
╚══════════════════════════════════════════════════════════╝
```

---

## 📊 Comparison: repo-sense vs ARA

| Dimension | Α-Tech (ARA) | β-Labs (repo-sense) |
|-----------|-------------|---------------------|
| **Stack** | Python 🐍 | TypeScript 🔷 |
| **Metrics** | Stars only | Stars + Forks + Issues + Language + License |
| **Visual output** | Plain ANSI text | Beautiful colored tables + live dashboards |
| **Install** | `pip install` (needs Python) | `npx` (zero install) or `npm i -g` |
| **Live refresh** | Manual polling | Auto-refresh dashboard |
| **Binary** | Python script | Compiled single binary (tsup) |
| **Battle mode** | Text comparison only | Visual winner + rich comparison |
| **API auth** | Env var only | `.env` file + env var |

---

## 🛠️ Development

```bash
# Clone and install
git clone https://github.com/li1050109098/beta-project-arena.git
cd beta-project-arena
npm install

# Build
npm run build

# Run locally
node dist/cli.js watch owner/my-repo

# Or link globally
npm link
rs watch owner/my-repo

# Run tests
npm test
```

### Project Structure

```
repo-sense/
├── src/
│   ├── cli.ts           # CLI entry point (commander / yargs)
│   ├── github.ts        # GitHub API client (octokit)
│   ├── models.ts        # Data models & types
│   ├── watch.ts         # `rs watch` command
│   ├── battle.ts        # `rs battle` command
│   └── display.ts       # Terminal UI (chalk, cli-table3, ora)
├── test/                # Test suite
├── .env.example         # Token setup template
├── tsup.config.ts       # Build config
├── package.json
└── README.md            # You are here! 🎉
```

---

## 🤝 Contributing

We'd love your help making repo-sense even better!

1. 🍴 Fork the repo
2. 🌿 Branch: `git checkout -b feat/your-idea`
3. 🛠️ Code your magic
4. ✅ Test: `npm test`
5. 📬 Open a PR

**Ideas:** Slack bot, Discord webhook, historical trend charts, `rs top` (trending repos), GitHub Actions badge generator, VS Code extension, `rs compare-many`, web dashboard…

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📝 License

MIT © [li1050109098](https://github.com/li1050109098)

---

## 🌟 Show Your Support

If repo-sense helps you keep an eye on the competition, **star the repo** ⭐ — every star fuels the next feature!

```bash
rs watch li1050109098/beta-project-arena
# Then → https://github.com/li1050109098/beta-project-arena
```

<p align="center">
  <sub>Built with 🔥 by <b>β-Labs Corp</b> — <i>"Intelligence. Not just numbers."</i></sub>
</p>
