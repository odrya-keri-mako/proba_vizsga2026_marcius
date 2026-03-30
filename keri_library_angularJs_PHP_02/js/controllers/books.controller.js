;(function (window, angular) {

  'use strict';

  angular.module('app')

  // Books controller
  .controller('booksController', [
    '$rootScope',
    '$scope',
    '$timeout',
    'http',
    function($rootScope, $scope, $timeout, http) {

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
            
            alert('A könyvet sikerült felvenni!')
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
    }
  ]);

})(window, angular);