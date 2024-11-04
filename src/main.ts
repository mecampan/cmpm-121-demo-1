import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Salt Miner";
document.title = gameName;

// Game Header Text
const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.fontSize = "50px";
header.style.position = "absolute";
header.style.top = "20%";
header.style.left = "30%";
header.style.transform = "translate(-50%, -50%)";
app.append(header);

// Text that shows salt amount and growth rate
const saltNumText = document.createElement("div");
saltNumText.style.padding = "5px";
saltNumText.style.fontSize = "25px";
saltNumText.style.position = "absolute";
saltNumText.style.top = "32%";
saltNumText.style.left = "30%";
saltNumText.style.transform = "translate(-50%, -50%)";
document.body.appendChild(saltNumText);

interface Item {
  name: string;
  emoji: string;
  cost: number;
  growthRate: number;
  purchaseTotal: number;
  description: string;
  button?: HTMLButtonElement;
}

let saltNum: number = 0;
let saltGrowthRate: number = 0;
const GrowthRateMultiplier = 1.15;

// Purchasable Upgrade Buttons
const availableItems: Item[] = [
  {
    name: "🧂Salt Shakers",
    emoji: "🧂",
    cost: 10,
    growthRate: 1,
    purchaseTotal: 0,
    description: "A salt shaker from a restaurant.",
  },
  {
    name: "⛏️Pick Axes",
    emoji: "⛏️",
    cost: 100,
    growthRate: 3,
    purchaseTotal: 0,
    description: "Study tools to help mine for salt.",
  },
  {
    name: "🛁Bath Salts",
    emoji: "🛁",
    cost: 1000,
    growthRate: 50,
    purchaseTotal: 0,
    description: "Don't snort these, please don't.",
  },
  {
    name: "🪨Salt Mines",
    emoji: "🪨",
    cost: 10000,
    growthRate: 500,
    purchaseTotal: 0,
    description: "Every thing is edible in here!",
  },
  {
    name: "🧌Internet Trolls",
    emoji: "🧌",
    cost: 100000,
    growthRate: 3000,
    purchaseTotal: 0,
    description:
      "Clacking away on their keyboards at the speed of sound and collecting the delicious tears of all who dare respond.",
  },
  {
    name: "👨‍🍳Salt Bae",
    emoji: "👨‍🍳",
    cost: 1000000,
    growthRate: 12000,
    purchaseTotal: 0,
    description: "$100000 for a gold encrusted steak is a good deal!",
  },
];

const initialButtonPosX = 70;
const initialButtonPosY = 30;
const buttonSpacing = 10;

function styleButton(button: HTMLButtonElement, index: number) {
  button.style.padding = "3px";
  button.style.width = "500px";
  button.style.fontSize = "30px";
  button.style.position = "absolute";
  button.style.left = `${initialButtonPosX}%`;
  button.style.top = `${initialButtonPosY + index * buttonSpacing}%`;
  button.style.transform = "translate(-50%, -50%)";
}

// Set up buttons on initial load
availableItems.forEach((item, index) => {
  createButton(item, index);
});

function createButton(item: Item, index: number) {
  const button = document.createElement("button");
  button.title = item.description;
  styleButton(button, index);

  button.addEventListener("click", () => {
    // Set up to work with manual button which has no cost, and purchasable upgrade buttons
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

function manualIncrement() {
  saltNum++;
  updateDisplay();
}

function incrementGrowthRate(item: Item) {
  saltNum -= item.cost;
  item.cost *= GrowthRateMultiplier;
  saltGrowthRate += item.growthRate;
  item.purchaseTotal++;
  updateButtonDisplay(item);
  updateDisplay();
}

function updateButtonDisplay(item: Item) {
  if (item.button && item.growthRate != 0) {
    item.button.textContent = `${item.name}: ${item.purchaseTotal} Cost: ${item.cost}`;
  } else if (item.button) {
    item.button.textContent = `${item.name}`;
  }
}

function updateDisplay() {
  saltNumText.innerHTML = `
    ${saltNum.toFixed(0)}: Pounds of Salt<br>
    per second: ${saltGrowthRate.toFixed(1)}
  `;
}

function checkButtonStatus(item: Item) {
  if (item.button) {
    item.button.disabled = saltNum < item.cost;
  }
}

// Main Salt Clicker Button
const SaltClickerButton: Item = {
  name: "🧂",
  emoji: "🧂",
  cost: 0,
  growthRate: 0,
  purchaseTotal: 0,
  description: "Click the salt button to get salt. Easy!",
};

createButton(SaltClickerButton, 1);
if (SaltClickerButton.button) {
  SaltClickerButton.button.style.fontSize = "200px";
  SaltClickerButton.button.style.padding = "1px";
  SaltClickerButton.button.style.width = "300px";
  SaltClickerButton.button.style.left = "30%";
  SaltClickerButton.button.style.top = "55%";
}

interface ItemTracker {
  [emoji: string]: number; // Tracks number of each emoji currently on screen
}

let displayedItemsCount: ItemTracker = {};

function backgroundSaltFall() {
  availableItems.forEach((item) => {
    if (!displayedItemsCount[item.emoji]) {
      displayedItemsCount[item.emoji] = 0;
    }

    // Check if the current number of displayed items is less than the purchaseTotal
    if (displayedItemsCount[item.emoji] < item.purchaseTotal) {
      createFallingImage(item.emoji);
      displayedItemsCount[item.emoji]++;
    }
  });
}

function createFallingImage(emoji: string) {
  const emojiElement = document.createElement("span");
  emojiElement.textContent = emoji;
  emojiElement.style.fontSize = "50px";
  emojiElement.style.position = "absolute";
  emojiElement.style.transform = "translate(-50%, -50%)";
  emojiElement.style.zIndex = "-1";  // Ensures it's in the background

  const horizontalPos = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  emojiElement.style.left = `${horizontalPos}%`;

  document.body.appendChild(emojiElement);
  addFallingToImage(emojiElement, emoji);
}

function addFallingToImage(emojiElement: HTMLElement, emoji: string) {
  let position = -5;
  const fallSpeed = Math.random() * 0.2 + 0.08;

  function fall() {
    position += fallSpeed;
    emojiElement.style.top = `${position}%`;

    if (position < 105) {
      requestAnimationFrame(fall);
    } else {
      emojiElement.remove();
      decrementDisplayCount(emoji);
    }
  }

  fall();
}

function decrementDisplayCount(emoji: string) {
  if (displayedItemsCount[emoji] > 0) {
    displayedItemsCount[emoji]--;
  }
}

// Main Animation Loop
let lastTime = 0;
let timeElapsedSinceLastFall = 0;

function animate(currentTime: DOMHighResTimeStamp) {
  availableItems.forEach(checkButtonStatus);

  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
  saltNum += deltaTime * saltGrowthRate;

  timeElapsedSinceLastFall += deltaTime;
  if (timeElapsedSinceLastFall >= 0.1) {
    backgroundSaltFall();
    timeElapsedSinceLastFall = 0;
  }

  updateDisplay();
  lastTime = currentTime;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
