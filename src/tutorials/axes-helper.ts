import * as THREE from "three";

const axesHelpers = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // === === === HANDLERS === === === //

  const axesHelper = new THREE.AxesHelper(2);

  scene.add(axesHelper);

  // === === === RENDERER === === === //

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); // Make sure it's added to the DOM

  const mainLoop = () => {
    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(mainLoop);

  return renderer.domElement;
};

export default axesHelpers;
