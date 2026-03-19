export class CatchBar {
  constructor() {
    this.value = 0;
    this.target = Math.random() * 100;
    this.speed = 50;
    this.active = false;
  }

  start() {
    this.value = 0;
    this.target = Math.random() * 100;
    this.active = true;
  }

  update(delta, holding) {
    if (!this.active) return;

    if (holding) {
      this.value += this.speed * delta;
    } else {
      this.value -= this.speed * delta;
    }

    this.value = Math.max(0, Math.min(100, this.value));

    if (Math.abs(this.value - this.target) < 5) {
      this.active = false;
      return true;
    }
  }
}
