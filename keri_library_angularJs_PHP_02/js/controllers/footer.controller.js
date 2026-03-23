;(function (window, angular) {

  'use strict';

  angular.module('app')

  // Footer controller
  .controller('footerController', [
    '$scope',
    function($scope) {

      // Get current year
      $scope.currentYear = (new Date()).getFullYear();
    }
  ]);

})(window, angular);