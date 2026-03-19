// Engine.js
import * as THREE from 'three';

export class Engine {
  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.updatables = [];

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  add(object) {
    this.scene.add(object);
  }

  register(updateFn) {
    this.updatables.push(updateFn);
  }

  animate() {
    const delta = this.clock.getDelta();

    for (let fn of this.updatables) {
      fn(delta);
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }
}
