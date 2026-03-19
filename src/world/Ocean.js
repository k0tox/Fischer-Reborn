import * as THREE from 'three';

export class Ocean {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(500, 500, 256, 256);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;

          pos.z += sin(pos.x * 0.1 + time) * 0.5;
          pos.z += cos(pos.y * 0.1 + time) * 0.5;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

        void main() {
          gl_FragColor = vec4(0.0, 0.35, 0.7, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
  }

  update(delta) {
    this.material.uniforms.time.value += delta;
  }
}
