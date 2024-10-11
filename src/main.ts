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

// Text display setup
const div = document.createElement("div");
div.style.padding = "5px";
div.style.fontSize = "25px";
div.style.position = "absolute";
div.style.top = "32%";
div.style.left = "30%";
div.style.transform = "translate(-50%, -50%)";
document.body.appendChild(div);

let saltNum: number = 0;
let saltGrowthRate: number = 0;
const incrementalValue = 1.15;
const initialX = 70;
const initialY = 40;
const buttonSpacing = 10;

interface Item {
  name: string;
  cost: number;
  growthRate: number;
  purchaseTotal: number;
  button?: HTMLButtonElement;
}

// Main Salt Clicker Button
const SaltClickerButton: Item = {name: "🧂", cost: 0, growthRate: 0, purchaseTotal: 0}
createButton(SaltClickerButton, 1);
if(SaltClickerButton.button) {
  SaltClickerButton.button.style.fontSize = "200px";
  SaltClickerButton.button.style.padding = "1px";
  SaltClickerButton.button.style.width = "300px";
  SaltClickerButton.button.style.left = "30%";
  SaltClickerButton.button.style.top = "55%";
}

// Purchasable Upgrade Buttons
const availableItems: Item[] = [
  { name: "🧂Salt Shakers", cost: 10, growthRate: 0.1, purchaseTotal: 0 },
  { name: "⛏️Pick Axes", cost: 100, growthRate: 2, purchaseTotal: 0 },
  { name: "🪨Salt Mines", cost: 1000, growthRate: 50, purchaseTotal: 0 }
];

// Set up buttons on initial load
availableItems.forEach((item, index) => {
  createButton(item, index);
});

// Functions
function createButton(item: Item, index: number) {
  const button = document.createElement("button");
  styleButton(button, index);

  button.addEventListener("click", () => {
    if (saltNum >= item.cost && item.cost > 0) {
      incrementGrowthRate(item);
    } else {
      manualIncrement();
    }
  });

  item.button = button;
  updateButtonDisplay(item);
  document.body.appendChild(button);
}

function styleButton(button: HTMLButtonElement, index: number) {
  button.style.padding = "3px";
  button.style.width = "500px";
  button.style.fontSize = "30px";
  button.style.position = "absolute";
  button.style.left = `${initialX}%`;
  button.style.top = `${initialY + index * buttonSpacing}%`;
  button.style.transform = "translate(-50%, -50%)";
}

function manualIncrement() {
  saltNum++;
  updateDisplay();
}

function incrementGrowthRate(item: Item) {
  saltNum -= item.cost;
  item.cost *= incrementalValue;
  saltGrowthRate += item.growthRate;
  item.purchaseTotal++;
  updateButtonDisplay(item);
  updateDisplay();
}

function checkButtonStatus(item: Item) {
  if (item.button) {
    item.button.disabled = saltNum < item.cost;
  }
}

function updateButtonDisplay(item: Item) {
  if (item.button && item.growthRate != 0) {
    item.button.textContent = `${item.name}: ${item.purchaseTotal}`;
  }
  else if(item.button) {
    item.button.textContent = `${item.name}`;
  }
}

function updateDisplay() {
  div.innerHTML = `
    ${saltNum.toFixed(0)}: Pounds of Salt<br>
    per second: ${saltGrowthRate.toFixed(1)}
  `;
}

// Main animation loop
let lastTime = 0;
function animate(currentTime: DOMHighResTimeStamp) {
  availableItems.forEach(checkButtonStatus);

  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
  saltNum += deltaTime * saltGrowthRate;

  updateDisplay();
  lastTime = currentTime;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);