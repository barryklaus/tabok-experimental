# TABOK — Experimental WebGL Edition

Version: **v0.20.0 Experimental WebGL — Living Ruins**  
Build: **2026.08.25.W7**

Open `index.html` through a web host such as GitHub Pages, or serve this folder
locally. The game remains browser-only and needs no installation.

## What changed

- The board now reacts to play: character-colored route currents illuminate in
  sequence, each traversed hex produces a grounded footfall response, and
  Travelers visibly react when they take, give, steal, block, or suffer damage.
- Lightweight cinematic camera emphasis and brief impact frames punctuate
  Monster strikes, Portal crossings, Rune claims, and Grand Plunder without
  replacing the playable board or interrupting input.
- The Portal now bends its surrounding light continuously with three
  composited distortion rings and a breathing lens treatment. Lower quality
  modes automatically simplify the effect.
- Balanced, treasure-rich inventories become **Resonant**, adding a readable
  glow to both the board portrait and Traveler card.
- The ruins occasionally awaken with a short spectral-eye event on an empty
  playable hex. These events are decorative and never change the rules.
- Important moments are recorded locally during the current expedition. A
  **Replay last moment** control can re-stage the most recent crossing, major
  summoning, damaging hit, Rune bond, theft, or Grand Plunder emphasis.
- All new spectacle is made from CSS and SVG layers, uses no new bitmap assets,
  and is reduced or paused automatically by the existing performance controls.
- No sound has been added in this build.

- Detailed stone hexes, ruin walls, carved motifs, bevel lighting, and the
  Portal dais are composed once at 1802×1972 and cached as one GPU texture.
- The haunting Portal uses a sealed-eye design, opposing arc currents, orbiting
  sigils, and eight tiny motes without blur filters or particle storms.
- Exact SVG hex hit areas remain above the canvas, preserving adjacent-step and
  maximum-route selection behavior.
- Hovering a board portrait reveals its Traveler name and entrance number.
- Last Breath and Answer-or-Die now issue prominent, accessible alerts naming
  the exact Traveler—or every simultaneously affected Traveler—who must act.
- Grand Plunder now steals a strict maximum of three total treasures from one
  Traveler. Human players select each treasure; CPU players choose a legal
  three-treasure haul strategically. The 3-3-3 inventory limit still applies.
- Human movement now exposes every reachable legal destination: adjacent,
  intermediate, and maximum-distance hexes. An intermediate shortcut follows
  its visible route and preserves the unused movement for another choice.
- Every traversed movement hex now resolves collectibles immediately. Human
  and CPU Travelers can pick up Shields, Armor, and Rune Dice while passing
  through them; Riftwalk also collects an item on its destination hex.
- Unsupported WebGL browsers automatically fall back to the original SVG board.
- Internal canvas resolution adapts from 58% to 100%, depending on the selected
  quality tier and device capability; the board source remains full resolution.
- Hidden SVG art is removed from the browser's animation workload.
- Celebration, death, Major Monster, and character animation assets load only
  when their scenes need them.
- Obsolete duplicate sprite assets were excluded from this edition.

All other Experimental Rune Die, Portal, Monster, Major Monster, Last Breath,
Answer-or-Die, CPU, and treasure-transfer rules remain unchanged.

## Performance controls

- **Fast + Auto** is recommended for online and mobile play.
- **Cinematic + Full** favors richer effects on stronger desktop hardware.
- Add `?debug` to the page URL to display the live FPS meter.
