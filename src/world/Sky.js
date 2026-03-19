import * as THREE from 'three';

export class Sky {
  constructor(scene) {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Sun light
    this.sun = new THREE.DirectionalLight(0xffffff, 1);
    this.sun.position.set(50, 100, 50);

    this.sun.castShadow = true;
    scene.add(this.sun);
  }

  update(delta) {
    // subtle sun movement
    this.sun.position.x = Math.sin(Date.now() * 0.0001) * 50;
  }
}
