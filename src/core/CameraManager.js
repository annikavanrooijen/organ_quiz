import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export class CameraManager {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100); // PerspectiveCamera( fov, aspect, near, far )
    this.camera.position.set(0, 1.6, 5);
    this.camera.lookAt(0, 1.2, 0);
  }

  setAspect(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }
}
