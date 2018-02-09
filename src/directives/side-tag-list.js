export const sideTagListDir = () => {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      selectedCat: '=',
      selectedTag: '='
    },
    templateUrl: 'templates/directives/side-tag-list.html',
    controller: ($scope, $rootScope, $timeout, $location, tagsService) => {

      const loadTags = (finallyCb) => {
        tagsService.getTrendingTags().then((resp) => {
          $rootScope.tags = resp.map(a => a.name).filter(a => a.length > 0);
          $rootScope.$apply();
        }).catch(() => {
        }).then(() => {
          if (finallyCb) {
            finallyCb();
          }
        });
      };

      // Keep tags in root scope
      if ($rootScope.tags === undefined) {
        $scope.loadingTags = true;
        loadTags(() => {
          $scope.loadingTags = false;
        });
      }

      // Refresh tags in root scope for every 2 minutes
      $timeout(() => {
        loadTags();
      }, 120000);

      $scope.tagClicked = (t) => {
        $location.path(`/posts/${$scope.selectedCat}/${t}`);
      };

      $scope.removeTag = () => {
        $location.path(`/posts/${$scope.selectedCat}`);
      };

    }
  };
};