export class QuizManager {
  constructor(questions, ui) {
    this.questions = questions;
    this.ui = ui;
    this.score = 0;
    this.index = 0;
    this.active = null;
    this.onQuestion = null;
    this.finished = false;
  }

  start() {
    this.score = 0;
    this.index = 0;
    this.finished = false;
    this.loadCurrent();
  }

  loadCurrent() {
    if (this.index >= this.questions.length) {
      this.finished = true;
      this.ui.showEndScreen(this.score);
      return;
    }

    this.active = this.questions[this.index];
    this.ui.setQuestion(this.active.prompt);
    this.ui.setHud(this.score, this.index + 1, this.questions.length);
    this.onQuestion?.(this.active);
  }

  next() {
    if (this.finished) return;
    this.index++;
    this.loadCurrent();
  }

  answer(organId) {
    if (this.finished || !this.active) return;

    // Punkte geben, wenn richtig
    if (organId === this.active.correctId) {
      this.score++;
    }

    // WICHTIG: immer zur nächsten Frage
    this.next();
  }
}
