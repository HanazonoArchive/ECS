# Contributing

## ⚠️ Project Status

This project is **ARCHIVED** and maintained for reference/portfolio purposes only. 

**No active development or feature requests are being accepted at this time.**

If you wish to use this project as a reference or build upon it for your own purposes, please fork the repository.

## For Reference

If you're interested in understanding the codebase for learning purposes, feel free to:
- Review the source code
- Fork the repository for your own modifications
- Reference it in your own projects (respecting the MIT License)

## Technology Stack

- **Language:** Java 21
- **GUI Framework:** JavaFX 21
- **Build Tool:** Gradle
- **Module System:** Java Modules
- **UI Definition:** FXML

## Building the Project

```bash
# Using Gradle wrapper
./gradlew build

# Run the application
./gradlew run

# Create distribution
./gradlew jlinkZip
```

## Project Structure

```
src/main/java/archive/hanazono/energy_system_calculator/
├── MainApplication.java    - JavaFX Application entry point
├── MainController.java     - FXML Controller for UI logic
├── main.java              - Main class entry point
└── module-info.java       - Java Module configuration

src/main/resources/
├── archive/hanazono/energy_system_calculator/
│   ├── MainInterface.fxml - UI definition
│   ├── Design.css         - Styling
│   └── Image/             - Application icons
└── META-INF/
    └── MANIFEST.MF        - JAR Manifest
```

---

**Thank you for your interest in this project!**
