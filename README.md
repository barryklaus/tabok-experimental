# TABOK — Experimental WebGL Edition

Version: **v0.19.1 Experimental WebGL — High-Fidelity Board**  
Build: **2026.08.25.W2**

Open `index.html` through a web host such as GitHub Pages, or serve this folder
locally. The game remains browser-only and needs no installation.

## What changed

- Detailed stone hexes, ruin walls, carved motifs, bevel lighting, and the
  Portal dais are composed once at 1802×1972 and cached as one GPU texture.
- The haunting Portal uses a sealed-eye design, opposing arc currents, orbiting
  sigils, and eight tiny motes without blur filters or particle storms.
- Exact SVG hex hit areas remain above the canvas, preserving adjacent-step and
  maximum-route selection behavior.
- Unsupported WebGL browsers automatically fall back to the original SVG board.
- Internal canvas resolution adapts from 58% to 100%, depending on the selected
  quality tier and device capability; the board source remains full resolution.
- Hidden SVG art is removed from the browser's animation workload.
- Celebration, death, Major Monster, and character animation assets load only
  when their scenes need them.
- Obsolete duplicate sprite assets were excluded from this edition.

All Experimental Rune Die, Portal, Monster, Major Monster, Last Breath,
Answer-or-Die, CPU, and treasure-transfer rules remain unchanged.

## Performance controls

- **Fast + Auto** is recommended for online and mobile play.
- **Cinematic + Full** favors richer effects on stronger desktop hardware.
- Add `?debug` to the page URL to display the live FPS meter.
