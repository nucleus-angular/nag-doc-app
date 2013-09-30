angular.module('demo', [
  'demo.core',
  'demo.home',
  'demo.fileViewer',
  'nag.prism'
])
.config([
  '$locationProvider',
  '$urlRouterProvider',
  function($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/docs');
  }
])
.run([
  '$state',
  '$rootScope',
  function($state, $rootScope) {
    $rootScope.navigateTo = function(routeName, parameters, options) {
      console.log()
      $state.transitionTo(routeName, parameters, options);
    };

    //this should prevent weird scrolling issue when the browser store the state of the scroll on page refresh
    $(window).on('beforeunload', function() {
      $(window).scrollTop(0, 0);
    });
  }
]);
