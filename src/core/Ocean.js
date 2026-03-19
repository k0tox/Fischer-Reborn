// Ocean.js
import * as THREE from 'three';

export function createOcean() {
  const geometry = new THREE.PlaneGeometry(500, 500, 256, 256);

  const material = new THREE.ShaderMaterial({
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
        gl_FragColor = vec4(0.0, 0.3, 0.6, 1.0);
      }
    `
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;

  return { mesh, material };
}
