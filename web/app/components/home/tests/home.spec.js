describe('Home Controller', function(){
  'use strict';

  var scope, $controller, controllerOptions, $httpBackend, callback;

  beforeEach(module('demo'));

  beforeEach(inject(function($injector, $rootScope) {
    $httpBackend = $injector.get('$httpBackend');
    callback = jasmine.createSpy();
    scope = $rootScope.$new();
    $controller = $injector.get('$controller');
    controllerOptions = {
      $scope: scope
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have basic elements', function() {
    var controller = new $controller('HomeCtrl', controllerOptions);
    expect(scope.name).toEqual('AngularJS Seed');
  });
});
