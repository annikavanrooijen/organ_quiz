import * as THREE from "three";

// Verwaltet die Szene: dunkler Hintergrund, Umgebungslicht und Richtungslicht von schräg oben rechts

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1b2a4a); 

    const amb = new THREE.AmbientLight(0xffffff, 0.35); 
    const dir = new THREE.DirectionalLight(0xffffff, 1.0); 
    dir.position.set(3, 5, 2);
    this.scene.add(amb, dir);
  }
}
