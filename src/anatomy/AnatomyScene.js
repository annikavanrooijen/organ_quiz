// src/anatomy/AnatomyScene.js

// Managt das Laden und Anzeigen von Organ-3D-Modellen in der Anatomie-Szene

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ORGAN_CONFIG } from "./OrganConfig.js";

export class AnatomyScene {
  constructor(scene) {
    this.scene = scene;
    this.objectLoader = new GLTFLoader();
    this.currentOrgan = null;
    this._requestId = 0;
  }

  build() {}

  async loadOrgan(organId) {
    const organConfig = ORGAN_CONFIG[organId];
    if (!organConfig) {
      console.warn("Unknown organId:", organId);
      return;
    }

    const reqId = ++this._requestId; 

    // altes Organ entfernen
    if (this.currentOrgan) {
      this.scene.remove(this.currentOrgan);
      this.currentOrgan.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material?.dispose?.();
        }
      });
      this.currentOrgan = null;
    }

    this.objectLoader.load(
      organConfig.url,
      (gltf) => {
        // Wenn inzwischen ein neueres loadOrgan() aufgerufen wurde: abbrechen
        if (reqId !== this._requestId) return;

        const organ = gltf.scene;

        organ.scale.set(...organConfig.scale);
        organ.position.set(...organConfig.position);

        organ.traverse((child) => {
          if (child.isMesh) {
            child.userData.organId = organId;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.scene.add(organ);
        this.currentOrgan = organ;
      },
      undefined,
      (err) => console.error("Organ load error", organId, err)
    );
  }
}
