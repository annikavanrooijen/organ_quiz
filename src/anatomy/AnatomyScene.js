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
  
    // Körper bleibt gleich
    const bodyGeom = new THREE.CapsuleGeometry(0.8, 1.6, 6, 12);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1f2a44 });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.set(0, 1.2, 0);
    this.scene.add(body);
  
    // === HERZ (glTF) ===
    loader.load(
      "assets/models/heart/scene.gltf",
      (gltf) => {
        console.log("Heart loaded", gltf);
        const heart = gltf.scene;
  
        // Skalierung & Position
        heart.scale.set(0.02, 0.02, 0.02);
        heart.position.set(0, 1.2, 0.6); // etwas nach vorne (z)  
        // WICHTIG: organId setzen (Quiz!)
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
  
    // // === ANDERE ORGANE (Platzhalter) ===
    // this.createPlaceholder("lungs", [-0.9, 1.3, 0], 0x6ee7ff);
    // this.createPlaceholder("liver", [0.9, 1.0, 0], 0xffc857);
  }
  
  // createPlaceholder(id, position, color) {
  //   const geom = new THREE.SphereGeometry(0.28, 24, 24);
  //   const mat = new THREE.MeshStandardMaterial({ color });
  //   const mesh = new THREE.Mesh(geom, mat);
  //   mesh.position.set(...position);
  //   mesh.userData.organId = id;
  //   this.scene.add(mesh);
  //   this.organs.push(mesh);
  //}  

  update(dt) {
    this.t += dt;
    for (let i = 0; i < this.organs.length; i++) {
      this.organs[i].rotation.y += 0.5 * dt;
    }
  }
}
