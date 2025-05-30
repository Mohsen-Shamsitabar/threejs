import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Circle } from "../../classes/index.ts";
import { initiateCamera, initiateScene } from "./handlers/index.ts";

const circlePreview = () => {
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

  //=== CIRCLE ===//

  const circle = new Circle({
    name: "Circle",
    circleMaterialParameters: {
      side: THREE.DoubleSide,
      color: THREE.Color.NAMES.greenyellow,
    },
    gui,
    lineColor: THREE.Color.NAMES.black,
  });

  scene.add(circle.mesh, circle.lineSegments!);

  // === === === RENDERER === === === //

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;

  const updateResolution = () => {
    const canvas = renderer.domElement;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };

  const mainLoop = () => {
    renderer.render(scene, camera);

    circle.rotateCircle(0.001);

    controls.update();
    updateResolution();
  };

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(mainLoop);
  renderer.domElement.style = "display:block;";

  return renderer.domElement;
};

export default circlePreview;
