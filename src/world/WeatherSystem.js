export class WeatherSystem {
  constructor() {
    this.state = "clear";
    this.timer = 0;
  }

  update(delta) {
    this.timer -= delta;

    if (this.timer <= 0) {
      const states = ["clear", "rain", "storm"];
      this.state = states[Math.floor(Math.random() * states.length)];
      this.timer = 20 + Math.random() * 20;

      console.log("Weather:", this.state);
    }
  }

  getMultiplier() {
    if (this.state === "storm") return 2;
    if (this.state === "rain") return 1.5;
    return 1;
  }
}
