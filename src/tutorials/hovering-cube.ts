import * as THREE from "three";

const hoveringCubeScene = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.z = 5;

  // === === === HANDLERS === === === //

  const light = new THREE.DirectionalLight(0xffffff, 3);

  light.position.set(-1, 2, 4);
  scene.add(light);

  //===

  // light has no effect on `MeshBasicMaterial`.
  // instead we use `MeshPhongMaterial`
  const material1 = new THREE.MeshPhongMaterial({
    color: THREE.Color.NAMES.burlywood,
  });

  const material2 = new THREE.MeshPhongMaterial({
    color: THREE.Color.NAMES.darkorchid,
  });

  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const cube1 = new THREE.Mesh(geometry, material1);
  const cube2 = new THREE.Mesh(geometry, material2);

  cube1.position.x = 2;
  cube2.position.x = -2;

  scene.add(cube1);
  scene.add(cube2);

  // === === === RENDERER === === === //

  const renderer = new THREE.WebGLRenderer();

  const rotateCube = (cube: THREE.Mesh, reverse = false) => {
    if (reverse) {
      cube.rotation.x -= 0.01;
      cube.rotation.y -= 0.01;
      cube.rotation.z -= 0.01;
      return;
    }

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  };

  const _moveCube = () => {
    cube1.translateX(0.01);
  };

  const updateResolution = () => {
    const canvas = renderer.domElement;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };

  function _resizeRendererToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
      const canvas = renderer.domElement;

      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
  }

  const mainLoop = () => {
    renderer.render(scene, camera);

    updateResolution();
    // resizeRendererToDisplaySize();

    rotateCube(cube1);
    rotateCube(cube2, true);
    // moveCube();
  };

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(mainLoop);
  renderer.domElement.style = "width:100%; height:100%; display:block;";

  return renderer.domElement;
};

export default hoveringCubeScene;
