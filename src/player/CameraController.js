export class CameraController {
  constructor(player, mouseLook) {
    this.player = player;
    this.mouseLook = mouseLook;
  }

  update(delta) {
    this.player.update(delta);
    this.mouseLook.update();
  }
}
