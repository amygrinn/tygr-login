module.exports = class Page {
  constructor(path) {
    this.path = path;
  }

  open() {
    return browser.url(this.path || '');
  }

  get header() {
    return $('h1');
  }
};
