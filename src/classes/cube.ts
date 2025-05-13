import * as THREE from "three";
import type { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

type CubeProps = {
  cubeGeometry: THREE.BoxGeometry;
  cubeMaterial: THREE.MeshPhongMaterial | THREE.MeshBasicMaterial;
  name?: string;
  gui?: GUI;
  lineMaterial?: THREE.LineBasicMaterial;
};

class Cube {
  public mesh: THREE.Mesh;
  public segments?: THREE.LineSegments;

  constructor(props: CubeProps) {
    const {
      cubeGeometry,
      cubeMaterial,
      name = undefined,
      gui = undefined,
      lineMaterial = undefined,
    } = props;

    const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

    this.mesh = mesh;

    //== SEGMENTS ==//

    if (lineMaterial) {
      const wireframe = new THREE.WireframeGeometry(cubeGeometry);
      const lineSegments = new THREE.LineSegments(wireframe, lineMaterial);

      this.segments = lineSegments;
    } else {
      console.warn(
        "'lineMaterial' is not defined!\n'lineSegments' will not get rendered.",
      );
    }

    //== GUI ==//

    if (gui && name) {
      const cubeFolder = gui.addFolder(name);

      cubeFolder.addColor(cubeMaterial, "color").name("color");
      cubeFolder.add(cubeMaterial, "visible").name("visibility");

      cubeFolder
        .add(mesh.scale, "x")
        .name("scale-x")
        .onChange(newScaleX => {
          if (!this.segments) return;

          this.segments.scale.x = newScaleX;
        });

      cubeFolder
        .add(mesh.scale, "y")
        .name("scale-y")
        .onChange(newScaleY => {
          if (!this.segments) return;

          this.segments.scale.y = newScaleY;
        });

      cubeFolder
        .add(mesh.scale, "z")
        .name("scale-z")
        .onChange(newScaleZ => {
          if (!this.segments) return;

          this.segments.scale.z = newScaleZ;
        });

      cubeFolder.open(false);

      if (lineMaterial) {
        const segmentFolder = gui.addFolder("lineSegment");

        segmentFolder.addColor(lineMaterial, "color").name("color");
        segmentFolder.add(lineMaterial, "visible").name("visibility");

        segmentFolder.open(false);
      }
    } else {
      console.warn(
        "'gui' or/and 'name' are not defined!\n'folder' will not get rendered.",
      );
    }
  }

  public rotateCube(rotationSpeed: number) {
    this.mesh.rotateX(rotationSpeed);
    this.mesh.rotateY(rotationSpeed);

    if (!this.segments) return;

    this.segments.rotateX(rotationSpeed);
    this.segments.rotateY(rotationSpeed);
  }
}

export default Cube;
