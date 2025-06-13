# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a dual-format action game featuring a Barn Owl (メンフクロウ) as the main character, offering both 2D side-scrolling and 3D exploration experiences. The games are built using HTML5 Canvas with vanilla JavaScript and Three.js for 3D graphics.

## Development Commands

### Running the Game
```bash
# Start a local HTTP server to serve the game
python3 -m http.server 8000
# Then access http://localhost:8000 in browser

# Alternative with Node.js (if available)
npx serve .
```

### File Structure
- `index.html` - Game selection screen with navigation to 2D/3D versions
- `game2d.html` - 2D game page with canvas and controls
- `game3d.html` - 3D game page with WebGL canvas and stats display
- `game.js` - 2D game logic with BarnOwlGame class
- `game3d.js` - 3D game logic with BarnOwl3DGame class using Three.js

## Architecture

### Game Engine Structure
The project contains three main components:

**Game Selection Interface** (`index.html`):
- Landing page with styled game cards for version selection
- Responsive design with hover effects and navigation links

**2D Game Engine** (`BarnOwlGame` class):
- **Game Loop**: RequestAnimationFrame-based rendering loop with delta time
- **Entity System**: Owl character with physics (position, velocity, collision)
- **Input System**: Keyboard event handling for movement and jumping
- **Camera System**: Side-scrolling camera that follows the player
- **Combat System**: Projectile-based combat with enemy AI
- **UI System**: Trivia display overlay and control instructions

**3D Game Engine** (`BarnOwl3DGame` class):
- **3D Rendering**: Three.js WebGL renderer with shadow mapping
- **Camera System**: First-person perspective with mouse look controls
- **Physics System**: 3D collision detection and gravity
- **Combat System**: 3D projectiles and enemy engagement
- **UI System**: Health/score HUD and trivia overlay

### Key Game Mechanics

**2D Version**:
- **Movement**: Arrow keys/WASD for horizontal movement with walking animation
- **Jumping**: Space key for vertical movement with gravity physics
- **Combat**: X key for shooting projectiles at enemies
- **Audio Feedback**: Console-logged "えっほ！" sound on footsteps
- **Trivia System**: Automatic display of owl facts every 5 seconds
- **Background**: Procedural tree generation with parallax scrolling effect

**3D Version**:
- **Movement**: WASD keys for 3D movement with collision detection
- **Camera Control**: Mouse movement for first-person camera rotation
- **Combat**: X key for 3D projectile shooting with targeting
- **Health System**: Damage system with health display
- **Score System**: Enemy defeat tracking with score display
- **Environment**: 3D world with lighting and shadow effects

### Coordinate Systems

**2D Version**:
- Canvas: 800x400 pixels
- Ground level: Y=250
- Camera follows player with 300px offset
- Physics uses simple Euler integration

**3D Version**:
- Canvas: 800x600 pixels  
- WebGL coordinate system with Three.js
- Ground level: Y=0
- First-person camera positioning

### Game State Management

**2D Game State** (`BarnOwlGame` instance):
- `owl` object: player position, physics, and animation state
- `camera` object: viewport positioning for side-scrolling
- `enemies` array: enemy entities with AI behavior
- `projectiles` array: active projectiles and collision detection
- `trivia` array: educational content rotation
- `keys` object: current input state

**3D Game State** (`BarnOwl3DGame` instance):
- `owl` object: 3D player position, health, and movement state
- `scene`, `camera`, `renderer`: Three.js core components
- `enemies` array: 3D enemy meshes and behaviors
- `projectiles` array: 3D projectiles with physics
- `score` and health tracking for gameplay progression
- `mouse` and `keys` objects: 3D input handling

### Dependencies
- **2D Version**: No external dependencies (vanilla JavaScript)
- **3D Version**: Three.js r128 (loaded via CDN)
- Both versions require no build process and run directly in modern web browsers