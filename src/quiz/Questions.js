// src/quiz/Questions.js

// Fragen für das Organ-Quiz mit den zugehörigen Organ- und Target-IDs

export const questions = [
   // ---------- HERZ ----------
  { prompt: "Klicke auf den Aortenbogen", organId: "heart", targetId: "aorta_arch" },
  { prompt: "Klicke auf den rechten Vorhof", organId: "heart", targetId: "right_atrium" },
  { prompt: "Klicke auf die linke Herzkammer", organId: "heart", targetId: "left_ventricle" },
// 
  //   ---------- LUNGEN ----------
  { prompt: "Klicke auf den Lungenflügel der 3 Lappen hat", organId: "lungs", targetId: "lung_wing" },
  { prompt: "Klicke auf die Stelle sich das Herz befinden würde", organId: "lungs", targetId: "cardiac_impression" },
  { prompt: "Klicke auf den Kehlkopf", organId: "lungs", targetId: "larynx" },
// 
  //   ---------- BRAIN ----------
  { prompt: "Klicke auf den Frontallappen", organId: "brain", targetId: "frontal_lobe" },
  { prompt: "Klicke auf den Sehnerv", organId: "brain", targetId: "optic_nerve" },
  { prompt: "Klicke auf das Stammhirn", organId: "brain", targetId: "brain_stem" },
// 
  //   ---------- DARM ----------
  { prompt: "Klicke auf den Dünndarm", organId: "intestine", targetId: "small_intestine" },
  { prompt: "Klicke auf den Blinddarm", organId: "intestine", targetId: "appendix" },
  { prompt: "Klicke auf das Rektum", organId: "intestine", targetId: "rectum" },
];
