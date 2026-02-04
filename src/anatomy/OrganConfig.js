// Katalog der verfügbaren Organe mit ihren 3D-Modell-URLs und Transformationsdaten

export const ORGAN_CONFIG = {
  heart: {
    url: new URL("../../assets/models/heart/scene.gltf", import.meta.url).href,
    scale: [40, 40, 40],
    position: [0, -1.5, 0],

    targets: [
      { id: "aorta_arch", position: [-0.2, 1.3, 0], radius: 0.5, scale: [1,1,1] },
      { id: "right_atrium",position: [0,0,0.4], radius: 0.6, scale: [1,1,1] },
      { id: "left_ventricle", position: [0.5,-0.8,-0.2], radius: 0.5 , scale: [1,1,1]},
    ]
  },
  lungs: {
    url: new URL("../../assets/models/lungs/scene.gltf", import.meta.url).href,
    scale: [10, 10, 10],
    position: [0, -1.5, 0],

    targets: [
      { id: "lung_wing", position: [-0.6,-0.9,-0.5], radius: 0.5, scale: [1.5, 2.4, 1.7] },
      { id: "cardiac_impression", position: [0.2,-1,-0.4], radius: 0.4, scale: [1,1.5,1] },
      { id: "larynx", position: [0,0.8,-0.25], radius: 0.2, scale: [1,1.5,1] },
    ]
  },
  brain: {
    url: new URL("../../assets/models/brain/scene.gltf", import.meta.url).href,
    scale: [15, 15, 15],
    position: [1, 0, 0],

    targets: [
      { id: "frontal_lobe", position: [1,0.5,1], radius: 0.7, scale: [1,1,1] },
      { id: "optic_nerve",  position: [0.6,0,0.5], radius: 0.4, scale: [1,1,1]},
      { id: "brain_stem", position: [0.3,-0.4,0], radius: 0.5, scale: [1,2,1]},
    ]
  },
  intestine: {
    url: new URL("../../assets/models/intestine/scene.gltf", import.meta.url).href,
    scale: [2, 2, 2],
    position: [-1, -0.5, 0],

    targets: [
      { id: "small_intestine", position: [0,0,0], radius:0.9, scale: [1,1,0.2] },
      { id: "appendix", position: [-0.6,-1.2,0], radius: 0.3, scale: [1,1,1] },
      { id: "rectum", position: [0.2,-1.4,-0.6], radius: 0.38, scale: [1,2,1] },
    ]
  },
};