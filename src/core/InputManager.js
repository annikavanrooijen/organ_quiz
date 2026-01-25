import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

// Übersetzt User-Klick in ein “welches 3D-Objekt wurde getroffen?”

export class InputManager {
  constructor(domEl, camera, scene) {
    this.domEl = domEl;
    this.camera = camera;
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.ndc = new THREE.Vector2();
    this.onPick = null;
    domEl.addEventListener("pointerdown", (e) => this.handlePointer(e));
  }

  handlePointer(e) {
    const rect = this.domEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.ndc.set(x, y);
    this.raycaster.setFromCamera(this.ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.scene.children, true)
      .filter(h => h.object.userData?.organId);
    if (hits.length && this.onPick) this.onPick(hits[0]);
  }
}
