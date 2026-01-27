import { App } from "./core/App.js";

const welcome = document.getElementById("welcome");
const gameUI = document.getElementById("gameUI");
const startBtn = document.getElementById("startBtn");
const app = new App(document.getElementById("app"));


startBtn.addEventListener("click", () => {
  welcome.style.display = "none";
  gameUI.style.display = "block";
  app.start(); 
});
