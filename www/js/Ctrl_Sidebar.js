app.controller('Sidebar', ['$scope', '$state', function($scope, $state) {
  $scope.sair = function() {
    delete(window.localStorage['login']);
    delete(window.localStorage['LastImgCard']);
    delete(window.localStorage['LastImgDrink']);
    window.localStorage['login'] = NULL;
    window.localStorage['LastImgCard'] = NULL;
    window.localStorage['LastImgDrink'] = NULL;
    // depois pesquiser isso
    //$state.transitionTo("login", {}, {reload: true});
    $state.go('login', {}, { reload: true });
  }
}]);