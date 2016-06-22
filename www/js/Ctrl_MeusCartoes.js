app.controller('MeusCartoes', ['$scope', '$http', '$interval', 'CartoesPessoais', function($scope, $http, $interval, CartoesPessoais) {
  
  $scope.checked = true;

  $scope.controle = false;

  $scope.loadAtualizar = function(){
    atualizar();
  }

  atualizar();

  $scope.$on("$ionicView.enter", function(event, data){
   atualizar();
   console.log("State Params: ", data.stateParams);
});


  //$interval(atualizar, 1000, false);
  function atualizar(){


    
    $http.get(servidor+"/webservice/cards/particular", { params: { user: G_usuario.id } })
    .success(function(data) {
        console.log(data);
          $scope.cartoes = data.aberto;
          $scope.cartoesVencidos = data.vencidos;

          //console.log(sucesso.data.vencidos);
          $scope.checked = false;
    })
    .error(function(data) {
        console.error("fail getCartoes - id"+id);
    });

   $scope.checked = false;
   
    if($scope.cartoes == false){
      $scope.msg = "Nenhum clube cadastrado no momento";
      $scope.checked = false;
    }


    else if($scope.cartoes == -1){
      $scope.msg = "Erro no servidor";
      $scope.checked = false;
    } else if($scope.cartoes){
      $scope.checked = false;
    }
    
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.myGoBack = function() {
  //window.history.back();
  $ionicHistory.goBack();
  };


  $scope.doRefresh = function() {
      atualizar();
  };



}]);