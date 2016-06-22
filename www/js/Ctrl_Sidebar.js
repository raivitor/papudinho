app.controller('Sidebar', ['$scope', '$state', '$http', '$location' ,function($scope, $state, $http,$location) {

    $scope.checked = true;
    $scope.nome = window.localStorage['nome'];
    console.log(window.localStorage['nome']);

  $scope.logoff = function() {

    var idUser = window.localStorage['user_id'];
    console.log(idUser)

    
    //alert(idUser)
    var req = {
        method: 'POST',
        url: servidor+'/webservice/device_token',
        params:{
          id: idUser, 
          token: "nulo"
        }
      }
      $http(req).
        then(function (sucesso) {
          console.warn("Sucesso token");
          console.log(sucesso);
          localStorage.clear();
          $location.path('/login');
        },
        function(fail){
          console.error("Fail token");
          localStorage.clear();
          $location.path('/login');
          //console.log(fail);
        });



  }


  $scope.sair = function() {

  }
}]);

app.controller('Sobre', ['$scope', '$state', '$http', '$location' ,function($scope, $state, $http,$location) {


  $scope.teste = servidor.includes("teste");
  $scope.servidor = servidor;
   
}]);