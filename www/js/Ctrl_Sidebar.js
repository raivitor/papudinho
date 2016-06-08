app.controller('Sidebar', ['$scope', '$state', function($scope, $state) {
  $scope.sair = function() {

    var idUser = window.localStorage['login'];

    delete(window.localStorage['login']);
    delete(window.localStorage['LastImgCard']);
    delete(window.localStorage['LastImgDrink']);
    window.localStorage['login'] = NULL;
    window.localStorage['LastImgCard'] = NULL;
    window.localStorage['LastImgDrink'] = NULL;

    var req = {
        method: 'POST',
        url: 'http://developer-papudinho.herokuapp.com/webservice/device_token',
        params:{
          id: idUser, 
          token: ""
        }
      }
      $http(req).
        then(function (sucesso) {
          /*console.warn("Sucesso token");
          console.log(sucesso);*/
        },
        function(fail){
          console.error("Fail token");
          //console.log(fail);
        });

    // depois pesquiser isso
    //$state.transitionTo("login", {}, {reload: true});
    $state.go('login', {}, { reload: true });
  }
}]);