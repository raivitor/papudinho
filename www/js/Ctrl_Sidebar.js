app.controller('Sidebar', ['$scope', '$state', function($scope, $state) {
  $scope.sair = function() {
    delete(window.localStorage['login']);
    delete(window.localStorage['LastImgCard']);
    delete(window.localStorage['LastImgDrink']);
    // depois pesquiser isso
    //$state.transitionTo("login", {}, {reload: true});
    $state.go('login', {}, { reload: true });
  }
}]);