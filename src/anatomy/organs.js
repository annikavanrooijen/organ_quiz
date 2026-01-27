// src/anatomy/organs.js

// Katalog der verfügbaren Organe mit ihren 3D-Modell-URLs und Transformationsdaten

export const ORGAN_CONFIG = {
  heart: {
    url: new URL("../../assets/models/heart/scene.gltf", import.meta.url).href,
    scale: [30, 30, 30],
    position: [0, 0, 0],
  },
  lungs: {
    url: new URL("../../assets/models/lungs/scene.gltf", import.meta.url).href,
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
  brain: {
    url: new URL("../../assets/models/brain/scene.gltf", import.meta.url).href,
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
  intestine: {
    url: new URL("../../assets/models/intestine/scene.gltf", import.meta.url).href,
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
};