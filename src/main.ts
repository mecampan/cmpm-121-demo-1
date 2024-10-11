import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Salt Miner";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.fontSize = "50px";
header.style.position = "absolute";
header.style.top = "20%";
header.style.left = "30%";
header.style.transform = "translate(-50%, -50%)";
app.append(header);

// Text display
const div = document.createElement("div");
div.style.padding = "5px";
div.style.fontSize = "25px";
div.style.position = "absolute";
div.style.top = "32%";
div.style.left = "30%";
div.style.transform = "translate(-50%, -50%)";

// Update display
function updateDisplay() {
  if (div) {
    div.innerHTML = `
          ${saltNum.toFixed(0)}: Pounds of Salt<br>
          per second: ${saltGrowthRate.toFixed(1)}
      `;
  }
}

document.body.appendChild(div);

function createButton(
  name: string,
  initialX: number,
  initialY: number,
  cost: number,
  growthRate: number,
) {
  let purchaseTotal = 0;
  const incrementalValue = 1.15;

  const button = document.createElement("button");
  updateButtonDisplay();
  button.style.padding = "3px";
  button.style.width = "500px";
  button.style.fontSize = "30px";
  button.style.position = "absolute";
  button.style.left = `${initialX}%`;
  button.style.top = `${initialY}%`;
  button.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    if (cost > 0) {
      incrementGrowthRate();
    } else {
      manualIncrement();
    }
  });

  function manualIncrement() {
    saltNum++;
    updateDisplay();
  }

  function incrementGrowthRate() {
    if (saltNum >= cost) {
      saltNum -= cost;
      cost *= incrementalValue;
      saltGrowthRate += growthRate;
      purchaseTotal++;
      updateButtonDisplay();
      updateDisplay();
    }
  }

  function checkButtonStatus() {
    button.disabled = saltNum < cost;
  }

  function updateButtonDisplay() {
    if (cost > 0) {
      button.textContent = `${name}: ${purchaseTotal}`; // Update button text
    } else {
      button.textContent = name;
    }
  }

  return { name, growthRate, button, checkButtonStatus };
}

let saltNum: number = 0;
let saltGrowthRate: number = 0;

const manualButton = createButton("🧂", 30, 60, 0, 0);
manualButton.button.style.fontSize = "200px";
manualButton.button.style.padding = "1px";
manualButton.button.style.width = "300px";
const autoButtonA = createButton("🧂Salt Shakers", 70, 40, 10, 0.1);
const autoButtonB = createButton("⛏️Pick Axes", 70, 50, 100, 2);
const autoButtonC = createButton("🪨Salt Mines", 70, 60, 1000, 50);

const buttonArray = [manualButton, autoButtonA, autoButtonB, autoButtonC];

let lastTime = 0;
function animate(currentTime: DOMHighResTimeStamp) {
  // Add buttons to the document and set initial positions
  buttonArray.forEach((buttonInstance) => {
    buttonInstance.checkButtonStatus();
  });

  // Calculate elapsed time since last frame
  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
  saltNum += deltaTime * saltGrowthRate;

  if (div) {
    updateDisplay();
  }

  lastTime = currentTime;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
