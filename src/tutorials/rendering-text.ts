import * as THREE from "three";

const renderingText = () => {
  // === === === SCENE === === === //

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.z = 5;

  // === === === HANDLERS === === === //

  const createTextSprite = (text: string): THREE.Sprite => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    const WIDTH = 200;
    const HEIGHT = 200;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    context.font = "36px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(text, WIDTH / 2, HEIGHT / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });

    const sprite = new THREE.Sprite(material);

    return sprite;
  };

  // to free up memory!
  const removeSprite = (sprite: THREE.Sprite, scene: THREE.Scene) => {
    sprite.geometry.dispose();
    sprite.material.dispose();
    scene.remove(sprite);
  };

  const myText = createTextSprite("hello world");

  myText.position.set(0, 0, 0);

  scene.add(myText);

  // === === === RENDERER === === === //

  const renderer = new THREE.WebGLRenderer();

  const mainLoop = () => {
    renderer.render(scene, camera);
  };

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(mainLoop);

  return renderer.domElement;
};

export default renderingText;
