import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Salt Score";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const saltScore = document.createElement("div");
app.append(saltScore);
let saltNum: number = 0;
let saltGrowthRate: number = 0;

// Text display
const div = document.createElement("div");
div.textContent = `${saltNum}:🧂`;
div.style.padding = "5px";
div.style.fontSize = "40px";

div.style.position = "absolute";
div.style.top = "30%";
div.style.left = "50%";
div.style.transform = "translate(-50%, -50%)";

// Update display
function updateDisplay() {
    div.textContent = `${saltNum.toFixed(0)}:🧂`;
}

// Button
const button = document.createElement("button");
button.textContent = "🧂";
button.style.padding = "5px";
button.style.fontSize = "40px";

button.style.position = "absolute";
button.style.top = "70%";
button.style.left = "50%";
button.style.transform = "translate(-50%, -50%)";

button.addEventListener("click", incrementCounter);
function incrementCounter() {
    saltNum++;
    updateDisplay(); // Initialize with a fun emoji or label
}

// Purchase Button
const purchaseButton = document.createElement("button");
purchaseButton.disabled = true;
purchaseButton.textContent = "Purchase Auto🧂";
purchaseButton.style.padding = "5px";
purchaseButton.style.fontSize = "25px";

purchaseButton.style.position = "absolute";
purchaseButton.style.top = "50%";
purchaseButton.style.left = "90%";
purchaseButton.style.transform = "translate(-50%, -50%)";

// Event listener
purchaseButton.addEventListener('click', incrementGrowthRate);
function incrementGrowthRate() {
    saltNum -= 10;
    saltGrowthRate++;
}

// Check conditions to enable the button
function checkButtonStatus() {
    purchaseButton.disabled = (saltNum < 10);
}

document.body.appendChild(div);
document.body.appendChild(button);
document.body.appendChild(purchaseButton);

let lastTime = 0;
function animate(currentTime: DOMHighResTimeStamp) {
    checkButtonStatus(); // Reevaluate button state

      // Calculate elapsed time since last frame
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    saltNum += deltaTime * saltGrowthRate; // Accumulates to 1 unit per second

    if (div) {
        updateDisplay();
    }

    lastTime = currentTime;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
