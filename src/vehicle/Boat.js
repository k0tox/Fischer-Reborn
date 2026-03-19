import * as THREE from 'three';

export class Boat {
  constructor(scene, camera) {
    this.camera = camera;
    this.speed = 0;

    const geo = new THREE.BoxGeometry(2, 0.5, 4);
    const mat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(0, 0.5, 0);

    scene.add(this.mesh);
  }

  update(input, delta) {
    if (input.isKeyDown("KeyW")) this.speed += 5 * delta;
    if (input.isKeyDown("KeyS")) this.speed -= 5 * delta;

    this.mesh.position.z -= this.speed * delta;

    // follow camera
    this.camera.position.lerp(
      new THREE.Vector3(
        this.mesh.position.x,
        this.mesh.position.y + 2,
        this.mesh.position.z + 5
      ),
      0.1
    );
  }
}
