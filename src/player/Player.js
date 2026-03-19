import * as THREE from 'three';

export class Player {
  constructor(camera, input) {
    this.camera = camera;
    this.input = input;

    this.velocity = new THREE.Vector3();
    this.speed = 5;
  }

  update(delta) {
    this.velocity.set(0, 0, 0);

    if (this.input.isKeyDown("KeyW")) this.velocity.z -= 1;
    if (this.input.isKeyDown("KeyS")) this.velocity.z += 1;
    if (this.input.isKeyDown("KeyA")) this.velocity.x -= 1;
    if (this.input.isKeyDown("KeyD")) this.velocity.x += 1;

    this.velocity.normalize().multiplyScalar(this.speed * delta);

    this.camera.position.add(this.velocity);
  }
}
