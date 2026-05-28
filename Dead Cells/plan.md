# Culinary Cells (Working Title)

The goal is to develop a browser-based 2D action-platformer roguelite inspired by "Dead Cells", but themed around cooking. The player will control a Chef traversing hostile kitchens, fighting sentient ingredients, and collecting "food materials" instead of cells to unlock permanent upgrades and new culinary weapons. 

## Proposed MVP Scope

1. **Custom Canvas Game Engine**: We will build a lightweight 2D physics and rendering engine using HTML5 `<canvas>` and Vanilla JavaScript to ensure smooth 60 FPS performance and precise platforming controls.
2. **Player Controller (The Chef)**:
   - Movement: Run, Jump, Fall, and a Dodge Roll (with i-frames).
   - Combat: A basic melee combo using a "Frying Pan" (heavy attack) or "Chef's Knife" (fast attack).
3. **Enemies (Sentient Ingredients)**:
   - Implement 1-2 basic enemy types (e.g., a patrolling "Angry Tomato" and a charging "Rogue Steak").
4. **The Loop**:
   - Enemies drop "Ingredient Orbs" upon defeat.
   - A health system for both the player and enemies.
   - A single, static level to demonstrate platforming and combat.
   - A simple end-of-level "Cooking Station" where collected ingredients can be spent for a simple permanent upgrade (e.g., +Max Health).
5. **Aesthetics**:
   - For the initial MVP, we will use stylized geometric shapes and vibrant colors to represent entities, focusing heavily on **game feel** (screen shake, hit pauses, particle effects for slicing/cooking) to make it feel premium and punchy. We will wrap the canvas in a sleek, modern, dark-themed UI for the menus and HUD.

## Technical Stack
- Vanilla HTML, CSS, JavaScript
- HTML5 Canvas for rendering

## Controls
- `WASD` or Arrow Keys to move
- `Space` to jump
- `J` for primary attack
- `K` for secondary attack / dash

> Once you approve this basic structure, we can begin setting up the HTML canvas and physics engine!
