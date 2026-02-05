// src/quiz/Questions.js

// Fragen für das Organ-Quiz mit den zugehörigen Organ- und Target-IDs

export const questions = [
  // ---------- HERZ ----------
  {
    prompt: "Klicke auf den Aortenbogen",
    organId: "heart",
    targetId: "aorta_arch",
    title: "Aortenbogen (Arcus aortae)",
    info: "Der Aortenbogen ist ein zentraler Abschnitt der Hauptschlagader und verbindet die aufsteigende mit der absteigenden Aorta. Von hier aus zweigen wichtige Arterien ab, die Kopf, Hals und Arme mit sauerstoffreichem Blut versorgen. Er spielt somit eine entscheidende Rolle im Körperkreislauf. Eine gesunde Funktion des Aortenbogens ist lebenswichtig für die Blutversorgung des gesamten Körpers."
  },
  {
    prompt: "Klicke auf den rechten Vorhof",
    organId: "heart",
    targetId: "right_atrium",
    title: "Rechter Vorhof (Atrium dextrum)",
    info: "Der rechte Vorhof ist eine der vier Herzhöhlen und nimmt sauerstoffarmes Blut aus dem Körperkreislauf auf. Dieses Blut gelangt über die obere und untere Hohlvene in den Vorhof. Von dort wird es in die rechte Herzkammer weitergeleitet. Der rechte Vorhof ist somit der erste Schritt des Blutflusses durch das Herz."
  },
  {
    prompt: "Klicke auf die linke Herzkammer",
    organId: "heart",
    targetId: "left_ventricle",
    title: "Linke Herzkammer (Ventriculus sinister)",
    info: "Die linke Herzkammer ist die kräftigste Kammer des Herzens. Sie pumpt sauerstoffreiches Blut mit hohem Druck in die Aorta und damit in den gesamten Körperkreislauf. Ihre dicke Muskelwand ist notwendig, um diesen hohen Druck zu erzeugen. Eine Schwäche der linken Herzkammer kann zu schweren Kreislaufproblemen führen."
  },

  // ---------- LUNGEN ----------
  {
    prompt: "Klicke auf den Lungenflügel der 3 Lappen hat",
    organId: "lungs",
    targetId: "lung_wing",
    title: "Rechter Lungenflügel (Pulmo dexter)",
    info: "Der rechte Lungenflügel besteht aus drei Lungenlappen, im Gegensatz zum linken, der nur zwei besitzt. Diese Aufteilung schafft Platz für das Herz auf der linken Seite des Brustkorbs. In den Lungenlappen findet der Gasaustausch statt, bei dem Sauerstoff aufgenommen und Kohlendioxid abgegeben wird. Der rechte Lungenflügel spielt daher eine zentrale Rolle bei der Atmung."
  },
  {
    prompt: "Klicke auf die Stelle an der sich das Herz befinden würde",
    organId: "lungs",
    targetId: "cardiac_impression",
    title: "Herzeindruck (Impressio cardiaca)",
    info: "Die Impressio cardiaca ist eine Einbuchtung im linken Lungenflügel, die durch das angrenzende Herz entsteht. Sie zeigt, wie eng Herz und Lunge im Brustraum zusammenliegen. Diese anatomische Anpassung ermöglicht eine kompakte Anordnung der Organe. Der Herzeindruck ist ein gutes Beispiel für das Zusammenspiel von Organen im Körper."
  },
  {
    prompt: "Klicke auf den Kehlkopf",
    organId: "lungs",
    targetId: "larynx",
    title: "Kehlkopf (Larynx)",
    info: "Der Kehlkopf verbindet den Rachen mit der Luftröhre und ist ein wichtiger Teil der Atemwege. Er sorgt dafür, dass Luft in die Lunge gelangt und schützt gleichzeitig vor dem Eindringen von Nahrung. Außerdem enthält er die Stimmbänder und ist damit entscheidend für die Stimmbildung. Ohne den Kehlkopf wäre sowohl Atmung als auch Sprechen nicht möglich."
  },

  // ---------- GEHIRN ----------
  {
    prompt: "Klicke auf den Frontallappen",
    organId: "brain",
    targetId: "frontal_lobe",
    title: "Frontallappen (Lobus frontalis)",
    info: "Der Frontallappen ist der vordere Teil des Großhirns und spielt eine zentrale Rolle bei kognitiven Funktionen. Er ist unter anderem für Planung, Entscheidungsfindung und Persönlichkeit verantwortlich. Außerdem steuert er willkürliche Bewegungen des Körpers. Schädigungen des Frontallappens können das Verhalten und die Persönlichkeit stark verändern."
  },
  {
    prompt: "Klicke auf den Sehnerv",
    organId: "brain",
    targetId: "optic_nerve",
    title: "Sehnerv (Nervus opticus)",
    info: "Der Sehnerv leitet visuelle Informationen von der Netzhaut des Auges zum Gehirn. Dort werden die Signale zu Bildern verarbeitet. Er ist somit unverzichtbar für das Sehen. Schäden am Sehnerv können zu Sehstörungen oder sogar zur Erblindung führen."
  },
  {
    prompt: "Klicke auf das Stammhirn",
    organId: "brain",
    targetId: "brain_stem",
    title: "Stammhirn (Truncus encephali)",
    info: "Das Stammhirn verbindet das Gehirn mit dem Rückenmark und steuert lebenswichtige Funktionen. Dazu gehören Atmung, Herzschlag und Blutdruckregulation. Viele Reflexe, wie Schlucken oder Husten, werden hier kontrolliert. Ohne ein funktionierendes Stammhirn ist ein Überleben nicht möglich."
  },

  // ---------- DARM ----------
  {
    prompt: "Klicke auf den Dünndarm",
    organId: "intestine",
    targetId: "small_intestine",
    title: "Dünndarm (Intestinum tenue)",
    info: "Der Dünndarm ist der längste Abschnitt des Verdauungstraktes. In ihm findet der Großteil der Verdauung und Nährstoffaufnahme statt. Die stark gefaltete Oberfläche vergrößert die Fläche für die Aufnahme von Nährstoffen. Ohne den Dünndarm wäre eine ausreichende Versorgung des Körpers nicht möglich."
  },
  {
    prompt: "Klicke auf den Blinddarm",
    organId: "intestine",
    targetId: "appendix",
    title: "Blinddarm (Appendix vermiformis)",
    info: "Der Blinddarm ist ein kleiner, röhrenförmiger Fortsatz des Dickdarms. Er enthält viel lymphatisches Gewebe und ist Teil des Immunsystems. Lange Zeit galt er als funktionslos, heute kennt man seine immunologische Bedeutung. Eine Entzündung des Blinddarms wird als Appendizitis bezeichnet."
  },
  {
    prompt: "Klicke auf das Rektum",
    organId: "intestine",
    targetId: "rectum",
    title: "Rektum (Rectum)",
    info: "Das Rektum ist der letzte Abschnitt des Dickdarms. Es dient als Speicher für den Stuhl vor der Ausscheidung. Dehnungsrezeptoren im Rektum lösen den Stuhldrang aus. Damit spielt es eine wichtige Rolle bei der kontrollierten Darmentleerung."
  },
];

