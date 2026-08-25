(function () {
  'use strict';

  const COLORS = { P: 0x68477d, T: 0x326f70, G: 0x68645e, wall: 0x17120f };

  function hexPoints(cx, cy, w = 48, h = 41.5, slope = 24) {
    return [cx - slope, cy - h, cx + slope, cy - h, cx + w, cy,
      cx + slope, cy + h, cx - slope, cy + h, cx - w, cy];
  }

  function drawHex(graphics, cx, cy, fill, stroke = 0x211810, strokeWidth = 3) {
    graphics.poly(hexPoints(cx, cy)).fill(fill).stroke({ color: stroke, width: strokeWidth });
  }

  class TabokWebGLBoard {
    constructor(canvas, config) {
      this.canvas = canvas;
      this.config = config;
      this.app = new PIXI.Application();
      this.ready = this.init();
    }

    async init() {
      const mobile = matchMedia('(max-width: 700px)').matches;
      const modestDevice = (navigator.deviceMemory && navigator.deviceMemory <= 4) || navigator.hardwareConcurrency <= 4;
      this.renderScale = mobile || modestDevice ? 0.5 : 0.66;
      await this.app.init({
        canvas: this.canvas,
        width: Math.round(1802 * this.renderScale),
        height: Math.round(1972 * this.renderScale),
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: false,
        preference: 'webgl',
        powerPreference: 'high-performance',
        resolution: 1,
        hello: false
      });

      this.app.stage.eventMode = 'none';
      this.app.stage.scale.set(this.renderScale);
      this.drawFoundation();
      this.drawBoard();
      this.drawPortal();
      this.drawAtmosphere();
      this.app.ticker.add(ticker => this.animate(ticker.deltaMS));
      document.documentElement.classList.add('webgl-enabled');
      window.dispatchEvent(new CustomEvent('tabok-webgl-ready'));
      return this;
    }

    drawFoundation() {
      const g = new PIXI.Graphics();
      g.ellipse(901, 1005, 765, 900).fill({ color: COLORS.wall, alpha: 0.98 });
      g.ellipse(901, 1005, 735, 870).stroke({ color: 0x60472f, width: 20, alpha: 0.72 });
      g.ellipse(901, 1005, 705, 840).stroke({ color: 0x2a1e16, width: 12, alpha: 0.95 });
      this.app.stage.addChild(g);
    }

    drawBoard() {
      const layers = { P: new PIXI.Graphics(), T: new PIXI.Graphics(), G: new PIXI.Graphics() };
      const entries = new PIXI.Graphics();
      const black = new PIXI.Graphics();
      for (const cell of this.config.cells) {
        if (cell.type === 'W') {
          drawHex(entries, cell.x, cell.y, 0xd5c39b, 0x382719, 5);
        } else if (COLORS[cell.type]) {
          drawHex(layers[cell.type], cell.x, cell.y, COLORS[cell.type]);
        } else {
          drawHex(black, cell.x, cell.y, 0x1a1511, 0x0b0907, 3);
        }
      }
      this.app.stage.addChild(black, layers.P, layers.T, layers.G, entries);

      // One lightweight detail pass gives the ruins texture without hundreds of filters.
      const detail = new PIXI.Graphics();
      for (const cell of this.config.cells) {
        if (!COLORS[cell.type]) continue;
        const seed = Math.abs(cell.q * 37 + cell.r * 19);
        const alpha = 0.07 + (seed % 4) * 0.018;
        detail.circle(cell.x + (seed % 9) - 4, cell.y + (seed % 7) - 3, 9 + seed % 12)
          .stroke({ color: 0xe8d5ac, width: 2, alpha });
        if (seed % 3 === 0) {
          detail.moveTo(cell.x - 25, cell.y + 13).lineTo(cell.x - 7, cell.y - 4)
            .lineTo(cell.x + 13, cell.y + 5).stroke({ color: 0x0d0a08, width: 2, alpha: 0.22 });
        }
      }
      this.app.stage.addChild(detail);

      for (const entry of this.config.entries) {
        const text = new PIXI.Text({
          text: entry.label,
          style: { fontFamily: 'Georgia', fontSize: 34, fontWeight: 'bold', fill: 0xffcf85,
            stroke: { color: 0x54203b, width: 5 }, align: 'center' }
        });
        text.anchor.set(0.5);
        text.position.set(entry.x, entry.y + 1);
        this.app.stage.addChild(text);
      }
    }

    drawPortal() {
      const root = new PIXI.Container();
      root.position.set(this.config.portal.x, this.config.portal.y);
      const aura = new PIXI.Graphics().circle(0, 0, 134).fill({ color: 0x8c3ea1, alpha: 0.16 });
      const well = new PIXI.Graphics()
        .circle(0, 0, 84).fill({ color: 0x140d22, alpha: 1 })
        .circle(0, 0, 72).stroke({ color: 0xbd75cf, width: 12, alpha: 0.72 })
        .circle(0, 0, 52).stroke({ color: 0x7041a4, width: 13, alpha: 0.82 })
        .circle(0, 0, 29).fill({ color: 0x6f2d8c, alpha: 0.95 })
        .circle(0, 0, 11).fill({ color: 0xffdcf4, alpha: 0.95 });
      const currents = new PIXI.Container();
      for (let i = 0; i < 3; i++) {
        const arc = new PIXI.Graphics();
        arc.arc(0, 0, 61 - i * 13, -2.45 + i, 0.75 + i).stroke({
          color: [0xff82cf, 0xa977e8, 0x8ddcff][i], width: 8 - i * 2, alpha: 0.76
        });
        currents.addChild(arc);
      }
      root.addChild(aura, well, currents);
      this.portal = { root, aura, well, currents, time: 0 };
      this.app.stage.addChild(root);
    }

    drawAtmosphere() {
      // A small regular container is faster here than managing Particle API variants,
      // and keeps this build compatible across PixiJS 8 point releases.
      const motes = new PIXI.Container();
      this.motes = [];
      const texture = this.app.renderer.generateTexture(new PIXI.Graphics().circle(3, 3, 3).fill(0xffdfad));
      for (let i = 0; i < 22; i++) {
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.position.set(245 + (i * 263 % 1310), 255 + (i * 397 % 1440));
        sprite.alpha = 0.16 + (i % 5) * 0.045;
        sprite.scale.set(i % 4 === 0 ? 1.2 : 0.72);
        sprite._baseY = sprite.y;
        sprite._phase = i * 0.47;
        motes.addChild(sprite);
        this.motes.push(sprite);
      }
      this.app.stage.addChild(motes);
    }

    animate(deltaMS) {
      if (document.documentElement.classList.contains('effects-paused')) return;
      const delta = Math.min(deltaMS, 34) / 1000;
      this.portal.time += delta;
      this.portal.currents.rotation += delta * 0.34;
      this.portal.well.rotation -= delta * 0.08;
      const pulse = 1 + Math.sin(this.portal.time * 2.1) * 0.045;
      this.portal.aura.scale.set(pulse);
      this.portal.aura.alpha = 0.15 + Math.sin(this.portal.time * 1.7) * 0.035;
      for (const mote of this.motes) {
        mote._phase += delta * 0.55;
        mote.y = mote._baseY + Math.sin(mote._phase) * 8;
        mote.alpha = 0.13 + (Math.sin(mote._phase * 1.7) + 1) * 0.07;
      }
    }

    setQuality(quality) {
      if (!this.motes) return;
      this.motes.forEach((mote, index) => { mote.visible = quality !== 'lite' || index < 6; });
    }

    destroy() {
      this.app.destroy(false, { children: true, texture: true });
    }
  }

  window.TabokWebGLBoard = TabokWebGLBoard;
})();
