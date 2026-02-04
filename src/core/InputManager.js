import * as THREE from "three";

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

  // Verarbeitet Pointer-Events und feuert onPick Callback bei Treffer
  handlePointer(e) {
    this._updateNDCFromEvent(e);
    this._raycastFromNDC();
    const hit = this._getFirstTargetHit();
    if (hit && this.onPick) this.onPick(hit);
  }

  /* -------------------- interne Hilfsfunktionen -------------------- */

  // Aktualisiert NDC-Koordinaten basierend auf Pointer-Event
  _updateNDCFromEvent(e) {
    const rect = this.domEl.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    this.ndc.set(x, y);
  }

  // Führt Raycasting von NDC-Punkt (=normalisierte Geräte-Koordinaten) aus
  _raycastFromNDC() {
    this.raycaster.setFromCamera(this.ndc, this.camera);
    this._hits = this.raycaster.intersectObjects(this.scene.children, true);
  }

  // Liefert den ersten Treffer, der ein Target ist (userData.targetId)
  _getFirstTargetHit() {
    const targetHits = this._hits.filter((h) => h.object.userData?.targetId);
    return targetHits.length ? targetHits[0] : null;
  }
}
