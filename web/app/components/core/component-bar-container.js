angular.module('demo.core.componentBarContainer', [
  'demo.core'
])
.controller('ComponentBarContainerCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$sce',
  '$stateParams',
  'searchData',
  function($scope, $rootScope, $http, $sce, $stateParams, searchData) {
    $scope.searchComponentText = '';
    $scope.activeComponent = null;
    $scope.searchComponentCallback = function(componentItem) {
      //todo: need to make this work for subprops of properties
      var matches = _.isEmpty($scope.searchComponentText) || componentItem.name.indexOf($scope.searchComponentText) !== -1;

      return matches;
    };
    $scope.clearOnEscape = function($event, dataToClear) {
      if($event.which === 27) {
        //$event.preventDefault();
        if($scope[dataToClear].length > 0) {
          $scope[dataToClear] = '';
        } else {
          $($event.target).blur();
        }
      }
    };
    $scope.searchMouseUp = function($event) {
      $($event.target).select();
    };

    key('l', function() {
      $('#component-list-search').focus();
      return false;
    });

    $rootScope.$on('Application/processedActiveComponent', function(self, component) {
      $scope.activeComponent = component;
    });
  }
]);