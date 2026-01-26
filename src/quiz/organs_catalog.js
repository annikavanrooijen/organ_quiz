// Zentrale Stelle für:
// - Welche Organe gibt es?
// - Wo liegen die Modelle / wie skalieren wir sie?
// - Welche klickbaren "Hotspots" (Strukturen) gibt es pro Organ?

export const ORGANS = [
  { id: "heart", name: "Herz" },
  { id: "lungs", name: "Lunge" },
  { id: "brain", name: "Gehirn" },
  { id: "intestine", name: "Darm" },
];

export const ORGAN_CATALOG = {
  heart: {
    name: "Herz",
    gltf: "assets/models/heart/scene.gltf",
    scale: 30,
    position: [0, 1.2, 0.6],
    rotation: [0, 0, 0],
    showBody: false,
  },

  lungs: {
    name: "Lunge",
    gltf: "assets/models/lungs/scene.gltf",
    scale: 0.02,
    position: [0, 1.2, 0.6],
    rotation: [0, 0, 0],
    showBody: false,
  },

  brain: {
    name: "Gehirn",
    gltf: "assets/models/brain/scene.gltf",
    scale: 0.5,
    position: [0, 1.5, 0.6],
    rotation: [0, 0, 0],
    showBody: false,
  },
  
  intestine: {
    name: "Darm",
    gltf: "assets/models/intestine/scene.gltf",
    scale: 0.5,
    position: [0, 1.0, 0.6],
    rotation: [0, 0, 0],
    showBody: false,
  },
};

// Hotspots sind im WELT-Koordinatensystem (wie das Modell im Scenegraph liegt).
// Das ist erstmal grob – du kannst die Positionen später durch Testen feinjustieren.
export const ORGAN_HOTSPOTS = {
  heart: [
    // Beispiel: Aortenbogen (Position ist NUR Platzhalter)
    { id: "aortic_arch", label: "Aortenbogen", position: [0.08, 1.42, 0.62], radius: 0.07 },

    // Beispiel: linke Herzkammer (Platzhalter)
    { id: "left_ventricle", label: "Linke Kammer", position: [0.02, 1.18, 0.68], radius: 0.09 },
  ],
};
