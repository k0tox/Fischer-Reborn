export class FishAI {
  constructor(mesh) {
    this.mesh = mesh;
    this.speed = Math.random() * 2 + 1;
    this.direction = Math.random() * Math.PI * 2;
  }

  update(delta) {
    this.mesh.position.x += Math.cos(this.direction) * this.speed * delta;
    this.mesh.position.z += Math.sin(this.direction) * this.speed * delta;

    if (Math.random() < 0.01) {
      this.direction += (Math.random() - 0.5);
    }
  }
}
