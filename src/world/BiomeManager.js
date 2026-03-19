export class BiomeManager {
  constructor() {
    this.biomes = [
      { name: "Starter", x: 0, z: 0, radius: 30, rarityBoost: 1 },
      { name: "Deep Sea", x: 50, z: 50, radius: 30, rarityBoost: 2 },
      { name: "Mythic Zone", x: -50, z: -50, radius: 30, rarityBoost: 5 }
    ];
  }

  getBiome(playerPos) {
    for (let b of this.biomes) {
      const dx = playerPos.x - b.x;
      const dz = playerPos.z - b.z;

      if (Math.sqrt(dx * dx + dz * dz) < b.radius) {
        return b;
      }
    }
    return this.biomes[0];
  }
}
