export class Hotbar {
  constructor() {
    this.slots = [null, null, null, null, null];
    this.selected = 0;

    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.bottom = "20px";
    this.el.style.left = "50%";
    this.el.style.transform = "translateX(-50%)";
    this.el.style.display = "flex";
    document.body.appendChild(this.el);

    window.addEventListener("keydown", (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) {
        this.selected = num - 1;
        this.render();
      }
    });

    this.render();
  }

  setItem(slot, item) {
    this.slots[slot] = item;
    this.render();
  }

  render() {
    this.el.innerHTML = "";

    this.slots.forEach((item, i) => {
      const slot = document.createElement("div");
      slot.style.border = "2px solid white";
      slot.style.margin = "5px";
      slot.style.padding = "10px";
      slot.style.background = i === this.selected ? "#444" : "#222";

      slot.innerText = item ? item.name : "Empty";
      this.el.appendChild(slot);
    });
  }
}
