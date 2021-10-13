import { InspectionAITemplatePage } from './app.po';

describe('InspectionAI App', function() {
  let page: InspectionAITemplatePage;

  beforeEach(() => {
    page = new InspectionAITemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
