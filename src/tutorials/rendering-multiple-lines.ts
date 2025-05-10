import * as THREE from "three";

const renderingMultipleLines = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  // === === === HANDLERS === === === //

  const MAX_POINTS = 500;

  // geometry
  const geometry = new THREE.BufferGeometry();

  // attributes
  const positions = new Float32Array(MAX_POINTS * 3); // 3 floats (x, y and z) per point

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // draw range
  const drawCount = 100; // draw the first 2 points, only

  geometry.setDrawRange(0, drawCount);

  // material
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // line
  const line = new THREE.Line(geometry, material);

  scene.add(line);

  // ADDING RANDOM POINTS

  const positionAttribute = line.geometry.getAttribute("position");

  let x = 0,
    y = 0,
    z = 0;

  for (let i = 0; i < positionAttribute.count; i++) {
    positionAttribute.setXYZ(i, x, y, z);

    x += (Math.random() - 0.5) * 30;
    y += (Math.random() - 0.5) * 30;
    z += (Math.random() - 0.5) * 30;
  }

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

export default renderingMultipleLines;
