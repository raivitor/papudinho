app.controller('MeusCartoes', ['$scope', '$http', '$interval', 'CartoesPessoais', function($scope, $http, $interval, CartoesPessoais) {
  $scope.checked = true;
  $interval(atualizar, 2000, false);
  function atualizar(){
    $scope.cartoes = CartoesPessoais.getCartoes(G_usuario.id);
    $scope.cartoes = $scope.cartoes.data;
    $scope.msg = "";
    
    if($scope.cartoes == false){
      $scope.msg = "Nenhum cartão cadastrado no momento";
      $scope.checked = false;
    }
    else if($scope.cartoes == -1){
      $scope.msg = "Erro no servidor";
      $scope.checked = false;
    }
  }
  atualizar();
}]);