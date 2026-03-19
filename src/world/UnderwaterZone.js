export class UnderwaterZone {
  constructor(camera) {
    this.camera = camera;
    this.isUnderwater = false;
  }

  update() {
    if (this.camera.position.y < 0) {
      if (!this.isUnderwater) {
        document.body.style.filter = "blue(0.5)";
        this.isUnderwater = true;
      }
    } else {
      if (this.isUnderwater) {
        document.body.style.filter = "none";
        this.isUnderwater = false;
      }
    }
  }
}
