describe('testing end to end testing', function() {

  beforeEach(function() {
    //always want to test the production version for end 2 end testing
    browser().navigateTo('../../../../../index.html');
  });

  it('should have basic structure', function() {
    expect(element('.header').count()).toEqual(1);
    expect(element('.footer').count()).toEqual(1);
  });
});
