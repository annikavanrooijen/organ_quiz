// src/anatomy/organs_config.js

// Katalog der verfügbaren Organe mit ihren 3D-Modell-URLs und Transformationsdaten

export const ORGAN_CONFIG = {
  heart: {
    url: new URL("../../assets/models/heart/scene.gltf", import.meta.url).href,
    scale: [40, 40, 40],
    position: [0, -1.5, 0],
  },
  lungs: {
    url: new URL("../../assets/models/lungs/scene.gltf", import.meta.url).href,
    scale: [10, 10, 10],
    position: [0, -1.5, 0],
  },
  brain: {
    url: new URL("../../assets/models/brain/scene.gltf", import.meta.url).href,
    scale: [15, 15, 15],
    position: [1, 0, 0],
  },
  intestine: {
    url: new URL("../../assets/models/intestine/scene.gltf", import.meta.url).href,
    scale: [2, 2, 2],
    position: [-1, -0.5, 0],
  },
};