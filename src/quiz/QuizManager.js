export class QuizManager {
  constructor(questions, ui) {
    this.questions = questions;
    this.ui = ui;
    this.score = 0;
    this.index = 0;
    this.active = null;
  }

  start() {
    this.score = 0;
    this.index = 0;
    this.next();
  }

  next() {
    if (this.index >= this.questions.length) {
      this.ui.setQuestion(`Fertig! Endstand: ${this.score}/${this.questions.length}`);
      return;
    }
    this.active = this.questions[this.index];
    this.ui.setQuestion(this.active.prompt);
    this.ui.setHud(this.score, this.index + 1, this.questions.length);
  }

  answer(organId) {
    if (!this.active) return;
    if (organId === this.active.correctId) {
      this.score++;
      this.index++;
      this.next();
    }
    this.ui.setHud(this.score, this.index + 1, this.questions.length);
  }
}
