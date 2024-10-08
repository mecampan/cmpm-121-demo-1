import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Please work, please change the name without issues thank you very much";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
