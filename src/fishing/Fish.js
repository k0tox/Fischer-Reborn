import * as THREE from 'three';

export class Fish {
  constructor(scene) {
    const geometry = new THREE.BoxGeometry(0.5, 0.3, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff8844 });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.set(
      (Math.random() - 0.5) * 20,
      -1,
      (Math.random() - 0.5) * 20
    );

    scene.add(this.mesh);

    this.speed = Math.random() * 2 + 1;
    this.direction = Math.random() * Math.PI * 2;
  }

  update(delta) {
    this.mesh.position.x += Math.cos(this.direction) * this.speed * delta;
    this.mesh.position.z += Math.sin(this.direction) * this.speed * delta;

    if (Math.random() < 0.02) {
      this.direction += (Math.random() - 0.5);
    }
  }
}
