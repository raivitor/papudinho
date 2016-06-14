app.controller('Sidebar', ['$scope', '$state', '$http', '$location' ,function($scope, $state, $http,$location) {

    $scope.checked = true;
    $scope.nome = window.localStorage['nome'];
    console.log(window.localStorage['nome']);

  $scope.logoff = function() {

    var idUser = window.localStorage['login'];
    console.log(idUser)

    localStorage.clear();
    
    var req = {
        method: 'POST',
        url: 'http://developer-papudinho.herokuapp.com/webservice/device_token',
        params:{
          id: idUser, 
          token: "nulo"
        }
      }
      $http(req).
        then(function (sucesso) {
          console.warn("Sucesso token");
          console.log(sucesso);
          $location.path('/login');
        },
        function(fail){
          console.error("Fail token");
          $location.path('/login');
          //console.log(fail);
        });



  }


  $scope.sair = function() {

  }
}]);