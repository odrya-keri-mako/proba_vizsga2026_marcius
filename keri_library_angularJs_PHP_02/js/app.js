;(function(window, angular) {

  'use strict';

  // Lazy load files
  const lazyLoad = (files) => {
    if (!Array.isArray(files)) files = [files];
    const paths = files.map(file => file.includes('/') ?
      file : `./js/controllers/${file}`);
    return ['$ocLazyLoad', ($ocLazyLoad) => $ocLazyLoad.load(paths)];
  };

  // Application module.
  angular.module('app', [
    'ui.router',
    'angularCSS',
    'oc.lazyLoad',
    'app.common'
  ])

  // Application config
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('root', {
        resolve: {
          loadRootDeps: lazyLoad([
            'header.controller.js',
            'footer.controller.js'
          ])
        },
        views: {
          '': {
            templateUrl: './html/layouts/root.html'
          },
          'header@root': {
            templateUrl: './html/components/header.html',
            controller: 'headerController'
          },
          'footer@root': {
            templateUrl: './html/components/footer.html',
            controller: 'footerController'
          }
        }
      })
			.state('home', {
				url: '/',
        parent: 'root',
				templateUrl: './html/pages/home.html',
        css: './css/home.css',
				controller: 'homeController',
        resolve: { loadRootDeps: lazyLoad('home.controller.js') }
			})
			.state('books', {
				url: '/books',
        parent: 'root',
				templateUrl: './html/pages/books.html',
        css: './css/books.css',
				controller: 'booksController',
        resolve: { loadRootDeps: lazyLoad('books.controller.js') }
			});
      
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$rootScope',
    '$transitions',
    '$timeout',
    '$css',
    'http',
    function($rootScope, $transitions, $timeout, $css, http) {

      // Get last choice theme
      $rootScope.theme = localStorage.getItem('keri_library_theme') ?? 'dark';

      // Set model for filter
      $rootScope.filter = {
        search: '',
        key: 'name'
      };

      // Get books, and genres
      http.request('./php/get.php')
      .then(r => {
        $rootScope.data = r;
        $rootScope.$applyAsync();
      })
      .catch(e => alert(e));

      // Event on transitions success
      $transitions.onSuccess({}, (transition) => {

        // Remove the last-state css if it exists
        const fromState = transition.from();
        if (fromState.css) $css.remove(fromState.css);

        // Add the current-state css if it exists
        const toState = transition.to();
        if (toState.css) $css.add(toState.css);

        // Set current state identifier
        $rootScope.stateId = toState.name;

        // Reset asynchronous
        $timeout(() => {

          // Set bootstrap tooltips
          let tooltips = document.querySelectorAll(
              '[data-bs-toggle="tooltip"]:not(.tooltip-set)');
          [...tooltips].map(e => {
            e.classList.add('tooltip-set');
            new bootstrap.Tooltip(e);
          });

          // Scroll to top
          $rootScope.scrollToTop();
        }, 100);
      });

      // Scroll to top
      $rootScope.scrollToTop = () => {
        let appContainer = document.querySelector('.app-container');
        if (appContainer &&
           (appContainer.scrollTop > 0 ||
            appContainer.scrollLeft > 0))
            appContainer.scrollTo(0, 0);
      }
    }
  ]);

})(window, angular);