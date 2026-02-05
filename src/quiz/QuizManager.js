// Verwaltet den Quiz-Ablauf: Starten, Beantworten von Fragen, Fortschritt und Punktestand

export class QuizManager {
  constructor(questions, ui) {
    this.questions = questions;
    this.ui = ui;
    this.score = 0;
    this.index = 0;
    this.active = null;
    this.finished = false;
    this.onQuestion = null;
  }

  start() {
    this._resetState();
    this._loadCurrent();
  }

  next() {
    if (this._isFinished()) 
      return;
    this.index++;
    this._loadCurrent();
  }

  answer(pick) {
    if (this._isFinished() || !this.active) 
      return;

    if (this._isCorrectPick(pick, this.active)) {
      this._incrementScore();
    }

    this.next();
  }

  /* -------------------- Hilfsfunktionen -------------------- */

  // Setzt den Quiz-Manager in den Anfangszustand zurück
  _resetState() {
    this.score = 0;
    this.index = 0;
    this.active = null;
    this.finished = false;
  }

  // Lädt die aktuelle Frage, aktualisiert die UI und löst das onQuestion-Event aus
  _loadCurrent() {
    if (this._reachedEnd()) {
      this._finish();
      return;
    }

    this.active = this.questions[this.index];
    this._updateUIForActiveQuestion();
    this._emitQuestion();
  }

  // Aktualisiert die UI mit der aktuellen Frage und dem aktuellen Punktestand
  _updateUIForActiveQuestion() {
    const q = this.active;
    this.ui.setQuestion(q.prompt);
    this.ui.setHud(this.score, this.index + 1, this.questions.length);
  }

  // Löst das onQuestion-Event mit der aktuellen Frage aus
  _emitQuestion() {
    this.onQuestion?.(this.active);
  }

  // Überprüft, ob das Ende der Fragenliste erreicht wurde
  _reachedEnd() {
    return this.index >= this.questions.length;
  }

  // Markiert den Quiz als beendet und zeigt den Endbildschirm mit der finalen Punktzahl an
  _finish() {
    this.finished = true;
    this.ui.showEndScreen(this.score);
  }

  // Überprüft, ob der Quiz bereits als beendet markiert ist
  _isFinished() {
    return this.finished === true;
  }

  // Überprüft, ob die getroffene Auswahl mit der aktuellen Frage übereinstimmt
  _isCorrectPick(pick, question) {
    return (
      pick?.organId === question.organId &&
      pick?.targetId === question.targetId
    );
  }

  // Erhöht den Punktestand um 1
  _incrementScore() {
    this.score++;
  }
}
