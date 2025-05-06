import * as THREE from "three";

const hoveringCubeScene = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  // === === === HANDLERS === === === //

  const createCube = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.red,
    });

    const cube = new THREE.Mesh(geometry, material);

    return cube;
  };

  const cube1 = createCube();

  scene.add(cube1);

  camera.position.z = 5;

  // === === === RENDERER === === === //

  const renderer = new THREE.WebGLRenderer();

  const rotateCube = () => {
    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;
    cube1.rotation.z += 0.01;
  };

  const moveCube = () => {
    cube1.translateX(0.01);
  };

  const mainLoop = () => {
    renderer.render(scene, camera);

    rotateCube();
    // moveCube();
  };

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(mainLoop);

  return renderer.domElement;
};

export default hoveringCubeScene;
