app.controller('Sidebar', ['$scope', '$state', function($scope, $state) {
  $scope.sair = function() {
    delete(window.localStorage['login']);
    // depois pesquiser isso
    $state.transitionTo("login", {}, {reload: true});
  }
}]);