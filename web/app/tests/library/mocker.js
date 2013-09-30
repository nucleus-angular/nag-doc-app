angular.module('unitTestMocker', [])
.service('unitTestMocker', ['$httpBackend', function($httpBackend) {
  //example
  /*this.setValidLoginResponse = function() {
    $httpBackend.when('GET', '/api/v1/authentication').respond({
      status: 'success',
      data: {
        userId: 1,
        name: 'Test User',
        email: 'test.user@example.com'
      }
    });
  };*/

  this.flush = function() {
    $httpBackend.flush();
  };
}])

