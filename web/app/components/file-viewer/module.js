angular.module('demo.fileViewer.routing', [
  'demo.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('demo.fileViewer', {
      url: '/file-viewer',
      abstract: true,
      views: {
        '': {
          templateUrl: 'app/components/core/assets/templates/module-wrapper.html'
        }
      }
    });
  }
]);

angular.module('demo.fileViewer', [
  'demo.fileViewer.routing',
  'demo.fileViewer.fileViewer'
]);