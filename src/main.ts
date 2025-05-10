import "normalize.css";
import "./style.css";
import { hoveringCubeScene, renderingText } from "./tutorials/index.ts";

const root = document.getElementById("root");

if (!root) throw new Error("No root element detected!");

const scenes = {
  HOVERING_CUBE: hoveringCubeScene(),
  RENDERING_TEXT: renderingText(),
};

root.appendChild(scenes.RENDERING_TEXT);
