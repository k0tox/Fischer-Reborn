export class HUD {
  constructor() {
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.top = "10px";
    this.el.style.left = "10px";
    this.el.style.color = "white";
    this.el.innerHTML = "Fishing Game";

    document.body.appendChild(this.el);
  }

  setText(text) {
    this.el.innerHTML = text;
  }
}
