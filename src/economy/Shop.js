export class Shop {
  constructor(money) {
    this.money = money;

    this.items = [
      { name: "Basic Rod", price: 0, stats: { luck: 1, speed: 1 } },
      { name: "Pro Rod", price: 100, stats: { luck: 2, speed: 1.5 } },
      { name: "God Rod", price: 500, stats: { luck: 5, speed: 3 } }
    ];

    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.top = "50px";
    this.el.style.left = "10px";
    this.el.style.color = "yellow";

    document.body.appendChild(this.el);
    this.render();
  }

  render() {
    this.el.innerHTML = "<b>Shop</b><br>";

    this.items.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.innerText = `${item.name} ($${item.price})`;

      btn.onclick = () => {
        if (this.money.spend(item.price)) {
          alert(`Bought ${item.name}`);
        }
      };

      this.el.appendChild(btn);
      this.el.appendChild(document.createElement("br"));
    });
  }
}
