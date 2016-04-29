app.controller('Amigos', ['$scope', '$ionicModal', '$ionicPopup', 'Amizade', function($scope, $ionicModal, $ionicPopup, Amizade) {
  var amigos;
  $scope.solicitacoes;
  $scope.solPen = 0; //Quantidade de solicitacoes pendentes

  //console.log(G_usuario.id);
  //G_usuario.id = 7; //msn
  //G_usuario.id = 13; //gmail
  ListarAmigos();
  ListarSolicitacoes();

  function ListarAmigos(){
    Amizade.getAllAmigos(G_usuario.id).then(function(_amigos){
      $scope.Amigos = _amigos;
      if($scope.Amigos != -1){
        if($scope.Amigos.length == 0){
          $scope.msg = "Você ainda não tem amigos, clique no + para adicionar novos amigos";
        }
      }
      //console.log($scope.Amigos);
    });
    
  }

  function ListarSolicitacoes(){
    Amizade.getAllSolicitacoes(G_usuario.id).then(function(_solicitacoes){
      $scope.solicitacoes = _solicitacoes;
      $scope.solPen = $scope.solicitacoes.length;
      //console.log($scope.solicitacoes);
    });
  }

  $scope.aceitar = function(idSolicitacao){
    console.log(idSolicitacao);
    Amizade.AceitarAmizade(idSolicitacao);
    ListarAmigos();
    ListarSolicitacoes();
    $scope.$digest();
  }

  $scope.deletar = function(idSolicitacao, nome) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Cancelar solicitação',
      template: 'Deseja excluir a amizade de '+nome+' ?',
      cancelText: 'Manter',
      cancelType: 'button-positive',
      okText: 'Excluir',
      okType: 'button-assertive'
    });
    confirmPopup.then(function(res) {
      if(res) {
        Amizade.RecusarAmizade(idSolicitacao);
        ListarAmigos();
        ListarSolicitacoes();
      }
    });
   };

  $ionicModal.fromTemplateUrl('modal-amigos.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(id) {
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