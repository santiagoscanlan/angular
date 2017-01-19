import { BasicAngular2FormPage } from './app.po';

describe('basic-angular2-form App', function() {
  let page: BasicAngular2FormPage;

  beforeEach(() => {
    page = new BasicAngular2FormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
