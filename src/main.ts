import "normalize.css";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import "./style.css";
import {
  axesHelper,
  hoveringCubeScene,
  renderingLines,
  renderingMultipleLines,
  renderingText,
} from "./tutorials/index.ts";

const root = document.getElementById("root");

if (!root) throw new Error("No root element detected!");

const scenes = {
  HOVERING_CUBE: hoveringCubeScene(),
  RENDERING_TEXT: renderingText(),
  RENDERING_LINES: renderingLines(),
  AXES_HELPER: axesHelper(),
  RENDERING_MULTIPLE_LINES: renderingMultipleLines(),
};

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here
  root.appendChild(scenes.RENDERING_MULTIPLE_LINES);
} else {
  const warning = WebGL.getWebGL2ErrorMessage();

  root.appendChild(warning);
}
