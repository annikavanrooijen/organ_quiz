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

    this.input = new InputManager(
      this.rendererManager.getDomElement(),
      this.cameraManager.camera,
      this.sceneManager.scene
    );

    this.anatomy = new AnatomyScene(this.sceneManager.scene);
    this.quiz = new QuizManager(questions, this.ui);
  }

  start() {
    this.rendererManager.attachTo(this.mountEl);
    this.onResize();
    window.addEventListener("resize", () => this.onResize());

    // Controls
    this.controls = new OrbitControls(
      this.cameraManager.camera,
      this.rendererManager.getDomElement()
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enableZoom = true;
    this.controls.enableRotate = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 12;

    this.anatomy.build();

    this.quiz.onQuestion = (q) => {
      this.anatomy.loadOrgan(q.correctId);
    };

    this.input.onPick = (hit) => {
      const organId = hit.object.userData?.organId;
      if (organId) this.quiz.answer(organId);
    };

    this.ui.onSkip = () => this.quiz.next();
    this.quiz.start();

    this.ui.onRestart = () => { location.reload(); };
    this.rendererManager.setAnimationLoop((dt) => {
      this.controls?.update();
      this.rendererManager.render(this.sceneManager.scene, this.cameraManager.camera);
    });
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.cameraManager.setAspect(w / h);
    this.rendererManager.setSize(w, h);
  }
}
