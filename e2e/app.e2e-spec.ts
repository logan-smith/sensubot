import { SensubotPage } from './app.po';

describe('sensubot App', () => {
  let page: SensubotPage;

  beforeEach(() => {
    page = new SensubotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
