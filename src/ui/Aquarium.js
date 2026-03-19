export class Aquarium {
  constructor() {
    this.fish = [];

    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.right = "10px";
    this.el.style.bottom = "10px";
    this.el.style.color = "cyan";

    document.body.appendChild(this.el);
  }

  add(fish) {
    this.fish.push(fish);
    this.render();
  }

  render() {
    this.el.innerHTML = "<b>Aquarium</b><br>" +
      this.fish.map(f => f.name).join("<br>");
  }
}
