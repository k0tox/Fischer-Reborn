import { Island } from './Island.js';

export class IslandManager {
  constructor(scene) {
    this.islands = [
      new Island(scene, 20, 20),
      new Island(scene, -30, 10),
      new Island(scene, 10, -40)
    ];
  }
}
