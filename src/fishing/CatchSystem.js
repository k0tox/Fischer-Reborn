export class CatchSystem {
  constructor() {
    this.state = "idle";
    this.timer = 0;
  }

  cast() {
    if (this.state !== "idle") return;

    this.state = "waiting";
    this.timer = Math.random() * 5 + 2;
  }

  update(delta) {
    if (this.state === "waiting") {
      this.timer -= delta;

      if (this.timer <= 0) {
        this.state = "bite";
        console.log("Fish bite!");
      }
    }
  }

  reel() {
    if (this.state === "bite") {
      this.state = "idle";
      return this.generateFish();
    }
  }

  generateFish() {
    const table = [
      { name: "Common Fish", rarity: 0.7 },
      { name: "Rare Fish", rarity: 0.25 },
      { name: "Legendary Fish", rarity: 0.05 }
    ];

    let roll = Math.random();
    let sum = 0;

    for (let fish of table) {
      sum += fish.rarity;
      if (roll <= sum) return fish;
    }
  }
}
