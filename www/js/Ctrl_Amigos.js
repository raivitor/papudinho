app.controller('Amigos', ['$scope', '$http', '$interval', '$ionicModal', '$ionicPopup', function($scope, $http, $interval, $ionicModal, $ionicPopup) {
  
  $interval(atualizar, 1000, false);
  
  function atualizar() {
    if(window.localStorage['atualizarAmigo'] == 1){
      window.localStorage['atualizarAmigo'] = 0;
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/friends', 
        method: "GET",
        params: {
          id: G_usuario.id
        }
      }).

      success(function (data, status, headers, config) {
        if( data == 0){
          $scope.msg = "Você ainda não tem amigos, clique no + para adicionar novos amigos";
        } else{
          $scope.Amigos = data;  
        }
      }).

      error(function (data, status, headers, config) {
        console.log('Error Amigos');
      });
    } 
  }

  $scope.aceitar = function(id){
    if(id==1)
      $scope.p1 = true;
    else
      $scope.p2=true;
    $scope.num--;
  }

  $scope.num = 2;
  $scope.deletar = function(id) {
    if(id == 1)
      nome = "José Antonio da Silva";
    else
      nome = "Carlos dos Santos Paiva";

    var confirmPopup = $ionicPopup.confirm({
      title: 'Cancelar solicitação',
      template: 'Deseja excluir a solicitação de amizade de '+nome+' ?',
      cancelText: 'Manter',
      cancelType: 'button-positive',
      okText: 'Excluir',
      okType: 'button-assertive'
    });
    confirmPopup.then(function(res) {
      if(res) {
        if(id == 1)
          $scope.p1 = true;
        else
          $scope.p2 = true;
        $scope.num--;
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