import * as THREE from "three";

const initiateScene = () => {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(THREE.Color.NAMES.lightblue);

  //=== LIGHTS ===//

  const topLight = new THREE.DirectionalLight(0xffffff, 3);
  const farBottomLeftLight = new THREE.DirectionalLight(0xffffff, 1);
  const rearTopRightLight = new THREE.DirectionalLight(0xffffff, 1);

  topLight.position.set(0, 5, 0);
  farBottomLeftLight.position.set(-5, -5, -5);
  rearTopRightLight.position.set(5, 5, 5);
  scene.add(topLight);
  scene.add(farBottomLeftLight);
  scene.add(rearTopRightLight);

  return scene;
};

export default initiateScene;
