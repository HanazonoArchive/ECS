# Installation & Setup Guide

## Prerequisites

- **Java Development Kit (JDK) 21** or higher
  - Download from: https://www.oracle.com/java/technologies/downloads/
  - Verify installation: `java -version`

- **Git** (for cloning)
  - Download from: https://git-scm.com/

## Cloning the Repository

```bash
git clone https://github.com/HanazonoArchive/Energy-System-Calculator-HSR-ZZZ.git
cd Energy-System-Calculator-HSR-ZZZ
```

## Building the Project

### Using Gradle Wrapper (Recommended)

The project includes a Gradle wrapper, so no separate Gradle installation is needed.

#### Windows:
```bash
gradlew.bat build
```

#### macOS/Linux:
```bash
./gradlew build
```

### Build Output

Compiled classes will be in: `build/classes/java/main/`

## Running the Application

### Using Gradle

```bash
# Windows
gradlew.bat run

# macOS/Linux
./gradlew run
```

### Running Directly

After building, you can run the JAR file:

```bash
java -jar build/libs/Energy_System_Calculator-1.3.0.jar
```

## Creating a Distributable

Create a custom JVM image with all dependencies bundled:

```bash
# Windows
gradlew.bat jlinkZip

# macOS/Linux
./gradlew jlinkZip
```

Output: `build/distributions/app-win.zip` (or appropriate platform)

This creates a standalone executable that doesn't require Java to be installed on the target system.

## Project Layout

```
Energy-System-Calculator-HSR-ZZZ/
├── build.gradle              # Build configuration
├── settings.gradle           # Project name
├── src/
│   └── main/
│       ├── java/            # Java source code
│       └── resources/        # FXML, CSS, Images
├── gradle/wrapper/           # Gradle wrapper files
└── build/                    # Compiled output (generated)
```

## Troubleshooting

### Issue: "Java version not compatible"
**Solution:** Ensure JDK 21 is installed and set as your default Java.

```bash
java -version  # Should show version 21.x.x
```

### Issue: "Cannot find gradlew"
**Solution:** Make sure you're in the project root directory and the file has execute permissions.

```bash
# macOS/Linux
chmod +x gradlew
```

### Issue: Build fails with dependency errors
**Solution:** Clear Gradle cache and try again.

```bash
# Windows
gradlew.bat clean build

# macOS/Linux
./gradlew clean build
```

### Issue: JavaFX modules not found
**Solution:** The build automatically downloads JavaFX. Ensure you have internet connectivity during first build.

## IDE Setup

### IntelliJ IDEA
1. Open the project folder
2. IDEA will auto-detect it as a Gradle project
3. Wait for indexing to complete
4. Right-click `build.gradle` → Load as Project
5. Run → Run 'main' (or press Shift+F10)

### Eclipse
1. File → Import → Gradle → Existing Gradle Project
2. Select the project root
3. Finish
4. Right-click project → Run As → Java Application

### VS Code
1. Install "Extension Pack for Java"
2. Open project folder
3. Terminal → New Terminal
4. Run: `./gradlew run`

## Platform-Specific Notes

### Windows
- Use `gradlew.bat` for all commands
- Application window can be dragged from any point

### macOS
- Make gradlew executable: `chmod +x gradlew`
- Requires full disk access for running

### Linux
- Make gradlew executable: `chmod +x gradlew`
- May require additional font packages for proper display

---

For issues or questions, refer to the [Architecture Documentation](docs/ARCHITECTURE.md).
