# ADET 211 &mdash; Application Development & Emerging Technologies
### Academic Laboratory Portfolio & Interactive Innovation Lab

**Student:** Sean Joshua P. Matienzo  
**Student ID:** 02230000210  
**Section:** BSIT 2-Y1-3  
**Instructor:** Darrel Rarang  
**Academic Year:** 2026&ndash;2027 &bull; 1st Semester  

---

## 📖 Overview

This repository hosts the official academic laboratory portfolio for **ADET 211 (Application Development and Emerging Technologies)**. Built following strict institutional documentation standards, the portfolio showcases mission logs, embedded PDF hardware schematics, Tinkercad wiring topologies, Arduino C++ firmware, and custom-engineered interactive emerging technology experiments.

### Visual Design Standard
- **Monotone Palette:** High-contrast dark architecture (Black, Charcoal, Slate, Grays, Crisp White).
- **Typography:** Aptos / Aptos Display and Monospace telemetry fonts.
- **Responsive Layout:** Adaptive desktop, tablet, and mobile interface with collapsable telemetry navigation.

---

## 🚀 Key Modules & Directory Structure

```
├── index.html                   # Main Academic Portfolio Hub
├── style.css                    # Portfolio Monotone Design System
├── script.js                    # Navigation, Smooth Scroll & UI Controller
├── project.html                 # Dynamic Laboratory Project Documentation Viewer
├── project.css                  # Project Viewer Layout & PDF Canvas Styles
├── project.js                   # Project Renderer & PDF.js Telemetry Engine
├── projects-data.js             # Structured Database of Lab Activities & Schematics
├── pdf.min.js                   # Embedded PDF Engine for Schematics
├── pdf.worker.min.js            # PDF Web Worker
├── photos/                      # Student Verification & Logo Assets
├── Projects/                    # Mission Artifacts, Hardware Photos & PDF Schematics
│   ├── Project 1/               # Dev Station & I2C LCD Display (Schematic + Code)
│   ├── Project 2/               # Digital I/O & Pushbutton Counter (Schematic + Code)
│   └── Project 3/               # Sensory Input & Telemetry Circuit
├── Experiment/                  # Interactive Emerging Tech Laboratories
│   ├── Experiment 1/            # "Terminal Wanderer" &mdash; 2D Wasteland Survival (70 Items, 9x9 Radar, Arduino Quiz)
│   ├── Experiment 2/            # "Arduino Function Crossword" &mdash; 5-Try Watchdog & 4th-Try Hint Reveal
│   └── Experiment 3/            # Module 03 (Scheduled)
└── .vscode/                     # VS Code Workspace Configuration (Launch, Tasks, Settings)
```

---

## 🎮 Interactive Laboratory Experiments

### 1. Experiment 01 &bull; Terminal Wanderer
* **Location:** [`Experiment/Experiment 1/index.html`](Experiment/Experiment%201/index.html)
* **Mechanics:** Monotone grid-based wasteland exploration with dynamic scrolling 9x9 radar viewport.
* **Survival Balance:** Every step costs -2% Energy. Move across uncharted sectors with a 1/5 encounter rate per move.
* **Energy Recovery:** Solve Arduino microcontroller hardware quizzes to unlock energy drinks (+25% Energy) or defeat hostiles (Bandits, Soldiers, Scavengers) to salvage weapon durability and ammunition.
* **Database:** Over 70 realistic equipment items, defensive armor ratings, and combat damage algorithms.

### 2. Experiment 02 &bull; Arduino Function Crossword
* **Location:** [`Experiment/Experiment 2/index.html`](Experiment/Experiment%202/index.html)
* **Mechanics:** Intersecting C++ microcontroller keyword crossword puzzle (`pinMode`, `digitalWrite`, `setup`, `loop`, `serial`, `delay`, `tone`, `eeprom`, etc.).
* **4-Try Diagnostic Hint:** After 4 failed attempts on any function, the telemetry engine reveals one letter and displays code syntax.
* **5-Try Loss Rule:** Failing 5 times triggers an immediate compiler watchdog timeout / game over lockout.
* **Input Support:** Physical QWERTY keyboard and responsive on-screen tactile virtual keyboard.

---

## 🛠️ Local Development & Running

### Option A: Localhost via XAMPP Apache
1. Place repository in your web root: `C:\xampp\htdocs\Adet portfolio`
2. Start **Apache** in the XAMPP Control Panel.
3. Access in your browser:
   * **Portfolio:** [http://localhost/Adet%20portfolio/](http://localhost/Adet%20portfolio/)
   * **Experiment 1:** [http://localhost/Adet%20portfolio/Experiment/Experiment%201/index.html](http://localhost/Adet%20portfolio/Experiment/Experiment%201/index.html)
   * **Experiment 2:** [http://localhost/Adet%20portfolio/Experiment/Experiment%202/index.html](http://localhost/Adet%20portfolio/Experiment/Experiment%202/index.html)

### Option B: VS Code Live Server
1. Open folder in VS Code (`code .`).
2. Press <kbd>F5</kbd> to launch via the pre-configured `.vscode/launch.json` debugger.
3. Or right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Live GitHub Pages Deployment

To view this portfolio live on the web:
* **Live Site:** `https://dorex-spec.github.io/adet-portfolio/` (after enabling GitHub Pages)
