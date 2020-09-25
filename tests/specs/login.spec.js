const Page = require('./page-objects/page');

[
  {
    desc: 'Installed by npm',
    page: new Page('/test-npm.html'),
  },
  {
    desc: 'Loaded by browser',
    page: new Page('/test-browser.html'),
  },
].map((run) =>
  describe(run.desc, () => {
    it('announces itself', async () => {
      await run.page.open();
      return expect(run.page.header).toHaveText('TyGr Login');
    });
  })
);
