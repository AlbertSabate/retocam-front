import { RetocamFrontPage } from './app.po';

describe('retocam-front App', function() {
  let page: RetocamFrontPage;

  beforeEach(() => {
    page = new RetocamFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
