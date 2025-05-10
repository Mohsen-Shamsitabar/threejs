import * as THREE from "three";

const renderingLines = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  // === === === HANDLERS === === === //

  // Create a red LineBasicMaterial
  const material = new THREE.LineBasicMaterial({
    color: "red",
  });

  const points: THREE.Vector3[] = [];

  points.push(new THREE.Vector3(-1, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);

  scene.add(line);

  // === === === RENDERER === === === //

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const mainLoop = () => {
    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(mainLoop);

  return renderer.domElement;
};

export default renderingLines;
