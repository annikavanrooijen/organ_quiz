import * as THREE from "three";

// Verwaltet den WebGL-Renderer: Initialisierung, Größenanpassung, Rendern und Animationsschleife

export class RendererManager {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }

  // Fügt den Renderer an ein DOM-Element an
  attachTo(mountEl) {
    mountEl.appendChild(this.renderer.domElement);
  }

  // gibt das DOM-Element zurück, auf dem der Renderer zeichnet
  getDomElement() {
    return this.renderer.domElement;
  }

  // Setzt die Größe des Renderers
  setSize(w, h) {
    this.renderer.setSize(w, h);
  }

  // Rendert die Szene mit der Kamera
  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  // Setzt die Animationsschleife mit einem Callback, das die Delta-Zeit erhält
    setAnimationLoop(fn) {
    let last = performance.now();
    const self = this;

    this.renderer.setAnimationLoop(function () {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;

      fn(dt);
    });
  }
}
