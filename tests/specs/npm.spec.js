const Page = require('./page-objects/page');

describe('npm module', () => {
  it('announces itself', async () => {
    const loginPage = new Page('/test-npm.html');
    await loginPage.open();
    return expect(loginPage.header).toHaveText('TyGr Login');
  });
});
