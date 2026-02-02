# ORGANZ_QUIZ

Techstack:
- JavaScript
- WebGL / Three.js
- glTF Modelle
- HTML/CSS

Projektstruktur: 

ORGAN_QUIZ

assets
images
- welcome_page.png
models
- brain (glTF)
- heart (glTF)
- intestine (glTF)
- lungs (glTF)

src
anatomy
AnatomyScene.js - Modelle laden, Licht, Positionen
AnnotationsManager.js - Beschriftung/Labels der Organe
OrganConfig.js - Metadaten der Organe (Name + Position)
core
App.js - Starten der App
CameraManager.js - Kamera bewegen/zoomen
InputManager.js - Managed Spielerinnen Input 
RendererManager.js - Three.js Renderer
SceneManager.js - Szenenverwaltun
quiz
OrgansCatalog.js - Liste der Organe
Questions.js - Fragenpool
QuizManager.js - QuizLogig
ui
UI.js - Buttons, Menü 
main.js - Einstiegspunkt der gesamten App
index.html - Webseite
style.css - Design

Ziel: 

Welcome-Page:
[] Begrüßung 
[] Start Button
[] Spiel startet sobald der Button gedrückt wird

Quiz-Logik:
[] "Clicke-Auf" Fragen - 2 Versuche
[] Wenn 2 Versuche ausgeschöpft, dann erscheint ein Kreis der gesuchten Struktur
[] Richtige Struktur gefunden - Multiple Choice Frage, dann nächste Struktur
[] 1 Punkt pro Frage
[] Überspringen möglich

Herz:
Frage 1: 
[] Annotation auf Aortenbogen

Bugs:
[] Counter zählt weiter obwohl alle Fragen beantwortet wurden