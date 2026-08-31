# TABOK — Experimental WebGPU Edition

Version: **v0.21.2 Experimental WebGPU — Living Ruins**  
Build: **2026.08.31.W8.2**

Open `index.html` through a secure web host such as GitHub Pages, or serve this
folder locally. The game remains browser-only and requires no installation.

## Renderer

- The game requests WebGPU first for its cached high-resolution board, haunting
  Portal, GPU particles, and Living Ruins atmosphere.
- If WebGPU is unavailable or initialization fails, the same build retries with
  WebGL automatically. SVG remains the final compatibility renderer.
- Firefox direct `file://` launches use the full SVG compatibility board because
  Firefox can expose a GPU canvas while refusing the cached board texture. All
  hexes and gameplay remain available. Hosted builds continue to use WebGPU or
  WebGL automatically.
- The active renderer is displayed in the game header. Add `?debug` to the URL
  to show the live frame-rate meter.
- All W7 gameplay, WebGL optimizations, route effects, reactive hexes, cinematic
  camera emphasis, resonance, spectral events, and replay highlights remain.

## Procedural sound

The W8 soundscape is generated live through the Web Audio API. No MP3 or WAV
files are downloaded.

- Low ruin drone and filtered wind ambience
- Dice casting and raffle-roll impact
- Traveler footsteps and Monster movement
- Separate Take, Give, Steal, Resolve, Rune, Shield, and damage cues
- Portal judgment, rejection, crossing, death, and Major Monster signatures
- Answer-or-Die and Last Breath warning tone
- A persistent **Sound on/off** control in the header

Browsers require a click or key press before audio may begin. The first player
interaction unlocks the sound engine automatically. The mute preference is
remembered on that device.

## Performance controls

- **Fast + Auto** is recommended for online and mobile play.
- **Cinematic + Full** favors richer effects on stronger desktop hardware.
- Procedural audio uses a small number of native audio nodes and does not add
  network weight to the game.
