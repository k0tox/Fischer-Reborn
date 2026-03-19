export class RodStats {
  constructor() {
    this.luck = 1;
    this.speed = 1;
  }

  apply(stats) {
    this.luck = stats.luck;
    this.speed = stats.speed;
  }
}
