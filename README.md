# Energy Calculator System (ECS) ⚡

> **A precision energy recovery calculator and predictor for gacha and strategy games.**
> Designed for **GitHub Pages** deployment with strict adherence to the **UNIX Philosophy** (*"Do one thing and do it well"*).

---

## 🌟 Features

- **🎮 Game Profile Presets**: One-tap pre-configurations for:
  - **Genshin Impact** (Original Resin: 200 Max / 8 min)
  - **Honkai: Star Rail** (Trailblaze Power: 240 Max / 6 min)
  - **Wuthering Waves** (Waveplates: 240 Max / 6 min)
  - **Zenless Zone Zero** (Battery Charge: 240 Max / 6 min)
  - **Arknights** (Sanity: 135 Max / 6 min)
  - **Fate/Grand Order** (AP: 144 Max / 5 min)
  - **Blue Archive** (AP: 240 Max / 6 min)
  - **Reverse: 1999** (Activity: 300 Max / 6 min)
  - **Goddess of Victory: Nikke** (Stamina: 100 Max / 6 min)
  - **Custom Energy System** (Fully customizable Capacity and Regen Rate)

- **⏰ 12-Hour AM/PM Time Format**: All target calculations, arrival predictions, and live countdowns operate in standard 12-Hour AM/PM format.
- **🔄 Target Time Solvers (Reverse Calculators)**:
  - **"How much should I spend?"**: Calculates the exact amount of energy you should spend right now so your cap is reached precisely at your desired time (e.g. 8:00 PM before sleep).
  - **"Energy at Target Time"**: Forecasts how much energy you will have accumulated by a specific time.
- **📊 Visual Gauge & Milestones**: Interactive circular progress ring and threshold timeline (25%, 50%, 75%, 90%, 100%, and farm costs like 40/60 resin).
- **🎨 Multi-Theme Interface**: Supports Deep Void Dark, Cyberpunk Neon, and Clean Light themes.
- **💾 Local Persistence**: Automatically saves your selected preset and input preferences.

---

## 📐 Architecture (UNIX Philosophy)

Every file in the codebase has a single, clear, decoupled role:

```
c:\Users\Hanazono\Desktop\Updates\ECS\
├── index.html                   # HTML5 markup, accessibility, font links
├── css/
│   ├── variables.css            # Design tokens & color theme definitions
│   ├── base.css                 # CSS reset, typography, body backgrounds
│   ├── layout.css               # Responsive grid layout & shell structure
│   ├── components.css           # UI controls, ring gauge, form inputs, stat cards
│   ├── animations.css           # CSS keyframe micro-animations
│   └── game-themes.css          # Game preset accent color overrides
└── js/
    ├── types.js                 # JSDoc type contracts & data interfaces
    ├── presets.js               # Game presets registry & SVG icons
    ├── calculator.js            # Pure math engine for energy calculations
    ├── timeFormatter.js         # 12-Hour AM/PM time & duration formatters
    ├── storage.js               # LocalStorage state persistence manager
    ├── themeController.js       # Visual theme management (Dark/Cyber/Light)
    ├── uiManager.js             # Visual rendering controller & DOM updater
    └── app.js                   # Application bootstrapper & event orchestrator
```

---

## 🚀 GitHub Pages Deployment

Since ECS Web Edition uses native HTML5, CSS3, and ES Modules (`type="module"`), no build step or node_modules are required!

To publish on GitHub Pages:
1. Push the project repository to GitHub.
2. Go to **Repository Settings** -> **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Set Branch to `main` (or `gh-pages`), Folder to `/ (root)`.
5. Click **Save**. Your ECS site will be live instantly!

---

## 📄 License

MIT License. Developed with care for gamers everywhere.
