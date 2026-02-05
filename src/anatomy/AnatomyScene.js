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


  build() {}

  // entfernt die aktuelle Ziel aus der Szene
  clearTarget() {
    this._disposeMesh(this.currentTargetMesh);
    this.currentTargetMesh = null;
  }

  // lädt das zugeörige Ziel für das Organ und fügt es der Szene hinzu
  showTarget(organId, targetId) {
    const config = this._getConfig(organId);
    if (!config) 
      return;

    const target = this._getTarget(config, targetId);
    if (!target) {
      console.warn("Unknown targetId:", targetId, "for organ:", organId);
      this.clearTarget();
      return;
    }

    this.clearTarget();
    this.currentTargetMesh = this._makeTargetMesh(target, organId, targetId);
    this.scene.add(this.currentTargetMesh);
  }

  // lädt ein Organ basierend auf der organId und fügt es der Szene hinzu
  async loadOrgan(organId) {
    const config = this._getConfig(organId);
    if (!config) 
      return;

    if (this.currentOrganId === organId && this.currentOrgan) 
      return;

    const reqId = ++this._requestId;
    const self = this;

    this._removeCurrentOrgan();

    this.objectLoader.load(
      config.url,
      function (gltf) {
        if (reqId !== self._requestId) 
          return;

        const organ = gltf.scene;
        organ.scale.set(...config.scale);
        organ.position.set(...config.position);

        self.scene.add(organ);
        self.currentOrgan = organ;
        self.currentOrganId = organId;
      },
      undefined,
      function (err) {console.error("Organ load error", organId, err);}
    );
  }

  /* -------------------- interne Hilfsfunktionen -------------------- */

  // gibt die Konfiguration für ein Organ zurück
  _getConfig(organId) {
    const config = ORGAN_CONFIG[organId];
    if (!config) console.warn("Unknown organId:", organId);
    return config;
  }

  // gibt die Konfigurationen für ein Ziel zurück
  _getTarget(config, targetId) {
    return config.targets?.find(function (x) {
      return x.id === targetId;
    }) ?? null;
  }

  // entfernt das aktuelle Organ aus der Szene und gibt den Speicher frei
  _removeCurrentOrgan() {
    if (!this.currentOrgan) 
      return;

    this.scene.remove(this.currentOrgan);
    this._removeAndDispose(this.currentOrgan);

    this.currentOrgan = null;
    this.currentOrganId = null;
  }

  // gibt den Speicher für ein Objekt und seine Kinder frei
  _removeAndDispose(root) {
    if (!root) 
      return;

    root.traverse(function (object) {
      if (!object || !object.isMesh) 
        return;

      if (object.geometry && object.geometry.dispose) {
        object.geometry.dispose();
      }

      const material = object.material;
      if (Array.isArray(material)) {
        material.forEach(function (m) {
          if (m && m.dispose) 
            m.dispose();
        });
      } else if (material && material.dispose) {
        material.dispose();
      }
    });
  }

  // gibt den Speicher für ein Mesh frei und entfernt es aus der Szene
  _disposeMesh(mesh) {
    if (!mesh) 
      return;

    this.scene.remove(mesh);

    if (mesh.geometry && mesh.geometry.dispose) {
      mesh.geometry.dispose();
    }

    if (mesh.material && mesh.material.dispose) {
      mesh.material.dispose();
    }
  }

  // erstellt ein unsichtbares Ziel-Mesh basierend auf den Konfigurationsdaten
  _makeTargetMesh(t, organId, targetId) {
    const sphere = new THREE.SphereGeometry(t.radius, 16, 16);
    const material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0,});
    const mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(...t.position);
    mesh.scale.set(...(t.scale ?? [1, 1, 1]));
    mesh.userData.organId = organId;
    mesh.userData.targetId = targetId;

    return mesh;
  }
}
