export class SaveSystem {
  static save(data) {
    localStorage.setItem("fisch_save", JSON.stringify(data));
  }

  static load() {
    const data = localStorage.getItem("fisch_save");
    return data ? JSON.parse(data) : null;
  }
}
