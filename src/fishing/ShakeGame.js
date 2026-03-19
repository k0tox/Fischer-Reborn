export class ShakeGame {
  constructor() {
    this.progress = 0;
    this.active = false;

    window.addEventListener("mousedown", () => {
      if (this.active) {
        this.progress += 10;
      }
    });
  }

  start() {
    this.progress = 0;
    this.active = true;
  }

  update() {
    if (!this.active) return;

    this.progress -= 0.2;

    if (this.progress >= 100) {
      this.active = false;
      return true; // success
    }

    if (this.progress <= 0) {
      this.active = false;
      return false; // fail
    }
  }
}
