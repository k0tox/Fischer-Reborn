export class InventoryUI {
  constructor() {
    this.items = [];

    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.bottom = "10px";
    this.el.style.left = "10px";
    this.el.style.color = "white";

    document.body.appendChild(this.el);
  }

  add(item) {
    this.items.push(item);
    this.render();
  }

  render() {
    this.el.innerHTML = this.items.map(i => i.name).join("<br>");
  }
}
