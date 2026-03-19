import { Engine } from './core/Engine.js';
import { Input } from './core/Input.js';
import { Time } from './core/Time.js';

import { Ocean } from './world/Ocean.js';
import { Sky } from './world/Sky.js';

import { Player } from './player/Player.js';

import { CatchSystem } from './fishing/CatchSystem.js';

import { HUD } from './ui/HUD.js';
import { InventoryUI } from './ui/InventoryUI.js';

const engine = new Engine();
const input = new Input();
const time = new Time();

// World
const ocean = new Ocean();
engine.add(ocean.mesh);

const sky = new Sky(engine.scene);

// Player
const player = new Player(engine.camera, input);

// Fishing
const catchSystem = new CatchSystem();

// UI
const hud = new HUD();
const inventory = new InventoryUI();

// Update loop
engine.register((delta) => {
  time.update(delta);

  ocean.update(delta);
  sky.update(delta);
  player.update(delta);
  catchSystem.update(delta);

  if (input.mouse.down) {
    catchSystem.cast();
  }

  if (input.isKeyDown("Space")) {
    const fish = catchSystem.reel();
    if (fish) {
      inventory.add(fish);
      hud.setText(`Caught: ${fish.name}`);
    }
  }
});
