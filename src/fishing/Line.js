import * as THREE from 'three';

export class Line {
  constructor(scene, rod) {
    this.rod = rod;

    this.points = [];
    this.segmentCount = 20;

    for (let i = 0; i < this.segmentCount; i++) {
      this.points.push(new THREE.Vector3());
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points);

    const material = new THREE.LineBasicMaterial({ color: 0xffffff });

    this.line = new THREE.Line(geometry, material);
    scene.add(this.line);
  }

  update() {
    const start = this.rod.camera.position;
    const end = this.rod.hook;

    for (let i = 0; i < this.points.length; i++) {
      const t = i / (this.points.length - 1);

      const point = this.points[i];
      point.lerpVectors(start, end, t);

      // sag effect
      point.y -= Math.sin(t * Math.PI) * 0.5;
    }

    this.line.geometry.setFromPoints(this.points);
  }
}
