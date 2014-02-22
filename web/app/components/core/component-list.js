angular.module('demo.core.componentList', [
  'demo.core'
])
.controller('ComponentListCtrl', [
  '$scope',
  'searchData',
  '$rootScope',
  function($scope, searchData, $rootScope) {
    $scope.searchData = searchData.getAll();
    $scope.searchListText = '';
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

    $rootScope.$on('Application/selectedActiveComponent', function(self, activeComponent) {
      $scope.activeComponent = activeComponent;
    });
  }
]);
