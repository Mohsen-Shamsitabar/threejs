import "normalize.css";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import "./style.css";
import { hoveringCubeScene } from "./tutorials/index.ts";

const root = document.getElementById("root");

if (!root) throw new Error("No root element detected!");

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here
  root.appendChild(hoveringCubeScene());
} else {
  const warning = WebGL.getWebGL2ErrorMessage();

  root.appendChild(warning);
}
