angular.module('demo.home.routing', [
  'demo.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('demo.docs', {
      url: '/docs',
      views: {
        '': {
          templateUrl: '/app/components/core/assets/templates/module-wrapper.html'
        }
      }
    });
  }
]);

angular.module('demo.home', [
  'demo.home.routing',
  'demo.home.home'
]);