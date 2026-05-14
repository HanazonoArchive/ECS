# Architecture Overview

## Project Structure

**Energy System Calculator** is a modular JavaFX application built with Java 21 and Gradle.

### Core Components

#### 1. **Application Layer** (`MainApplication.java`)
- Extends `javafx.application.Application`
- Initializes the primary stage and scene
- Handles window decoration (custom undecorated style with drag support)
- Loads UI from FXML
- Manages icon loading

#### 2. **Controller Layer** (`MainController.java`)
- FXML controller for UI interactions
- Handles button click events
- Manages text field input validation (numeric only)
- Performs energy calculation logic
- Updates UI labels with results

#### 3. **Entry Point** (`main.java`)
- Simple wrapper class
- Delegates to `MainApplication.main()`

### Technology Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| Java | 21 | Language |
| JavaFX | 21 | GUI Framework |
| Gradle | Latest | Build automation |
| ControlsFX | 11.1.2 | Extended controls |
| FormsFX | 11.6.0 | Form builders |
| FXGL | 17.3 | Game-focused utilities |

### Module System

Uses Java 9+ Module System with `module-info.java`:
- **Module Name:** `archive.hanazono.energy_system_calculator`
- **Exports:** `archive.hanazono.energy_system_calculator` package
- **Opens:** Package to JavaFX FXML loader for reflection

### Key Features

#### Energy Calculation Algorithm
```
Remaining Energy = Max Energy - Current Energy
Total Minutes = Remaining Energy × Minutes Per Energy Point
Target Time = Current Time + Total Minutes
```

#### UI Features
- Numeric-only input validation for text fields
- Real-time status feedback
- Date and time display with formatted output
- Custom window styling with mouse drag support
- Undecorated window design

### Data Flow

```
User Input (TextField)
    ↓
Input Validation (makeTextFieldNumeric)
    ↓
Calculate Duration (HandlesClicked)
    ↓
Format Output (DateTimeFormatter)
    ↓
Update UI Labels
```

### Resources

- **FXML:** `MainInterface.fxml` - UI layout definition
- **CSS:** `Design.css` - Styling and theming
- **Images:** `Image/` directory - Application icons

### Build System

- **Build Tool:** Gradle with custom plugins
- **Plugins:** 
  - `org.javamodularity.moduleplugin` - Module system support
  - `org.openjfx.javafxplugin` - JavaFX dependency management
  - `org.beryx.jlink` - Custom JVM image creation

### Package Structure

```
archive.hanazono.energy_system_calculator/
├── Main entry points and application startup
├── Controller for business logic and UI interaction
└── Module configuration
```

---

**Note:** This architecture is stable and archived. For any modifications or extensions, fork this repository.
