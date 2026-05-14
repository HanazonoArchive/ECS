# Energy System Calculator ⭐

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Status](https://img.shields.io/badge/Status-Archived-inactive.svg)

> A desktop application for calculating energy/power regeneration time in games like Honkai: Star Rail and Zenless Zone Zero.

![image](https://github.com/user-attachments/assets/36ae5eee-bb8c-496d-98c7-88c48f435bab)
![javaw_Nb1amaIO4I](https://github.com/user-attachments/assets/3a5cc016-120d-4d56-9ac2-677e61b267b2)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Project Status](#project-status)

---

## Overview

The **Energy System Calculator** is a JavaFX-based desktop application that helps players accurately calculate how long their energy/power will take to regenerate to maximum. Simply input your current energy, maximum energy capacity, and regeneration rate to get instant results with precise time calculations.

### Designed For 🎮
- **Honkai: Star Rail**
- **Zenless Zone Zero**
- Any other game with energy regeneration mechanics

### Historical Context
This is an improved version of the original project from [a previous GitHub account](https://github.com/HanazonoFolder/Trailblaze-Power-Calculator). This version features enhanced UI/UX, better code organization, and Java 21+ module system support.

---

## Features

✅ **Real-Time Energy Calculation** - Instantly calculate regeneration time  
✅ **Date & Time Display** - Shows current date/time and completion time  
✅ **Input Validation** - Numeric-only input with error feedback  
✅ **Custom UI** - Undecorated window with draggable interface  
✅ **Precise Duration** - Hour:Minute:Second breakdown  
✅ **Status Feedback** - Real-time success/error messages  

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Java** | 21+ | Core language |
| **JavaFX** | 21 | GUI Framework |
| **Gradle** | Latest | Build automation |
| **Java Modules** | 9+ | Module system |
| **ControlsFX** | 11.1.2 | Extended UI controls |

---

## Getting Started

### Prerequisites
- **JDK 21** or higher ([download](https://www.oracle.com/java/technologies/downloads/))
- **Git** (for cloning)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/HanazonoArchive/Energy-System-Calculator-HSR-ZZZ.git
cd Energy-System-Calculator-HSR-ZZZ

# Build the project
./gradlew build

# Run the application
./gradlew run
```

For detailed setup instructions, see [INSTALLATION.md](INSTALLATION.md).

---

## Installation

### Option 1: Run from Source (Recommended for Development)
```bash
./gradlew run
```

### Option 2: Build JAR
```bash
./gradlew build
java -jar build/libs/Energy_System_Calculator-1.3.0.jar
```

### Option 3: Create Standalone Distribution
```bash
./gradlew jlinkZip
```
Creates a platform-specific distribution that doesn't require Java installed.

---

## Usage

1. **Launch the Application** - Run using one of the installation methods above
2. **Enter Values:**
   - `Current Energy` - Your current energy points
   - `Max Energy` - Maximum energy capacity
   - `Minutes Per Energy` - Regeneration rate (minutes per point)
3. **Click Execute** - Calculate regeneration time
4. **View Results:**
   - Time until full regeneration
   - Current date and time
   - Duration in HH:MM:SS format
   - Status feedback

### Example
- Current Energy: 40/240
- Energy Per Minute: 6  
- Minutes Per Energy: 10
- **Result:** 33 hours 20 minutes to reach 240 energy

---

## Project Structure

```
src/main/java/archive/hanazono/energy_system_calculator/
├── MainApplication.java    # JavaFX Application entry point
├── MainController.java     # FXML Controller & business logic
├── main.java              # Main class wrapper
└── module-info.java       # Module configuration

src/main/resources/
├── MainInterface.fxml     # UI Layout (FXML)
├── Design.css            # Application styling
└── Image/                # Icons and assets
    └── icon.png
```

---

## Documentation

- **[INSTALLATION.md](INSTALLATION.md)** - Detailed setup guide for all platforms
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Project status and reference guidelines
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Technical architecture overview

---

## Project Status

🔴 **ARCHIVED** - This project is completed and maintained for portfolio/reference purposes only.

- **No active development** planned
- **Reference use only** - Feel free to fork and build upon this project
- **MIT Licensed** - Free to use for personal and commercial projects

For inquiries about modifications or extensions, please fork the repository for your own development.

---

## License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## Improvements from Previous Version

- ✨ Enhanced UI/UX with custom window styling
- 🏗️ Java Module System implementation
- 📦 Gradle-based modern build system
- 🎯 Better input validation
- 🔧 Improved code organization and maintainability
- 🚀 Java 21+ compatibility

---

**Built with ❤️ by HanazonoArchive**

*For the original version, visit: https://github.com/HanazonoFolder/Trailblaze-Power-Calculator*
