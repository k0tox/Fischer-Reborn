export class Time {
  constructor() {
    this.delta = 0;
    this.elapsed = 0;
  }

  update(delta) {
    this.delta = delta;
    this.elapsed += delta;
  }
}
