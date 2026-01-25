import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b1020); 

    const amb = new THREE.AmbientLight(0xffffff, 0.35); 
    const dir = new THREE.DirectionalLight(0xffffff, 1.0); 
    dir.position.set(3, 5, 2);

    this.scene.add(amb, dir);
  }
}
