export class Hotbar {
  constructor() {
    this.slotCount = 9;
    this.slots = new Array(this.slotCount).fill(null);
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

      if (num >= 1 && num <= 9) {
        this.selected = num - 1;
        this.render();
      }
    });

    this.render();
  }

  setItem(slot, item) {
    if (slot < 0 || slot >= this.slotCount) return;
    this.slots[slot] = item;
    this.render();
  }

  getSelectedItem() {
    return this.slots[this.selected];
  }

  render() {
    this.el.innerHTML = "";

    this.slots.forEach((item, i) => {
      const slot = document.createElement("div");
      slot.style.border = "2px solid white";
      slot.style.margin = "5px";
      slot.style.padding = "10px";
      slot.style.minWidth = "60px";
      slot.style.textAlign = "center";

      slot.style.background = i === this.selected ? "#666" : "#222";

      slot.innerHTML = `<div>${i + 1}</div><div>${item ? item.name : "Empty"}</div>`;

      this.el.appendChild(slot);
    });
  }
}
