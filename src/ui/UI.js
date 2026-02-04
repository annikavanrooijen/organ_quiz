export class UI {
  constructor() {
    this.questionEl = document.getElementById("question");
    this.scoreEl = document.getElementById("score");
    this.qindexEl = document.getElementById("qindex");
    this.gameUIEl = document.getElementById("gameUI");
    this.endScreenEl = document.getElementById("endScreen");
    this.finalScoreEl = document.getElementById("finalScore");
    this.onSkip = null;
    this.onRestart = null;

    document.getElementById("skipBtn")
      .addEventListener("click", () => this.onSkip?.());

    const restartBtn = document.getElementById("restartBtn");
    restartBtn?.addEventListener("click", () => this.onRestart?.());
  }

  // Setter-Methode: setzt die Frage im UI
  setQuestion(text) {
    this.questionEl.textContent = text;
  }

  // Setter-Methode: aktualisiert die Anzeige von Punktestand und Frageindex
  setHud(score, qIndex, qTotal) {
    this.scoreEl.textContent = score;
    this.qindexEl.textContent = `${qIndex}/${qTotal}`;
  }

  // Zeigt den Endbildschirm mit der finalen Punktzahl an
  showEndScreen(score) {
    console.log("UI.showEndScreen called with score:", score);
    console.log("endScreenEl:", this.endScreenEl);

    if (!this.endScreenEl) {
      console.error("Missing #endScreen in HTML!");
      return;
    }

    if (this.gameUIEl) this.gameUIEl.style.display = "none";
    this.endScreenEl.style.display = "flex";

    if (this.finalScoreEl) this.finalScoreEl.textContent = score;
  }
}
