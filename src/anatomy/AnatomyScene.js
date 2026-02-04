// src/anatomy/AnatomyScene.js

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ORGAN_CONFIG } from "./OrganConfig.js";
import * as THREE from "three";

export class AnatomyScene {

  constructor(scene) {
    this.scene = scene;
    this.objectLoader = new GLTFLoader();
    this.currentOrgan = null;
    this.currentOrganId = null;
    this.currentTargetMesh = null;
    this._requestId = 0;
  }

  // Platzhalter für zukünftige Initialisierung
  build() {}

  // Entfernt die aktuell angezeigte Zielkugel
  clearTarget() {
    this._disposeMesh(this.currentTargetMesh);
    this.currentTargetMesh = null;
  }

  // Zeigt die Zielkugel für das gegebene Organ und Target an
  showTarget(organId, targetId) {
    const cfg = this._getConfig(organId);
    if (!cfg) return;

    const t = this._getTarget(cfg, targetId);
    if (!t) {
      console.warn("Unknown targetId:", targetId, "for organ:", organId);
      this.clearTarget();
      return;
    }

    this.clearTarget();
    this.currentTargetMesh = this._makeTargetMesh(t, organId, targetId);
    this.scene.add(this.currentTargetMesh);
  }

  // Lädt das 3D-Modell des angegebenen Organs
  async loadOrgan(organId) {
    const cfg = this._getConfig(organId);
    if (!cfg) return;

    if (this.currentOrganId === organId && this.currentOrgan) return;

    const reqId = ++this._requestId;

    this._removeCurrentOrgan();

    this.objectLoader.load(
      cfg.url,
      (gltf) => {
        if (reqId !== this._requestId) return;

        const organ = gltf.scene;
        organ.scale.set(...cfg.scale);
        organ.position.set(...cfg.position);

        this.scene.add(organ);
        this.currentOrgan = organ;
        this.currentOrganId = organId;
      },
      undefined,
      (err) => console.error("Organ load error", organId, err)
    );
  }

  /* -------------------- interne Hilfsfunktionen  -------------------- */

  // Liefert die Konfiguration für ein Organ
  _getConfig(organId) {
    const cfg = ORGAN_CONFIG[organId];
    if (!cfg) console.warn("Unknown organId:", organId);
    return cfg;
  }

  // Liefert die Target-Definition für ein Organ und Target-ID
  _getTarget(cfg, targetId) {
    return cfg.targets?.find((x) => x.id === targetId) ?? null;
  }

  // Entfernt das aktuell geladene Organ aus der Szene und gibt Ressourcen frei
  _removeCurrentOrgan() {
    if (!this.currentOrgan) return;

    this.scene.remove(this.currentOrgan);
    this._removeAndDispose(this.currentOrgan);

    this.currentOrgan = null;
    this.currentOrganId = null;
  }

  // Hilfsfunktion zum Entfernen und Freigeben von Mesh-Ressourcen
  _removeAndDispose(root) {
    if (!root) return;

    root.traverse((obj) => {
      if (!obj?.isMesh) return;

      obj.geometry?.dispose?.();

      const mat = obj.material;
      if (Array.isArray(mat)) mat.forEach((m) => m?.dispose?.());
      else mat?.dispose?.();
    });
  }

  // Hilfsfunktion zum Entfernen und Freigeben eines einzelnen Mesh
  _disposeMesh(mesh) {
    if (!mesh) return;

    this.scene.remove(mesh);
    mesh.geometry?.dispose?.();
    mesh.material?.dispose?.();
  }

  // Erstellt eine unsichtbare, aber raycastbare Zielkugel für ein Target
  _makeTargetMesh(t, organId, targetId) {
    const geo = new THREE.SphereGeometry(t.radius, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.0, 
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...t.position);
    mesh.scale.set(...(t.scale ?? [1, 1, 1]));
    mesh.userData.organId = organId;
    mesh.userData.targetId = targetId;

    return mesh;
  }
}
