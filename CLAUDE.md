# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 2D side-scrolling action game featuring a Barn Owl (メンフクロウ) as the main character. The game is built using HTML5 Canvas and vanilla JavaScript without external dependencies.

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
- `index.html` - Main HTML file with game container and styling
- `game.js` - Complete game logic including BarnOwlGame class

## Architecture

### Game Engine Structure
The game uses a single `BarnOwlGame` class that handles:
- **Game Loop**: RequestAnimationFrame-based rendering loop with delta time
- **Entity System**: Owl character with physics (position, velocity, collision)
- **Input System**: Keyboard event handling for movement and jumping
- **Camera System**: Side-scrolling camera that follows the player
- **UI System**: Trivia display overlay and control instructions

### Key Game Mechanics
- **Movement**: Arrow keys/WASD for horizontal movement with walking animation
- **Jumping**: Space key for vertical movement with gravity physics
- **Audio Feedback**: Console-logged "えっほ！" sound on footsteps
- **Trivia System**: Automatic display of owl facts every 5 seconds
- **Background**: Procedural tree generation with parallax scrolling effect

### Coordinate System
- Canvas: 800x400 pixels
- Ground level: Y=250
- Camera follows player with 300px offset
- Physics uses simple Euler integration

### Game State
All game state is contained within the BarnOwlGame instance:
- `owl` object: player position, physics, and animation state
- `camera` object: viewport positioning
- `trivia` array: educational content rotation
- `keys` object: current input state

The game requires no build process and runs directly in any modern web browser supporting HTML5 Canvas.