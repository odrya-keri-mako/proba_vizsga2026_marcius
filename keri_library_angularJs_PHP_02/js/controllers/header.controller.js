;(function (window, angular) {

  'use strict';

  angular.module('app')

  // Headers controller
  .controller('headerController', [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {

      // Toggle theme, and save
      $scope.toggleTheme = () => {
        $rootScope.theme = $rootScope.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('keri_library_theme', $rootScope.theme);
      }

      // Show/Hide breakpoints
      $scope.isShowBsBreakPoints = false;
      document.addEventListener("keyup", (event) => {
        if (event.altKey && event.key === 'b') {
          $scope.isShowBsBreakPoints = !$scope.isShowBsBreakPoints;
          $scope.$applyAsync();
        }
      });
    }
  ]);

})(window, angular);