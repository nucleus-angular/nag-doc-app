//todo: move to utilities library and use it from the library
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

angular.module('demo.fileViewer.fileViewer', [
  'demo.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('demo.fileViewer.fileViewer', {
      url: '/:fileName?lines',
      views: {
        '': {
          templateUrl: 'app/components/file-viewer/assets/templates/file-viewer.html',
          controller: 'FileViewerController'
        }
      }
    });
  }
])
.controller('FileViewerController', [
  '$scope',
  '$compile',
  '$timeout',
  '$http',
  '$sce',
  '$stateParams',
  function($scope, $compile, $timeout, $http, $sce, $stateParams) {
    $scope.sourceCode = '';
    $scope.sourceCodeLines = $stateParams.lines;

    $http({
      method: 'GET',
      url: 'source_files/' + $stateParams.fileName
    })
    .success(function(response) {
      $scope.sourceCode = $sce.trustAsHtml(response);
    })
    .error(function(response) {
      console.log('ERROR');
      console.log(response);
    });

    $timeout(function() {
      window.scrollTo(0, parseInt($('.line-highlight').offset().top - $('.component-bar-container').outerHeight(true)));
    }, 100);
  }
]);
