export class Money {
  constructor() {
    this.value = 0;
  }

  add(amount) {
    this.value += amount;
  }

  spend(amount) {
    if (this.value >= amount) {
      this.value -= amount;
      return true;
    }
    return false;
  }
}
