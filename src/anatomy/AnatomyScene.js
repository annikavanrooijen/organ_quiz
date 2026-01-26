import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { ORGANS } from "./organs.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";


export class AnatomyScene {
  constructor(scene) {
    this.scene = scene;
    this.organs = [];
    this.t = 0;
  }

  build() {
    const loader = new GLTFLoader();

    // Herz laden
    loader.load(
      "assets/models/heart/scene.gltf",
      (gltf) => {
        console.log("Heart loaded", gltf);
        const heart = gltf.scene;
  
        // Skalierung & Position
        heart.scale.set(30, 30, 30); // skaliert auf passende Größe
        heart.position.set(0, 0.5,0);
        heart.traverse((child) => {
          if (child.isMesh) {
            child.userData.organId = "heart";
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
  
        this.scene.add(heart);
        this.organs.push(heart);
        console.log("Organs in scene:", this.organs);
      },
      undefined,
      (err) => console.error("Heart load error", err)
    );
  }

  update(dt) {
    this.t += dt;
    for (let i = 0; i < this.organs.length; i++) {
      this.organs[i].rotation.y += 0.5 * dt;
    }
  }
}
