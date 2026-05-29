<p align="center">
  <img src="https://img.shields.io/badge/repo--sense-%F0%9F%A7%AC%20GitHub%20Sixth%20Sense-8B5CF6?style=for-the-badge&logo=typescript&logoColor=white" alt="repo-sense"/>
  <img src="https://img.shields.io/badge/%E7%8A%B6%E6%80%81-%E8%BF%90%E8%A1%8C%E4%B8%AD-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/%E6%8C%87%E6%A0%87-6%20%E7%BB%B4-8A2BE2?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/%E8%AF%AD%E8%A8%80-TypeScript-3178C6?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/%E8%AE%B8%E5%8F%AF%E8%AF%81-MIT-yellow?style=for-the-badge"/>
</p>

<h1 align="center">🧬 repo-sense <code>rs</code></h1>
<h3 align="center">你的 GitHub 第六感 · 终端中的仓库洞察力</h3>

<p align="center">
  <i>不只盯着 Star —— 六个维度，一眼看穿任何 GitHub 仓库的真实状态。</i>
</p>

<p align="center">
  <a href="#english-version">English ↓</a>
</p>

---

## 🎯 一句话

> **repo-sense（`rs`）是一个给你 GitHub 第六感的终端 CLI 工具。**
> 不是又一个 Star 计数器 —— 而是一个**实时仓库洞察引擎**，让你在终端里就能了解任何开源项目的全貌。

### 跟其他工具的本质区别

| | Star 计数器 | GitHub 网页 | **repo-sense ⭐** |
|---|---|---|---|
| 数据维度 | 只看 Star | 所有数据但要翻页 | **6 维一屏全览** |
| 多仓库对比 | ❌ 无 | 手动切换标签页 | **`rs battle` 一键对决** |
| 实时监控 | ❌ 无 | 手动刷新 | **自动刷新看板** |
| 安装体验 | `pip install` 需要 Python | 需要浏览器 | **`npx rs` 零安装** |
| 终端体验 | 纯文本输出 | 不是终端 | **彩色表格 + 动态看板** |
| API 速率 | 不做缓存 | 无限制 | **60 秒缓存 + Token 自动识别** |

---

## ✨ 核心能力

| 能力 | 说明 |
|------|------|
| **📊 6 维指标** | Star + Fork + Issue + 语言 + 许可证 + 描述 —— 完整画像 |
| **🎨 精美终端 UI** | 彩色表格、动态看板、增长指示器 —— 截图级输出 |
| **⚡ 实时监控** | `rs watch` 自动刷新，带增长趋势指示 |
| **🏆 仓库对决** | `rs battle` 两个仓库头对头比拼，视觉化胜负 |
| **🚀 零摩擦安装** | `npx repo-sense` 即用 —— 无需 Python、无需配置 |
| **🔧 现代 TypeScript** | tsup 编译为单文件二进制 —— 快速、可靠、可移植 |

---

## 🚀 快速开始

### 方案一：零安装（推荐）

```bash
# 直接运行，无需任何配置
npx repo-sense watch facebook/react
```

### 方案二：全局安装

```bash
npm install -g repo-sense

# 安装后直接用 rs 命令
rs watch facebook/react
```

### 方案三：源码构建

```bash
git clone git@github.com:lijiajing-11/beta-project-arena.git
cd beta-project-arena
npm install
npm run build
./dist/rs watch facebook/react
```

> **无需配置文件，无需 API Token。** 设置了 `GITHUB_TOKEN` 可以提升速率限制。

---

## ⚙️ 配置（可选）

GitHub 匿名 API 限制为 60 次/小时，日常使用足够。如果需要高频调用，设置 Token：

```bash
# 直接设置环境变量
export GITHUB_TOKEN="ghp_xx...xxxx"
```

[点此生成 Token](https://github.com/settings/tokens) —— 无需任何权限，仅公开仓库读取即可。

---

## 📖 命令详解

| 命令 | 说明 | 示例 |
|------|------|------|
| `rs watch <仓库>` | 实时监控看板，自动刷新 | `rs watch facebook/react` |
| `rs battle <仓1> <仓2>` | 双仓头对头对决，决出胜者 | `rs watch owner/repo-A owner/repo-B` |
| `rs --help` | 查看所有命令和选项 | `rs --help` |
| `rs --version` | 查看版本 | `rs --version` |

### `rs watch` —— 监控中心

```bash
rs watch facebook/react --interval 10
```

每 10 秒轮询 GitHub API（默认 30 秒），显示实时看板：

```
╔══════════════════════════════════════════════╗
║  🧬 facebook/react                           ║
╠══════════════════════════════════════════════╣
║  ⭐ Stars     228,000  (+3 since last)  📈   ║
║  🍴 Forks       46,000                       ║
║  🐛 Open Issues  1,200                       ║
║  🔤 Language  TypeScript                     ║
║  📝 License   MIT                            ║
║  Last check:  14:30:00  (2s ago)             ║
║  Rate limit:  58/60 remaining                ║
╚══════════════════════════════════════════════╝
```

### `rs battle` —— 仓库对决

```bash
rs battle facebook/react vuejs/core
```

```
╔══════════════════════════════════════════════════════════╗
║  🏟️  REPO BATTLE                                         ║
╠══════════════════════════════════════════════════════════╣
║           │ react                │ vue                   ║
║  ⭐ Stars │ 228K ⭐             │ 46K ⭐               ║
║  🍴 Forks │ 46K                 │ 7.6K                  ║
║  🐛 Issues│ 1.2K                │ 780                   ║
║  🔤 Lang  │ TypeScript          │ TypeScript            ║
║  📝 Lic.  │ MIT                 │ MIT                   ║
╠══════════════════════════════════════════════════════════╣
║  🏆  react is WINNING!                                   ║
║  (228K ⭐ vs 46K ⭐ — 182K star lead)                    ║
╚══════════════════════════════════════════════════════════╝
```

---

## 📦 产出的两个工具

| 工具 | 产品名 | 技术栈 | 定位 |
|------|--------|--------|------|
| 🧬 **repo-sense** | `rs` CLI | TypeScript + Octokit | 实时 GitHub 仓库洞察工具 |
| 📊 **ARA** | `ara` CLI | Python + GitHub API | 简约 GitHub Star 统计工具 |

| 对比维度 | Alpha Team (ARA) | Beta Team (repo-sense) |
|----------|-------------|---------------------|
| **技术栈** | Python 🐍 | TypeScript 🔷 |
| **指标维度** | 仅 Star | Star + Fork + Issue + 语言 + 许可证 |
| **终端输出** | 纯 ANSI 文本 | 彩色表格 + 动态仪表盘 |
| **安装方式** | `pip install`（需 Python） | `npx`（零安装）或 `npm i -g` |
| **实时刷新** | 手动轮询 | 自动刷新看板 |
| **对决模式** | 纯文本对比 | 可视化胜负 + 丰富对比 |
| **API 认证** | 仅环境变量 | `.env` 文件 + 环境变量 |

---

## 🛠️ 开发

```bash
# 克隆并安装
git clone git@github.com:lijiajing-11/beta-project-arena.git
cd beta-project-arena
npm install

# 构建
npm run build

# 本地运行
node dist/index.js watch owner/my-repo

# 或全局链接
npm link
rs watch owner/my-repo

# 运行测试
npm test
```

### 项目结构

```
repo-sense/
├── src/
│   ├── index.ts           # CLI 入口 (commander)
│   ├── github.ts          # GitHub API 客户端 (octokit)
│   ├── models.ts          # 数据模型 & 类型定义
│   └── commands/
│       └── watch.ts       # watch & battle 命令实现
├── bin/
│   └── rs                 # CLI 启动器
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md              # 你在这里！🎉
```

---

## 🤝 贡献

欢迎任何形式的贡献！

1. 🍴 Fork 本仓库
2. 🌿 创建特性分支：`git checkout -b feat/your-idea`
3. 🛠️ 实现你的魔法
4. ✅ 测试：`npm test`
5. 📬 提交 PR

**想法清单：** Slack 机器人、Discord Webhook、历史趋势图、`rs top`（趋势仓库）、GitHub Actions Badge 生成器、VS Code 插件、`rs compare-many`、Web 仪表盘……

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 📝 许可证

MIT © [lijiajing-11](https://github.com/lijiajing-11)

---

## 🌟 支持

如果 repo-sense 帮你盯住了竞品动态，**点个 Star** ⭐ —— 每个 Star 都是下一个功能的燃料！

```bash
npx repo-sense watch lijiajing-11/beta-project-arena
```

---

<p align="center">
  <sub>🔥 由 <b>Beta Team</b> 打造 —— <i>"智慧，不只是数字。"</i></sub>
</p>

---

<h2 id="english-version">🇬🇧 English Version</h2>

<p align="center">
  <a href="#">↑ 中文版</a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/repo--sense-Beta%20Team-8B5CF6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1e1b4b">
    <img src="https://img.shields.io/badge/repo--sense-Beta%20Team-8B5CF6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=f5f3ff" alt="repo-sense Banner">
  </picture>
</p>

<h1 align="center">🧬 repo-sense <code>rs</code></h1>

<p align="center">
  <b>Your GitHub Sixth Sense — Real-time repo intelligence in your terminal.</b><br>
  <i>Not just another star counter — 6 metrics, one command, endless insight.</i>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://www.npmjs.com/package/repo-sense"><img src="https://img.shields.io/npm/v/repo-sense?style=flat&color=8B5CF6" alt="npm"/></a>
  <a href="#"><img src="https://img.shields.io/npm/dm/repo-sense?style=flat&color=6366f1" alt="npm downloads"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat" alt="MIT License"/></a>
  <a href="#"><img src="https://img.shields.io/github/stars/lijiajing-11/beta-project-arena?style=flat&color=facc15" alt="GitHub Stars"/></a>
</p>

---

## 🎯 What is repo-sense?

**repo-sense** (`rs`) is a beautiful TypeScript CLI that gives you **real-time GitHub repository intelligence** — not just stars, but everything that matters. Think of it as your open-source command center: watch your repos grow, compare them side-by-side, and know exactly where you stand.

```bash
# Watch a repo's live dashboard
rs watch facebook/react

# Battle two repos head-to-head
rs battle facebook/react vuejs/core

# Zero install? No problem
npx repo-sense watch facebook/react
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
npx repo-sense watch facebook/react
```

### Option 2: Global install

```bash
npm install -g repo-sense

# Now just 'rs' anywhere
rs watch facebook/react
```

### Option 3: From source

```bash
git clone git@github.com:lijiajing-11/beta-project-arena.git
cd beta-project-arena
npm install
npm run build
node dist/index.js watch facebook/react
```

> **No config files. No API tokens required** (but set `GITHUB_TOKEN` for higher rate limits).

---

## ⚙️ Setup (Optional)

For **unauthenticated** use, GitHub's API allows 60 requests/hour — enough to get started. For extended use, set a token:

```bash
export GITHUB_TOKEN="ghp_xx...xxxx"
```

[Generate a token here](https://github.com/settings/tokens) — no permissions needed, just public repo access.

---

## 📖 Commands

| Command | Description | Example |
|---------|-------------|---------|
| `rs watch <repo>` | Live dashboard with auto-refresh | `rs watch facebook/react` |
| `rs battle <repo1> <repo2>` | Side-by-side comparison with winner | `rs watch owner/repo-A owner/repo-B` |
| `rs --help` | Show all commands and options | `rs --help` |
| `rs --version` | Show version | `rs --version` |

### `rs watch` — The command center

```bash
rs watch facebook/react --interval 10
```

Polls the GitHub API every 10 seconds (default: 30) and displays a live dashboard:

```
╔══════════════════════════════════════════════╗
║  🧬 facebook/react                           ║
╠══════════════════════════════════════════════╣
║  ⭐ Stars     228,000  (+3 since last)  📈   ║
║  🍴 Forks       46,000                       ║
║  🐛 Open Issues  1,200                       ║
║  🔤 Language  TypeScript                     ║
║  📝 License   MIT                            ║
║  Last check:  14:30:00  (2s ago)             ║
║  Rate limit:  58/60 remaining                ║
╚══════════════════════════════════════════════╝
```

### `rs battle` — Head-to-head smackdown

```bash
rs battle facebook/react vuejs/core
```

```
╔══════════════════════════════════════════════════════════╗
║  🏟️  REPO BATTLE                                         ║
╠══════════════════════════════════════════════════════════╣
║           │ react                │ vue                   ║
║  ⭐ Stars │ 228K ⭐             │ 46K ⭐               ║
║  🍴 Forks │ 46K                 │ 7.6K                  ║
║  🐛 Issues│ 1.2K                │ 780                   ║
║  🔤 Lang  │ TypeScript          │ TypeScript            ║
║  📝 Lic.  │ MIT                 │ MIT                   ║
╠══════════════════════════════════════════════════════════╣
║  🏆  react is WINNING!                                   ║
║  (228K ⭐ vs 46K ⭐ — 182K star lead)                    ║
╚══════════════════════════════════════════════════════════╝
```

---

## 📊 Comparison: repo-sense vs ARA

| Dimension | Alpha Team (ARA) | Beta Team (repo-sense) |
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
git clone git@github.com:lijiajing-11/beta-project-arena.git
cd beta-project-arena
npm install

# Build
npm run build

# Run locally
node dist/index.js watch owner/my-repo

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
│   ├── index.ts           # CLI entry point (commander)
│   ├── github.ts          # GitHub API client (octokit)
│   ├── models.ts          # Data models & types
│   └── commands/
│       └── watch.ts       # watch & battle command implementation
├── bin/
│   └── rs                 # CLI launcher
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md              # You are here! 🎉
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

MIT © [lijiajing-11](https://github.com/lijiajing-11)

---

## 🌟 Show Your Support

If repo-sense helps you keep an eye on the competition, **star the repo** ⭐ — every star fuels the next feature!

```bash
npx repo-sense watch lijiajing-11/beta-project-arena
```

<p align="center">
  <sub>Built with 🔥 by <b>Beta Team</b> — <i>"Intelligence. Not just numbers."</i></sub>
</p>
