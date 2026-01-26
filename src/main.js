import { App } from "./core/App.js";
const app = new App(document.body);
app.start();
const welcome = document.getElementById("welcome");
const gameUI = document.getElementById("gameUI");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  welcome.style.display = "none";
  gameUI.style.display = "block";
  startGame(); // das muss es geben (oder du nennst es anders)
});

function startGame(){
  // HIER kommt dein bisheriger Startcode rein:
  // Szene erstellen, Renderer, animate(), Fragen initialisieren usw.
}
