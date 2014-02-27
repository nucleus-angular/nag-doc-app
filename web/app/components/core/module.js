angular.module('demo.core.routing', [
  'demo.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('demo', {
      name: 'demo',
      url: '',
      views: {
        '': {
          template: '<div ui-view></div>'//'app/components/core/assets/templates/module-wrapper.html'
        },
        'component-list': {
          templateUrl: 'app/components/core/assets/templates/component-list.html',
          controller: 'ComponentListCtrl'
        },
        'component-bar-container': {
          templateUrl: 'app/components/core/assets/templates/component-bar-container.html',
          controller: 'ComponentBarContainerCtrl'
        }
      }
    });
  }
]);

angular.module('demo.core', [
  'ui.router',
  'demo.core.routing',
  'demo.core.constants',
  'demo.core.componentList',
  'demo.core.searchData',
  'demo.core.componentTypeNormalizer'
]);