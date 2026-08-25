# TABOK — Experimental WebGL Edition

Version: **v0.19.0 Experimental WebGL**  
Build: **2026.08.25.W1**

Open `index.html` through a web host such as GitHub Pages, or serve this folder
locally. The game remains browser-only and needs no installation.

## What changed

- The permanent board, hex field, portal, and ambient particles render through
  one GPU-accelerated WebGL canvas powered by the bundled PixiJS runtime.
- Exact SVG hex hit areas remain above the canvas, preserving adjacent-step and
  maximum-route selection behavior.
- Unsupported WebGL browsers automatically fall back to the original SVG board.
- Internal canvas resolution adapts to phone and modest-device hardware.
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

