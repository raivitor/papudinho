app.controller('MeusCartoes', ['$scope', '$http', '$interval', 'CartoesPessoais', function($scope, $http, $interval, CartoesPessoais) {

  $interval(atualizar, 2000, false);
  function atualizar(){
    $scope.cartoes = CartoesPessoais.getCartoes();
    if($scope.cartoes == false){
      $scope.msg = "Nenhum cartão cadastrado no momento";
    }
    else if($scope.cartoes == -1){
      $scope.msg = "Erro no servidor";
    }
  }
  atualizar();
}]);