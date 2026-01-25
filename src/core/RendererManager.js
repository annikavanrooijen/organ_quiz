import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export class RendererManager {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }

  attachTo(mountEl) {
    mountEl.appendChild(this.renderer.domElement);
  }

  getDomElement() {
    return this.renderer.domElement;
  }

  setSize(w, h) {
    this.renderer.setSize(w, h);
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  setAnimationLoop(fn) {
    let last = performance.now();
    this.renderer.setAnimationLoop(() => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      fn(dt);
    });
  }
}
