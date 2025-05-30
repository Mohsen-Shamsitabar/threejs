import * as THREE from "three";

const initiateCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.z = 2.5;

  return camera;
};

export default initiateCamera;
