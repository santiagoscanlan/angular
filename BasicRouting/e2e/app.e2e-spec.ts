import { BasicRoutingPage } from './app.po';

describe('basic-routing App', function() {
  let page: BasicRoutingPage;

  beforeEach(() => {
    page = new BasicRoutingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
