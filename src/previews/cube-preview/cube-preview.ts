import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Cube } from "../../classes/index.ts";
import { initiateCamera, initiateScene } from "./handlers/index.ts";

const cubePreview = () => {
  // === === === CAMERA === === === //

  const camera = initiateCamera();

  // === === === SCENE === === === //

  const scene = initiateScene();

  //=== GUI ===//

  const gui = new GUI();

  gui.open(false);

  const sceneFolder = gui.addFolder("Scene");

  sceneFolder.addColor(scene, "background").name("Background color");
  sceneFolder.open(false);

  //=== CUBE ===//
  const lineMaterial = new THREE.LineBasicMaterial({
    color: THREE.Color.NAMES.black,
  });

  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: THREE.Color.NAMES.lawngreen,
  });

  const SEGMENT_COUNT = 1;

  const cubeGeometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    SEGMENT_COUNT,
    SEGMENT_COUNT,
    SEGMENT_COUNT,
  );

  const cube = new Cube({
    name: "Cube",
    cubeGeometry,
    cubeMaterial,
    gui,
    lineMaterial,
  });

  scene.add(cube.mesh, cube.segments!);

  // === === === RENDERER === === === //

  const renderer = new THREE.WebGLRenderer();

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;

  const updateResolution = () => {
    const canvas = renderer.domElement;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };

  const mainLoop = () => {
    renderer.render(scene, camera);

    cube.rotateCube(0.001);

    controls.update();
    updateResolution();
  };

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(mainLoop);
  renderer.domElement.style = "display:block;";

  return renderer.domElement;
};

export default cubePreview;
