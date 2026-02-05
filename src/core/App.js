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
    this.input = new InputManager(this.rendererManager.getDomElement(), this.cameraManager.camera, this.sceneManager.scene);
    this._onResize = this.onResize.bind(this);
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

  /* -------------------- Initialisierung -------------------- */

  _initRenderer() {
    this.rendererManager.attachTo(this.mountEl);
    this.onResize();
  }

  _initResizeHandling() {
    window.addEventListener("resize", this._onResize);
  }

  _initControls() {
    const controls = new OrbitControls(this.cameraManager.camera,this.rendererManager.getDomElement());
    this.controls = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 12;
  }

  _buildScene() {
    this.anatomy.build();
  }

  /* -------------------- Spiel-Logik -------------------- */

  // verknüpft Quiz-Ereignisse mit dem Anatomie-Szene-Manager
  _wireQuizToAnatomy() {
    const self = this;

    this.quiz.onQuestion = async function (q) {
      if (self.anatomy.currentOrganId !== q.organId) {
        await self.anatomy.loadOrgan(q.organId);
      }
      self.anatomy.showTarget(q.organId, q.targetId);
      self.ui.showInfo(q.title, q.info);
    };
  }


  // verknüpft die Eingabe-Ereignisse mit dem Quiz-Manager
  _wirePickingToQuiz() {
  const self = this;

  this.input.onPick = function (hit) {
    const data = hit && hit.object && hit.object.userData;
    if (!data || !data.targetId) return;

    self.quiz.answer({ organId: data.organId, targetId: data.targetId });

    // optional: beim Klicken ausblenden
    // self.ui.hideInfo();
  };
}


  // verknüpft die UI-Elemente mit dem Quiz-Manager
  _wireUI() {
    const self = this;
    this.ui.onSkip = function () {self.quiz.next();};
    this.ui.onRestart = function () {location.reload();};
    this.quiz.start();
  }

  /* -------------------- Game Loop -------------------- */

  // startet die Quizschleife
  _startGameLoop() {
    const self = this;

    this.rendererManager.setAnimationLoop(function () {
      if (self.controls) self.controls.update();
      self.rendererManager.render(self.sceneManager.scene,self.cameraManager.camera);
    });
  }

  /* -------------------- Resize -------------------- */

  // behandelt Fenstergrößenänderungen
  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.cameraManager.setAspect(w / h);
    this.rendererManager.setSize(w, h);
  }
}
