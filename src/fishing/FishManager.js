import { Fish } from './Fish.js';

export class FishManager {
  constructor(scene, count = 10) {
    this.fish = [];

    for (let i = 0; i < count; i++) {
      this.fish.push(new Fish(scene));
    }
  }

  update(delta) {
    for (let fish of this.fish) {
      fish.update(delta);
    }
  }
}
