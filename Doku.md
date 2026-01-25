# Anatomie-Quiz mit Three.js – Architektur & Funktionsweise

Dieses Dokument beschreibt **detailliert**, wie die WebGL-Anwendung aufgebaut ist, welche Klassen es gibt, wie sie zusammenhängen und wie **Benutzereingaben (Klicks)** verarbeitet werden.

---

## 1. Gesamtüberblick

Die Anwendung ist eine **modulare Three.js-WebGL-Anwendung** mit klarer Trennung der Verantwortlichkeiten:

* **core/** → technische Engine-Schicht (Rendering, Kamera, Input)
* **anatomy/** → 3D-Inhalte (Körper, Organe, Animation)
* **quiz/** → Quiz- & Spiellogik (Fragen, Score)
* **ui/** → Benutzeroberfläche (HTML-Overlay)

Die Klasse **`App`** fungiert als zentrale Steuereinheit und verbindet alle Komponenten miteinander.

---

## 2. Klassen im Detail

## 2.1 `App` – Hauptklasse / Orchestrator

**Aufgabe:**

* Erstellt alle Manager-Klassen
* Verdrahtet deren Kommunikation
* Startet Render-Loop und Quiz

**Zentrale Eigenschaften:**

* `sceneManager.scene` → 3D-Szene
* `cameraManager.camera` → Kamera
* `rendererManager` → WebGL-Renderer
* `input` → verarbeitet Maus-/Pointer-Eingaben
* `anatomy` → erstellt und aktualisiert Organe
* `quiz` → Quiz-Zustand und Logik
* `ui` → Anzeige im Browser

**Ablauf in `start()`**:

1. Renderer wird ins DOM eingebunden
2. Fenster-Resize wird verarbeitet
3. Anatomie-Objekte werden erstellt
4. Input-Callbacks werden gesetzt
5. Quiz wird gestartet
6. Render-Loop beginnt

Die `App` enthält **keine Spiel- oder Renderinglogik**, sondern koordiniert nur.

---

## 2.2 `SceneManager` – Szene & Beleuchtung

**Aufgabe:**

* Erstellt eine `THREE.Scene`
* Setzt Hintergrundfarbe
* Fügt Lichtquellen hinzu

**Beleuchtung:**

* `AmbientLight` → Grundhelligkeit
* `DirectionalLight` → gerichtetes Licht für Tiefenwirkung

Alle sichtbaren Objekte müssen der Szene hinzugefügt werden.

---

## 2.3 `CameraManager` – Perspektivkamera

**Aufgabe:**

* Erstellt eine `PerspectiveCamera`
* Setzt Position und Blickrichtung
* Aktualisiert Projektionsmatrix bei Resize

**Wichtige Parameter:**

* Field of View (FOV)
* Seitenverhältnis (Aspect Ratio)
* Near-/Far-Clipping

Ohne korrekte Aspect-Anpassung wirkt das Bild verzerrt.

---

## 2.4 `RendererManager` – WebGLRenderer & Renderloop

**Aufgabe:**

* Initialisiert `WebGLRenderer`
* Verwaltet Canvas-Größe
* Zeichnet Szene pro Frame

**Render-Loop:**

* Nutzt `renderer.setAnimationLoop()`
* Berechnet Delta-Time (`dt`)
* Ruft Update-Logik und Rendering auf

Delta-Time erlaubt framerate-unabhängige Animationen.

---

## 2.5 `InputManager` – Maus-Input & Raycasting

**Aufgabe:**

* Erfasst Klicks auf das Canvas
* Wandelt Mausposition in 3D-Strahlen um
* Erkennt angeklickte Objekte

**Ablauf:**

1. Browser-Event `pointerdown`
2. Umrechnung von Pixelkoordinaten in NDC (-1 bis +1)
3. Erzeugung eines Rays aus Kamera + Mausposition
4. Schnittpunkt-Test mit Szenenobjekten
5. Filterung auf Objekte mit `userData.organId`

Das Ergebnis wird über einen Callback (`onPick`) weitergegeben.

---

## 2.6 `AnatomyScene` – 3D-Inhalte

**Aufgabe:**

* Erstellt Körper-Platzhalter
* Erstellt Organe als Meshes
* Animiert Organe

**Wichtiger Mechanismus:**

```js
mesh.userData.organId = "heart";
```

Diese ID verbindet das 3D-Objekt mit der Quizlogik.

**`update(dt)`**:

* Wird pro Frame aufgerufen
* Enthält leichte Animationen

---

## 2.7 `organs.js` – Anatomie-Datenmodell

Enthält eine reine Datenstruktur:

* `id` → technischer Schlüssel
* `name` → Anzeigename
* `position` → Position im Raum
* `color` → Materialfarbe

Diese Trennung ermöglicht späteren Austausch durch echte 3D-Modelle.

---

## 2.8 `QuizManager` – Quiz-Logik

**Aufgabe:**

* Verwalten von Fragen
* Prüfen von Antworten
* Aktualisieren von Score und Fortschritt

**Zustand:**

* `questions`
* `index` (aktuelle Frage)
* `score`
* `active` (aktuelle Frage)

**Zentrale Methoden:**

* `start()` → Initialisierung
* `next()` → nächste Frage
* `answer(organId)` → Antwortprüfung

Die Quizlogik arbeitet **nur mit IDs**, nicht mit 3D-Objekten.

---

## 2.9 `questions.js` – Fragenkatalog

Ein Array aus Frageobjekten:

* `prompt` → Fragetext
* `correctId` → passende `organId`

Diese IDs müssen exakt mit den Organ-IDs übereinstimmen.

---

## 2.10 `UI` – Benutzeroberfläche

**Aufgabe:**

* Anzeigen von Texten und Punktestand
* Weitergabe von Button-Eingaben

**Eigenschaften:**

* Greift auf DOM-Elemente zu
* Stellt Methoden wie `setQuestion()` und `setHud()` bereit

Die UI enthält **keine Spiellogik**.

---

## 3. Zusammenspiel der Klassen

* `App` erstellt und verbindet alle Komponenten
* Kommunikation erfolgt über **Callbacks**
* Keine Klasse kennt unnötige Details anderer Klassen

Beispiele:

* `InputManager` → meldet Klicks an `App`
* `App` → ruft `QuizManager.answer()` auf
* `QuizManager` → aktualisiert `UI`

---

## 4. Datenfluss bei einem Klick (Schritt für Schritt)

1. User klickt auf das Canvas
2. `InputManager` empfängt das Event
3. Mausposition → NDC-Koordinaten
4. Raycaster erzeugt Strahl
5. Schnittpunkte mit 3D-Objekten
6. Treffer mit `organId` wird erkannt
7. `QuizManager.answer(organId)` wird aufgerufen
8. Antwort wird geprüft
9. Score / Frage werden aktualisiert
10. `UI` zeigt neues Ergebnis an

---

## 5. Architekturelle Vorteile

* **Separation of Concerns**
* **Lose Kopplung** durch Callbacks
* **Erweiterbarkeit** (echte Modelle, mehr Quizlogik)
* **Studien- & prüfungstauglich** (klar erklärbar)

---

## 6. Kurz-Merksatz (für Kolloquium)

> *Die Anwendung trennt Rendering, Interaktion und Spiellogik strikt. Benutzerinteraktionen werden über Raycasting in semantische IDs übersetzt, die anschließend von der Quizlogik ausgewertet werden.*
