import { Engine } from './core/Engine.js';
import { Input } from './core/Input.js';
import { Time } from './core/Time.js';
import { MouseLook } from './core/MouseLook.js';

import { Ocean } from './world/Ocean.js';
import { Sky } from './world/Sky.js';
import { IslandManager } from './world/IslandManager.js';
import { UnderwaterZone } from './world/UnderwaterZone.js';

import { Player } from './player/Player.js';
import { CameraController } from './player/CameraController.js';

import { Rod } from './fishing/Rod.js';
import { Line } from './fishing/Line.js';
import { FishManager } from './fishing/FishManager.js';
import { HookDetector } from './fishing/HookDetector.js';
import { CatchSystem } from './fishing/CatchSystem.js';
import { ShakeGame } from './fishing/ShakeGame.js';
import { CatchBar } from './fishing/CatchBar.js';

import { HUD } from './ui/HUD.js';
import { InventoryUI } from './ui/InventoryUI.js';
import { Hotbar } from './ui/Hotbar.js';
import { Aquarium } from './ui/Aquarium.js';

import { Boat } from './vehicle/Boat.js';

// ENGINE CORE
const engine = new Engine();
const input = new Input();
const time = new Time();

// WORLD
const ocean = new Ocean();
engine.add(ocean.mesh);

const sky = new Sky(engine.scene);
const islands = new IslandManager(engine.scene);
const underwater = new UnderwaterZone(engine.camera);

// PLAYER + CAMERA
const player = new Player(engine.camera, input);
const mouseLook = new MouseLook(engine.camera);
const cameraController = new CameraController(player, mouseLook);

// VEHICLE
const boat = new Boat(engine.scene, engine.camera);

// FISHING SYSTEMS
const rod = new Rod(engine.camera);
const line = new Line(engine.scene, rod);
const fishManager = new FishManager(engine.scene, 15);
const hookDetector = new HookDetector(rod, fishManager);
const catchSystem = new CatchSystem();
const shakeGame = new ShakeGame();
const catchBar = new CatchBar();

// UI
const hud = new HUD();
const inventory = new InventoryUI();
const hotbar = new Hotbar();
const aquarium = new Aquarium();

// GAME STATE
let fishingPhase = "idle"; 
// idle → waiting → shake → bar → caught

// MAIN LOOP
engine.register((delta) => {
  time.update(delta);

  // WORLD
  ocean.update(delta);
  sky.update(delta);
  underwater.update();

  // PLAYER + CAMERA
  cameraController.update(delta);

  // BOAT
  boat.update(input, delta);

  // FISHING PHYSICS
  rod.update(delta);
  line.update();
  fishManager.update(delta);

  // CAST
  if (input.mouse.down && fishingPhase === "idle") {
    rod.cast();
    catchSystem.cast();
    fishingPhase = "waiting";
    hud.setText("Casting...");
  }

  // WAITING → BITE
  if (fishingPhase === "waiting") {
    const fishNear = hookDetector.check();

    if (fishNear) {
      fishingPhase = "shake";
      shakeGame.start();
      hud.setText("SHAKE! CLICK FAST!");
    }
  }

  // SHAKE MINIGAME
  if (fishingPhase === "shake") {
    const result = shakeGame.update();

    if (result === true) {
      fishingPhase = "bar";
      catchBar.start();
      hud.setText("BALANCE THE BAR!");
    }

    if (result === false) {
      fishingPhase = "idle";
      hud.setText("Fish Escaped!");
    }
  }

  // BAR MINIGAME
  if (fishingPhase === "bar") {
    const success = catchBar.update(delta, input.mouse.down);

    if (success) {
      const fish = catchSystem.generateFish();

      inventory.add(fish);
      aquarium.add(fish);

      // auto place in hotbar if empty slot
      for (let i = 0; i < 9; i++) {
        if (!hotbar.slots[i]) {
          hotbar.setItem(i, fish);
          break;
        }
      }

      hud.setText(`Perfect Catch: ${fish.name}`);
      fishingPhase = "idle";
    }
  }
});
