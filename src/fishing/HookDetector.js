export class HookDetector {
  constructor(rod, fishManager) {
    this.rod = rod;
    this.fishManager = fishManager;
  }

  check() {
    for (let fish of this.fishManager.fish) {
      const dist = fish.mesh.position.distanceTo(this.rod.hook);

      if (dist < 1.5) {
        return fish;
      }
    }

    return null;
  }
}
