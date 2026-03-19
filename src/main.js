import { Engine } from './core/Engine.js';
import { Input } from './core/Input.js';
import { Time } from './core/Time.js';
import { MouseLook } from './core/MouseLook.js';

import { Ocean } from './world/Ocean.js';
import { Sky } from './world/Sky.js';

import { Player } from './player/Player.js';
import { CameraController } from './player/CameraController.js';

import { Rod } from './fishing/Rod.js';
import { Line } from './fishing/Line.js';
import { FishManager } from './fishing/FishManager.js';
import { HookDetector } from './fishing/HookDetector.js';
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

// Player + camera
const player = new Player(engine.camera, input);
const mouseLook = new MouseLook(engine.camera);
const cameraController = new CameraController(player, mouseLook);

// Fishing
const rod = new Rod(engine.camera);
const line = new Line(engine.scene, rod);
const fishManager = new FishManager(engine.scene, 15);
const hookDetector = new HookDetector(rod, fishManager);
const catchSystem = new CatchSystem();

// UI
const hud = new HUD();
const inventory = new InventoryUI();

// Loop
engine.register((delta) => {
  time.update(delta);

  ocean.update(delta);
  sky.update(delta);

  cameraController.update(delta);

  rod.update(delta);
  line.update();

  fishManager.update(delta);
  catchSystem.update(delta);

  // CAST
  if (input.mouse.down) {
    rod.cast();
    catchSystem.cast();
  }

  // CHECK HOOK
  const fish = hookDetector.check();
  if (fish && catchSystem.state === "waiting") {
    catchSystem.state = "bite";
    hud.setText("BITE! Press SPACE!");
  }

  // REEL
  if (input.isKeyDown("Space")) {
    const caught = catchSystem.reel();
    if (caught) {
      inventory.add(caught);
      hud.setText(`Caught: ${caught.name}`);
    }
  }
});
