import { HttpRequestPage } from './app.po';

describe('http-request App', function() {
  let page: HttpRequestPage;

  beforeEach(() => {
    page = new HttpRequestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
