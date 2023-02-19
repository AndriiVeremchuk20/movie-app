class Storage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: string) {
    localStorage.setItem(this.key, value);
  }

  get() {
    return localStorage.getItem(this.key);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

const Token = new Storage("Token");

export default Token;
