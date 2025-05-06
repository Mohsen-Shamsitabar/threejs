import "normalize.css";
import "./style.css";
import { hoveringCubeScene } from "./tutorials/index.ts";

const root = document.getElementById("root");

if (!root) throw new Error("No root element detected!");

root.appendChild(hoveringCubeScene());
