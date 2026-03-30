;(function(window, angular) {

  'use strict';

  // Application module.
  angular.module('app', [
    'ui.router',
    'app.common'
  ])

  // Number leading zero
  .filter('numPad', [
    () => {
      return (number) => {
        return String(number || '').padStart(2,"0");
      };
    }
  ])

  // Application config
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('root', {
        views: {
          '': {
            templateUrl: './html/root.html'
          },
          'header@root': {
            templateUrl: './html/header.html',
            controller: 'headerController'
          },
          'footer@root': {
            templateUrl: './html/footer.html',
            controller: 'footerController'
          }
        }
      })
			.state('home', {
				url: '/',
        parent: 'root',
				templateUrl: './html/home.html',
				controller: 'homeController'
			})
			.state('books', {
				url: '/books',
        parent: 'root',
				templateUrl: './html/books.html',
				controller: 'booksController'
			});
      
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$rootScope',
    'http',
    function($rootScope, http) {

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

      // Set bootstrap tooltips
      $rootScope.setBsTooltips = () => {
        let tooltips = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]:not(.tooltip-set)');
        [...tooltips].map(e => {
          e.classList.add('tooltip-set');
          new bootstrap.Tooltip(e);
        });
      };
        
      // Scroll to top
      $rootScope.scrollToTop = () => {
        let appContainer = document.querySelector('.app-container');
        if (appContainer &&
           (appContainer.scrollTop > 0 ||
            appContainer.scrollLeft > 0))
            appContainer.scrollTo(0, 0);
      }
    }
  ])

  // Home controller
  .controller('homeController', [
    '$rootScope',
    '$scope',
    '$state',
    '$timeout',
    function($rootScope, $scope, $state, $timeout) {
      
      // Set current state identifier
      $rootScope.stateId = $state.current.name;

      // Reset asynchronous
      $timeout(() => {

        // Show recommend books
        $scope.recommendBooks = 
            [...$rootScope.data.books].sort(() => 0.5 - Math.random())
                                      .slice(0, 6);
        $scope.$applyAsync();

        // Set bootstrap tooltips
        $rootScope.setBsTooltips();

        // Scroll to top
        $rootScope.scrollToTop();

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
  ])

	// Books controller
  .controller('booksController', [
    '$rootScope',
    '$scope',
    '$state',
    '$timeout',
    'http',
    function($rootScope, $scope, $state, $timeout, http) {

      // Set current state identifier
      $rootScope.stateId = $state.current.name;

      // Reset asynchronous
      $timeout(() => {

        // Set bootstrap tooltips
        $rootScope.setBsTooltips();

        // Scroll to top
        $rootScope.scrollToTop();

      }, 300);

      // Get-/Set modal properties
      let modalElement  = document.querySelector('#bookModal'),
          bookModal     = new bootstrap.Modal(modalElement, {keyboard: false}),
          modelDefault  = { id: "",
                            name: "",
                            genre_id: null,
                            author: "",
                            publicated: "",
                            description: "" };

      // Set header, and get header keys length
      $scope.header = {
        id: `Azon.`,  
        name: 'Név',
        genre_name: 'Műfaj',
        author: 'Szerző',
        publicated: 'Kiadva'
      };
      $scope.headerLength = Object.keys($scope.header).length;

      // Open/Set modal
      $scope.openModal = (data, type) => {
        $scope.modalType = type;
        switch(type) {
          case 'modify':
            $scope.modalTitle = 'MÓDOSÍT';
            $scope.model = JSON.parse(JSON.stringify(data));
            break;
          case 'details':
            $scope.modalTitle = 'RÉSZLETEK';
            $scope.model = JSON.parse(JSON.stringify(data));
            break;
          case 'new':
            $scope.modalTitle = 'FELVÉTEL'
            $scope.model = JSON.parse(JSON.stringify(modelDefault));
            break;
        }

        // Apply change and show modal
        $rootScope.$applyAsync();
        bookModal.show();

        // Set focus to first input
        $timeout(() => {
          let firstInput = modalElement.querySelector('input:not([disabled])');
          if (firstInput) firstInput.focus();
        }, 600);
      };

      // Insert
      $scope.post = (data) => {
        let { id, ...args } = data;
        http.request({
          url:'./php/post.php',
          data: args
        })
        .then(r => {
          $rootScope.data.books = r;
          $rootScope.$applyAsync();
          $timeout(() => {

            // Set bootstrap tooltips
            $rootScope.setBsTooltips();
            
            alert('A könyvet sikerült felvenni!');
          }, 100);
        })
        .catch(e => alert(e));
      };

      // Update
      $scope.put = (data) => {
        let {genre_name, ...args } = data;
        http.request({
          url:'./php/put.php',
          data: args
        })
        .then(r => {
          $rootScope.data.books = r;
          $rootScope.$applyAsync();
          $timeout(() => {
            alert('A könyv módosítása megtörtént!')
          }, 100);
        })
        .catch(e => alert(e));
      };

      // Delete
      $scope.delete = (id, name) => {
        if (confirm(`${name}\nBiztossan törli a könyvet a kínálatból?`)) {
          let args = {id: id};
          http.request({
            url:'./php/delete.php',
            data: args
          })
          .then(r => {
            $rootScope.data.books = r;
            $rootScope.$applyAsync();
            $timeout(() => {
              alert('A könyvet töröltük!')
            }, 100);
          })
          .catch(e => alert(e));
        }
      };

      // Custom filter for books
      $scope.booksFilter = function(book) {
        if (!$rootScope.filter.search) return true;
        let searchTerm  = $rootScope.filter.search.toLowerCase(),
            fieldValue  = String(book[$rootScope.filter.key] || '').toLowerCase();
        return fieldValue.includes(searchTerm);
      };

      // Remove focus warring when modal close
      modalElement.addEventListener('hide.bs.modal', () => {
          if (document.activeElement instanceof HTMLElement)
            document.activeElement.blur();
      });
    }
  ])
  
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
  ])

  // Footer controller
  .controller('footerController', [
    '$scope',
    function($scope) {

      // Get current year
      $scope.currentYear = (new Date()).getFullYear();
    }
  ]);

})(window, angular);