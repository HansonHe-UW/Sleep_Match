# SleepMatch 🌙 | AI-Powered Sleep Optimizer

**SleepMatch** is a modern web application designed to calculate your optimal sleep duration and bedtime windows. It takes into account physiological factors like age, caffeine intake, and physical activity levels to generate a personalized sleep plan based on 90-minute circadian cycles.

## 📖 Backstory & Origins

This project is an **AI-Assisted Web Port** of an original Python algorithm.

* **Original Logic:** The core algorithm was originally developed in Python by **Evelyn ([@Evelyn0826](https://github.com/Evelyn0826))**. You can view the original implementation here: [Evelyn0826/sleepmatch](https://github.com/Evelyn0826/sleepmatch).
* **Goal:** To make the Python tool accessible on any device (Tablets/Phones) without needing a Python environment.

## 📐 Engineering & Logic

The core logic models sleep duration ($T_{sleep}$) as a function of multiple physiological variables. The algorithm aims to offset sleep debt accumulation and optimize for REM cycles.

$$T_{sleep} = T_{base}(age) + T_{activity} + T_{caffeine}$$

Where:
* $T_{base}(age)$: Baseline requirement (e.g., 8.0h for age $\le$ 25).
* $T_{activity}$: Dynamic compensation for physical exertion (High activity $\approx$ +0.5h).
* $T_{caffeine}$: Latency adjustment accounting for adenosine receptor antagonism.

Bedtime windows are calculated by projecting backwards from the wake time in **90-minute intervals** ($5 \times 90m$ or $6 \times 90m$) plus a standardized fall-asleep buffer.

## ✨ Features

* **Smart Duration Calculation:** Adjusts base sleep requirements dynamically.
* **Sleep Cycle Optimization:** Calculates wake/sleep windows based on circadian rhythms.
* **Modern UI:** Built with a "Glassmorphism" aesthetic, featuring dynamic background animations.
* **Privacy First:** All calculations run locally in your browser (Client-side JS).

## 🛠 Tech Stack

* **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Styling:** Custom CSS Variables, Flexbox/Grid, Glassmorphism effects
* **Development Workflow:** Python (Original Logic) → Antigravity (Porting & UI Generation) → Manual Refinement

## 🚀 How to Run

### Method 1: The "One-Click" Standalone (Recommended)
Simply download and open the `sleep_app_standalone.html` file in any browser. It contains all styles and logic in a single file.

### Method 2: Standard Deployment
Clone the repo and open `index.html`.
```bash
git clone [https://github.com/yourusername/SleepMatch.git](https://github.com/yourusername/SleepMatch.git)
cd SleepMatch
# Open index.html in Chrome/Safari/Edge
