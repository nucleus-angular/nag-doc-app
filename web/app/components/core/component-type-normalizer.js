/**
 * This service is used to normalize the names of component types
 */
angular.module('demo.core.componentTypeNormalizer', [])
.factory('componentTypeNormalizer', [
  function() {
    return {
      normalize: function(component) {
        var typeConversions = {
          ngcontroller: 'controller',
          ngservice: 'service',
          ngdirective: 'directive',
          ngfilter: 'filter',
          ngvalue: 'value'
        };

        if(typeConversions[component.componentType]){
          component.componentType = typeConversions[component.componentType];
        }
      },
      normalizeArray: function(components) {
        var self = this;

        _.forEach(components, function(value, key) {
          self.normalize(components[key]);
        });
      }
    };
  }
]);