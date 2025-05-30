import * as THREE from "three";
import type { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

type circleGeometryParameters = {
  radius?: number;
  segmentCount?: number;
  thetaStart?: number;
  thetaLength?: number;
};

type CircleProps = {
  circleGeometryParameters?: circleGeometryParameters;
  circleMaterialParameters?:
    | THREE.MeshPhongMaterialParameters
    | THREE.MeshBasicMaterialParameters;
  name?: string;
  gui?: GUI;
  lineColor?: THREE.ColorRepresentation;
};

class Circle {
  public mesh: THREE.Mesh;
  public segmentCount: number;
  public radius: number;
  public thetaStart: number;
  public thetaLength: number;
  public geometry: THREE.CircleGeometry;
  public material: THREE.MeshPhongMaterial | THREE.MeshBasicMaterial;
  public lineMaterial?: THREE.LineBasicMaterial;
  public lineSegments?: THREE.LineSegments;

  constructor(props: CircleProps) {
    const {
      circleGeometryParameters = {},
      circleMaterialParameters = {},
      name = undefined,
      gui = undefined,
      lineColor = undefined,
    } = props;

    const {
      radius = 1,
      segmentCount = 4,
      thetaLength = Math.PI * 2.0,
      thetaStart = Math.PI * 2.0,
    } = circleGeometryParameters;

    const geometry = new THREE.CircleGeometry(
      radius,
      segmentCount,
      thetaStart,
      thetaLength,
    );

    const material = new THREE.MeshBasicMaterial(circleMaterialParameters);

    this.radius = radius;
    this.segmentCount = segmentCount;
    this.thetaLength = thetaLength;
    this.thetaStart = thetaStart;

    this.geometry = geometry;
    this.material = material;

    //== MESH ==//

    const mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh = mesh;

    //== SEGMENTS ==//

    if (lineColor !== undefined) this.createLineSegments(lineColor);

    //== GUI ==//

    if (gui && name) {
      const circleFolder = gui.addFolder(name);

      circleFolder.addColor(this.material, "color").name("color");
      circleFolder.add(this.material, "visible").name("visibility");

      circleFolder
        .add(this.mesh.scale, "x")
        .name("scale-x")
        .onChange(newScaleX => {
          if (!this.lineSegments) return;

          this.lineSegments.scale.x = newScaleX;
        });

      circleFolder
        .add(this.mesh.scale, "y")
        .name("scale-y")
        .onChange(newScaleY => {
          if (!this.lineSegments) return;

          this.lineSegments.scale.y = newScaleY;
        });

      circleFolder
        .add(this as Circle, "radius")
        .name("radius")
        .onChange(newRadius => {
          this.updateCircleGeometry(newRadius);
        });

      circleFolder.open(false);

      if (this.lineMaterial) {
        const segmentFolder = gui.addFolder("lineSegment");

        segmentFolder.addColor(this.lineMaterial, "color").name("color");
        segmentFolder.add(this.lineMaterial, "visible").name("visibility");

        segmentFolder.open(false);
      }
    } else {
      console.warn(
        "'gui' or/and 'name' are not defined!\n'folder' will not get rendered.",
      );
    }
  }

  public rotateCircle(rotationSpeed: number) {
    this.mesh.rotateX(rotationSpeed);
    this.mesh.rotateY(rotationSpeed);

    if (!this.lineSegments) return;

    this.lineSegments.rotateX(rotationSpeed);
    this.lineSegments.rotateY(rotationSpeed);
  }

  public updateCircleGeometry(
    newRadius?: number,
    newSegmentCount?: number,
    newThetaStart?: number,
    newThetaLength?: number,
  ) {
    this.radius = newRadius ?? this.radius;
    this.segmentCount = newSegmentCount ?? this.segmentCount;
    this.thetaStart = newThetaStart ?? this.thetaStart;
    this.thetaLength = newThetaLength ?? this.thetaLength;

    const newGeometry = new THREE.CircleGeometry(
      this.radius,
      this.segmentCount,
      this.thetaStart,
      this.thetaLength,
    );

    this.geometry = newGeometry;

    this.mesh.geometry.dispose();
    this.mesh.geometry = newGeometry;

    if (this.lineMaterial) this.createLineSegments(this.lineMaterial.color);
  }

  public createLineSegments(color: THREE.ColorRepresentation) {
    const newLineMaterial = new THREE.LineBasicMaterial({
      color,
    });

    // if (this.lineSegments) dispose

    this.lineMaterial = newLineMaterial;

    const wireframe = new THREE.WireframeGeometry(this.geometry);
    const lineSegments = new THREE.LineSegments(wireframe, this.lineMaterial);

    this.lineSegments = lineSegments;
  }
}

export default Circle;
