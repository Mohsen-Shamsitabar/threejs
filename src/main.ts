import "normalize.css";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import { circlePreview } from "./previews/index.ts";
import "./style.css";

const root = document.getElementById("root");

if (!root) throw new Error("No root element detected!");

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here

  root.appendChild(circlePreview());
} else {
  const warning = WebGL.getWebGL2ErrorMessage();

  root.appendChild(warning);
}
