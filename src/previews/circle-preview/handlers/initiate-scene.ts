import * as THREE from "three";

const initiateScene = () => {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(THREE.Color.NAMES.lightblue);

  return scene;
};

export default initiateScene;
