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

// Text display
const div = document.createElement("div");
div.textContent = `${saltNum}:🧂`;
div.style.padding = "5px";
div.style.fontSize = "40px";

div.style.position = "absolute";
div.style.top = "30%";
div.style.left = "50%";
div.style.transform = "translate(-50%, -50%)";

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
  div.textContent = `${saltNum}:🧂`; // Initialize with a fun emoji or label
}

document.body.appendChild(button);
document.body.appendChild(div);
