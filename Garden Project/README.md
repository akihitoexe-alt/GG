# Grell-me Garden

A small, calm gardening mini-game prototype based on the Japanese design brief.

Open `index.html` in a browser to play. The game is intentionally static and
self-contained, with no install step.

The default language is Japanese. Use the title-screen language switch to play
in English instead.

Language changes also update the interface style. The page sets
`html[data-lang="..."]`, and `styles.css` uses that hook to adjust fonts,
spacing, casing, line-height, button density, and modal sizing per language.

## Controls

- Move: WASD or arrow keys
- Select tools: click the tool buttons or press 1-4
- Use tool: Space, E, or the Use Tool button
- Mouse or touch: tap the tomato bed or water barrel to move there and use the
  selected tool

## Prototype Scope

- One backyard screen
- One tomato with four stages: seed, sprout, green tomato, red tomato
- Four tools: Inspect, Watering Can, Bug Removal, Harvest Basket
- Garden Journal and More Info notes
- Gentle stress, wilt, recovery, and stage retry behavior
- Result labels: Gentle Care, Careful Gardener, Learning Gardener
