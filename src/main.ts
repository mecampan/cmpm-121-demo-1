import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Salt Score";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🧂";
button.style.padding = "5px";
button.style.fontSize = "40px";

// Position the button
button.style.position = "absolute";
button.style.top = "70%";
button.style.left = "50%";
button.style.transform = "translate(-50%, -50%)"; // Center the button using transform

document.body.appendChild(button);
