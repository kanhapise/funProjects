const rulesButton = document.getElementById("rules-btn");
const closeButton = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const color = getComputedStyle(document.documentElement).getPropertyValue(
  "--button-color"
);
const secondaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--sidebar-color");
let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;

const heightRatio = 0.75;
canvas.height = canvas.width * heightRatio;
ctx.canvas.width = 800;
ctx.canvas.height = ctx.canvas.width * heightRatio;


// Event Listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
rulesButton.addEventListener("click", () => rules.classList.add("show"));
closeButton.addEventListener("click", () => rules.classList.remove("show"));

