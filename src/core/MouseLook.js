import * as THREE from 'three';

export class MouseLook {
  constructor(camera) {
    this.camera = camera;

    this.rotation = {
      x: 0,
      y: 0
    };

    this.sensitivity = 0.002;

    document.body.addEventListener("click", () => {
      document.body.requestPointerLock();
    });

    document.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement !== document.body) return;

      this.rotation.y -= e.movementX * this.sensitivity;
      this.rotation.x -= e.movementY * this.sensitivity;

      this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
    });
  }

  update() {
    this.camera.rotation.set(this.rotation.x, this.rotation.y, 0);
  }
}
