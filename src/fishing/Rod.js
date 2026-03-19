import * as THREE from 'three';

export class Rod {
  constructor(camera) {
    this.camera = camera;

    this.tip = new THREE.Vector3();
    this.hook = new THREE.Vector3();

    this.velocity = new THREE.Vector3();
    this.isCasting = false;
  }

  cast() {
    if (this.isCasting) return;

    this.isCasting = true;

    this.tip.copy(this.camera.position);

    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);

    this.velocity.copy(direction.multiplyScalar(15));
    this.velocity.y += 5;

    this.hook.copy(this.tip);
  }

  update(delta) {
    if (!this.isCasting) return;

    // gravity
    this.velocity.y -= 9.8 * delta;

    this.hook.addScaledVector(this.velocity, delta);

    // water hit
    if (this.hook.y <= 0) {
      this.hook.y = 0;
      this.velocity.set(0, 0, 0);
      this.isCasting = false;
    }
  }
}
