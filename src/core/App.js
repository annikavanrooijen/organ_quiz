import { SceneManager } from "./SceneManager.js";
import { CameraManager } from "./CameraManager.js";
import { RendererManager } from "./RendererManager.js";
import { InputManager } from "./InputManager.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { AnatomyScene } from "../anatomy/AnatomyScene.js";
import { QuizManager } from "../quiz/QuizManager.js";
import { questions } from "../quiz/Questions.js";
import { UI } from "../ui/UI.js";

export class App {
  constructor(mountEl) {
    this.mountEl = mountEl;

    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager();
    this.rendererManager = new RendererManager();
    this.ui = new UI();
    this.anatomy = new AnatomyScene(this.sceneManager.scene);
    this.quiz = new QuizManager(questions, this.ui);
    this.input = new InputManager(
      this.rendererManager.getDomElement(),
      this.cameraManager.camera,
      this.sceneManager.scene
    );
  }

  /* -------------------- Start -------------------- */
  start() {
    this._initRenderer();
    this._initResizeHandling();
    this._initControls();
    this._buildScene();
    this._wireQuizToAnatomy();
    this._wirePickingToQuiz();
    this._wireUI();
    this._startGameLoop();
  }

  /* -------------------- Initialisierungsfunktionen -------------------- */

  // Initialisiert den Renderer und hängt ihn ans Objekt an
  _initRenderer() {
    this.rendererManager.attachTo(this.mountEl);
    this.onResize();
  }

  // Initialisiert das Resize-Handling
  _initResizeHandling() {
    window.addEventListener("resize", this._onResize);
  }

  // Initialisiert die OrbitControls für die Kamera
  _initControls() {
    const controls = new OrbitControls(
      this.cameraManager.camera,
      this.rendererManager.getDomElement()
    );
    this.controls = controls;

    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 12;
  }

  // Baut die Szene auf (Platzhalter für zukünftige Initialisierung)
  _buildScene() {
    this.anatomy.build();
  }

  /* -------------------- Spiel-Logik -------------------- */

  // Verknüpft Quiz-Manager mit Anatomie-Szene
  _wireQuizToAnatomy() {
    this.quiz.onQuestion = async (q) => {
      // Organ nur laden wenn Kategorie wechselt
      if (this.anatomy.currentOrganId !== q.organId) {
        await this.anatomy.loadOrgan(q.organId);
      }
      // Target-Kugel immer neu setzen
      this.anatomy.showTarget(q.organId, q.targetId);
    };
  }

  // Verknüpft Input-Manager mit Quiz-Manager
  _wirePickingToQuiz() {
    this.input.onPick = (hit) => {
      const { organId, targetId } = hit?.object?.userData || {};
      if (!targetId) return;
      this.quiz.answer({ organId, targetId });
    };
  }

  // Verknüpft UI-Elemente mit Quiz-Manager
  _wireUI() {
    this.ui.onSkip = () => this.quiz.next();
    this.ui.onRestart = () => location.reload();

    this.quiz.start();
  }

  // Startet die Haupt-Game-Loop
  _startGameLoop() {
    this.rendererManager.setAnimationLoop(() => {
      this.controls?.update();
      this.rendererManager.render(
        this.sceneManager.scene,
        this.cameraManager.camera
      );
    });
  }

  /* -------------------- Resize -------------------- */

  // Resize-Handler
  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.cameraManager.setAspect(w / h);
    this.rendererManager.setSize(w, h);
  }
}
