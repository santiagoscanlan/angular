import { OutputsPage } from './app.po';

describe('outputs App', function() {
  let page: OutputsPage;

  beforeEach(() => {
    page = new OutputsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
