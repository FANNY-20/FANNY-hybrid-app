module.exports = {
  before(browser) {
    browser.page.index.index()
      .navigate();
  },

  after(browser) {
    browser.end();
  },

  "Root element should be present"(browser) {
    browser.expect.element(".p-index").to.be.present;
  },
};
