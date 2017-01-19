import { FormAngular2DemoPage } from './app.po';

describe('form-angular2-demo App', function() {
  let page: FormAngular2DemoPage;

  beforeEach(() => {
    page = new FormAngular2DemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
