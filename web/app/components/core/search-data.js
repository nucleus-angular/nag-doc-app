angular.module('demo.core.searchData', [])
.factory('searchData', [
  '$q',
  '$http',
  '$rootScope',
  'componentTypeNormalizer',
  function($q, $http, $rootScope, componentTypeNormalizer) {
    var searchData = [];

    //let start trying to load the data
    $http({
      method: 'GET',
      url: 'json/search-data.json'
    })
    .success(function(response) {
      searchData = response;
      componentTypeNormalizer.normalizeArray(searchData);

      $rootScope.$broadcast('SearchData/dataLoaded', searchData);
    })
    .error(function(response) {
      deferred.reject(response);
    });

    return {
      getAll: function() {
        var deferred = $q.defer();

        if(_.isEmpty(searchData)) {
          //if we don't have the data, listen to the dataLoaded event in order to make sure the promise is resolved
          var destroyCallback = $rootScope.$on('SearchData/dataLoaded', function(self, searchData) {
            deferred.resolve(searchData);

            //we want to destroy this callback once it has been executed because the dataLoaded event will only trigger once
            destroyCallback();
          });
        } else {
          deferred.resolve(searchData);
        }

        return deferred.promise;
      },

      getByProperty: function(filterData) {
        //convert to generic helper method
        var filterByProperties = function(filterData, data) {
          return _.filter(data, function(item) {
            match = true;

            _.forEach(filterData, function(value, key) {
              if(match === true && value && item[key] !== value) {
                match = false;
              }
            });

            return match;
          })[0];
        };

        var deferred = $q.defer();

        if(_.isEmpty(searchData)) {
          //if we don't have the data, listen to the dataLoaded event in order to make sure the promise is resolved
          var destroyCallback = $rootScope.$on('SearchData/dataLoaded', function(self, searchData) {
            deferred.resolve(filterByProperties(filterData, searchData));

            //we want to destroy this callback once it has been executed because the dataLoaded event will only trigger once
            destroyCallback();
          });
        } else {
          deferred.resolve(filterByProperties(filterData, searchData));
        }

        return deferred.promise;
      }
    };
  }
]);
