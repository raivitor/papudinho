app.controller('CartaoDetalhe', ['$scope', 'CartoesPessoais', '$stateParams', '$ionicModal', function($scope, CartoesPessoais, $stateParams, $ionicModal) {
  $scope.cartao = CartoesPessoais.getId($stateParams.cartaoId);
  $scope.bar = $scope.cartao.bar;
  $scope.drink = $scope.cartao.drink;
  $scope.vencimento = $scope.cartao.due_date;
  $scope.total_doses = $scope.cartao.total_doses;
  $scope.historico = $scope.cartao.historics;
  $scope.detalhe = $scope.historico.getId($stateParams.histId);

  $ionicModal.fromTemplateUrl('modal-ft.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(id) {
    if(id == 1){
      $scope.titulo = "Bebida";
      $scope.img = "data:image/jpeg;base64," + $scope.detalhe.image_drink;
    }
    else if (id == 2){
      $scope.titulo = "Cartão";
      $scope.img = "data:image/jpeg;base64," + $scope.detalhe.image_card;
    }
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
}]);