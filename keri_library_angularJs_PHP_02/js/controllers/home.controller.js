;(function (window, angular) {

  'use strict';

  angular.module('app')

  // Number leading zero
  .filter('numPad', [
    () => {
      return (number) => {
        return String(number || '').padStart(2,"0");
      };
    }
  ])
  
  // Home controller
  .controller('homeController', [
    '$rootScope',
    '$scope',
    '$timeout',
    function($rootScope, $scope, $timeout) {
      
      // Reset asynchronous
      $timeout(() => {

        // Show recommend books
        $scope.recommendBooks = 
            [...$rootScope.data.books].sort(() => 0.5 - Math.random())
                                      .slice(0, 6);
        $scope.$applyAsync();
      }, 300);

      // Initial intersection observer for parallax content
      function initParallaxTextAnimations() {
        let items = document.querySelectorAll('.parallax-content');
        let io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting)
                  entry.target.classList.add('show');
            else  entry.target.classList.remove('show'); 
          });
        });
        items.forEach(el => io.observe(el));
      }

      // Initial intersection observer for parallax content
      initParallaxTextAnimations();
    }
  ]);

})(window, angular);