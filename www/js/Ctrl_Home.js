app.controller('Home', ['$scope', '$http', '$ionicModal', '$ionicPopup', function($scope, $http, $ionicModal, $ionicPopup) {
  window.localStorage['login'] = 1;

  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      //clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/due_date', 
        method: "GET",
        params: {
          user: G_usuario.id
        }
      }).

      success(function (data, status, headers, config) {
        $scope.CartoesVencimento = data;
        if(data == 0){
          $scope.msg = "Nenhum cartão perto do vencimento";
        }
        else{
          $scope.msg = "Cartões perto do vencimento";
        }
      }).

      error(function (data, status, headers, config) {
        console.log('Error home');
      });

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 2000);
    }
  }

  timedCount();

  $http({
    url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
    method: "GET",
    params: {
      user: G_usuario.id
    }
  }).

  success(function (data, status, headers, config) {
    $scope.Bares = data;
  }).

  error(function (data, status, headers, config) {
    console.log('Error bares');
  });

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: true,
    hardwareBackButtonClose: true,
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.checkin = function(bar){
    $http({
    url: 'http://developer-papudinho.herokuapp.com/webservice/check_in', 
    method: "POST",
    params: {
      bar_id: bar,
      user_id: G_usuario.id
    }
  }).

  success(function (data, status, headers, config) {
    $scope.closeModal();
    alerta($ionicPopup, "Check-in", "Check-in realizado com sucesso!");
  }).

  error(function (data, status, headers, config) {
    $scope.closeModal();
    alerta($ionicPopup, "Check-in", "Erro ao realizar Check-in, tente novamente.");
    console.error('Checkin');
  });
  }

  $scope.openModal = function() {
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