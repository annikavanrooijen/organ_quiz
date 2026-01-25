import { SceneManager } from "./SceneManager.js";
import { CameraManager } from "./CameraManager.js";
import { RendererManager } from "./RendererManager.js";
import { InputManager } from "./InputManager.js";

import { AnatomyScene } from "../anatomy/AnatomyScene.js";
import { QuizManager } from "../quiz/QuizManager.js";
import { questions } from "../quiz/questions.js";
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

    this.anatomy.build();

    this.input.onPick = (hit) => {
      const organId = hit.object.userData?.organId;
      if (organId) this.quiz.answer(organId);
    };

    this.ui.onSkip = () => this.quiz.next();
    this.quiz.start();

    this.rendererManager.setAnimationLoop((dt) => {
      this.anatomy.update(dt);
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
