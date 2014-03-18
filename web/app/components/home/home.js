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

var parseCodeBlocks = function(html) {
  var prismLanguageMappings = {
    'lang-html': 'language-markup',
    'lang-javascript': 'language-javascript',
    'lang-css': 'language-css'
  };
  var $html = $('<div />').append(html);
  var getPrismClasses = function(markDownLanguageClass) {
    var classes = '';

    if(prismLanguageMappings[markDownLanguageClass]) {
      classes = prismLanguageMappings[markDownLanguageClass];
    }

    if(classes.length > 0) {
      classes += ' line-numbers';
    } else {
      //this will give the block the basic style of a code block without any syntax highlighting
      classes = 'language-none';
    }

    return classes;
  };

  //parse majro code blocks
  $html.find('pre').each(function(key, value) {
    $(value).addClass(getPrismClasses($(value).find('code').attr('class'))).attr('nag-prism', '');
    $(value).find('code').removeAttr('class');

    Prism.highlightElement($(value).find('code')[0]);
  });

  //parse minor code blocks
  $html.find('code').each(function(key, value) {
    if($(value).parent()[0].tagName.toLowerCase() !== 'pre') {
      $(value).addClass('language-none');
    }
  });

  return $html.html();
};

angular.module('demo.home.home', [
  'demo.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('demo.docs.component', {
      url: '/:component/:module',
      views: {
        '': {
          templateUrl: 'app/components/home/assets/templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }
])
.controller('HomeCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$sce',
  '$stateParams',
  '$compile',
  'searchData',
  'componentTypeNormalizer',
  function($scope, $rootScope, $http, $sce, $stateParams, $compile, searchData, componentTypeNormalizer) {
    var filterData = {
      name: $stateParams.component
    };

    if($stateParams.module) {
      filterData.module = $stateParams.module;
    }

    searchData.getByProperty(filterData).then(function(component) {
      $rootScope.$broadcast('Application/selectedActiveComponent', component);
      window.scrollTo(0, 0);
      $scope.viewSourceCode = false;

      $http({
        method: 'GET',
        url: component.jsonPath.substr(1)
      })
      .success(function(response) {
        if(response.tag === 'module') {
          response.module = response.name;
        }

        componentTypeNormalizer.normalize(response);
        response.description = $sce.trustAsHtml(parseCodeBlocks(response.description));

        if(response.nghtmlattributes) {
          _.forEach(response.nghtmlattributes, function(item, key) {
            response.nghtmlattributes[key].description = $sce.trustAsHtml(parseCodeBlocks(item.description));
          });
        }

        if(response.methods) {
          _.forEach(response.methods, function(item, key) {
            response.methods[key].description = $sce.trustAsHtml(parseCodeBlocks(item.description));

            if(item.return) {
              response.methods[key].return.description = $sce.trustAsHtml(parseCodeBlocks(item.return.description));
            }

            if(item.examples) {
              _.forEach(item.examples, function(item2, key2) {
                response.methods[key].examples[key2].example = $sce.trustAsHtml(parseCodeBlocks(item2.example));

                if(item2.type === 'html') {
                  response.methods[key].examples[key2].type = 'markup';
                }
              });
            }
          });
        }

        if(response.properties) {
          _.forEach(response.properties, function(item, key) {
            response.properties[key].description = $sce.trustAsHtml(parseCodeBlocks(item.description));

            if(item.subprops) {
              _.forEach(item.subprops, function(item2, key2) {
                response.properties[key].subprops[key2].description = $sce.trustAsHtml(parseCodeBlocks(item2.description));
              });
            }
          });
        }

        if(response.respondTos) {
          _.forEach(response.respondTos, function(item, key) {
            response.respondTos[key].description = $sce.trustAsHtml(parseCodeBlocks(item.description));
          });
        }

        if(response.events) {
          _.forEach(response.events, function(item, key) {
            response.events[key].description = $sce.trustAsHtml(parseCodeBlocks(item.description));
          });
        }

        if(response.ngWatches) {
          _.forEach(response.ngWatches, function(item, key) {
            response.ngWatches[key].description = $sce.trustAsHtml(parseCodeBlocks(item.description));
          });
        }

        $rootScope.$broadcast('Application/processedActiveComponent', response);

        $scope.activeComponent = response;
      });
    }, function(error) {
      //todo: error handling
    });
    
    $scope.activeComponent = null;
    $scope.searchComponentText = '';
    //$scope.activeComponent = null;
    $scope.searchComponentCallback = function(componentItem) {
      //todo: need to make this work for subprops of properties
      var matches = _.isEmpty($scope.searchComponentText) || componentItem.name.indexOf($scope.searchComponentText) !== -1;

      if(matches === false && componentItem.subprops && componentItem.subprops.length > 0) {
        _.forEach(componentItem.subprops, function(subProperty) {
          if(matches === false) {
            matches = subProperty.name.indexOf($scope.searchComponentText) !== -1;
          } else {
            return;
          }
        });
      }

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
      } else {
        //todo: research: I should not have to do this
        //$scope.searchComponentText = $('#component-search').val();
      }
    };
    $scope.searchMouseUp = function($event) {
      $($event.target).select();
    };

    key('c', function() {
      $('#component-search').focus();
      return false;
    });

    $rootScope.$on('Application/processedActiveComponent', function(self, component) {
      $scope.activeComponent = component;
    });
  }
]);
