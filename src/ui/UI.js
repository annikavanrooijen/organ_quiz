export class UI {
  constructor() {
    this.questionEl = document.getElementById("question");
    this.scoreEl = document.getElementById("score");
    this.qindexEl = document.getElementById("qindex");
    this.onSkip = null;
    document.getElementById("skipBtn")
      .addEventListener("click", () => this.onSkip?.());
  }

  setQuestion(text) {
    this.questionEl.textContent = text;
  }

  setHud(score, qIndex, qTotal) {
    this.scoreEl.textContent = score;
    this.qindexEl.textContent = `${qIndex}/${qTotal}`;
  }
}
