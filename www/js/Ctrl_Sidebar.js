app.controller('Sidebar', ['$scope',  function($scope) {
  $scope.sair = function() {
    window.localStorage['login'] = 0;
  }
}]);