import * as THREE from 'three';

export class Island {
  constructor(scene, x, z) {
    const geo = new THREE.CylinderGeometry(5, 10, 3, 16);
    const mat = new THREE.MeshStandardMaterial({ color: 0x228B22 });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(x, 1.5, z);

    scene.add(this.mesh);
  }
}
