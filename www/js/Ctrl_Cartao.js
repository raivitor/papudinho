app.controller('Cartao', ['$scope', '$ionicPopup', 'CartoesPessoais', '$stateParams', '$location', '$interval', function($scope, $ionicPopup, CartoesPessoais, $stateParams, $location, $interval) {
  $interval(atualizar, 2000, false);

  function atualizar(){
    $scope.id = $stateParams.cartaoId;
    $scope.cartao = CartoesPessoais.getId($scope.id);
    $scope.bar = $scope.cartao.bar;
    $scope.drink = $scope.cartao.drink;
    $scope.vencimento = $scope.cartao.due_date;
    $scope.total_doses = $scope.cartao.total_doses;
    $scope.historico = $scope.cartao.historics;
    window.localStorage['LastImgCard'] = $scope.historico[$scope.historico.length-1].image_card.url;
    window.localStorage['LastImgDrink'] = $scope.historico[$scope.historico.length-1].image_drink.url;
  }
  atualizar();

  $scope.deletar = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Apagar cartão',
      template: 'Deseja apagar todos os dados deste cartão?',
      cancelText: 'Cancelar',
      cancelType: 'button-positive',
      okText: 'Apagar',
      okType: 'button-assertive'
    });
    confirmPopup.then(function(res) {
      if(res) {
        CartoesPessoais.deletar($stateParams.cartaoId, G_usuario.id);
        $location.path('/menu/meuscartoes'); 
      }
    });
   };

}]);