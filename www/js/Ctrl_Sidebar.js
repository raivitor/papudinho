app.controller('Sidebar', ['$scope',  function($scope) {
  $scope.sair = function() {
    delete(window.localStorage['login']);
  }
}]);