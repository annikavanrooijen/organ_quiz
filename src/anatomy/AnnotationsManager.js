import * as THREE from "three";

export class AnnotationManager {
  constructor({ debug = true } = {}) {
    this.debug = debug;
    this.targets = [];     // Meshes für Raycaster
    this.byId = new Map(); // id -> mesh
  }

  addSphere({ id, parent, position, radius = 0.02 }) {
    const geo = new THREE.SphereGeometry(radius, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.45,
      visible: this.debug
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(position);

    // damit du beim Klick die ID bekommst
    mesh.userData.annotationId = id;

    // wichtig: hängt an Organ, damit sie mitgeht
    parent.add(mesh);

    this.targets.push(mesh);
    this.byId.set(id, mesh);

    return mesh;
  }

  getTargets() {
    return this.targets;
  }

  setDebug(enabled) {
    this.debug = enabled;
    this.targets.forEach(t => (t.material.visible = enabled));
  }
}
