app.controller('UpdateCartao', ['$scope', '$http', '$location', '$ionicPopup', 'CartoesPessoais', '$stateParams', '$ionicScrollDelegate', '$ionicModal', function($scope, $http, $location, $ionicPopup, CartoesPessoais, $stateParams, $ionicScrollDelegate, $ionicModal) {
  

 console.log($stateParams.cartaoId);
 
  var req = {
    method: 'GET',
    url: 'http://developer-papudinho.herokuapp.com/webservice/cards/'+$stateParams.cartaoId,
  }
  $http(req).
    then(function (sucesso) {
      console.log(sucesso);
      $scope.cartao = sucesso.data[0];

      $scope.bar = sucesso.data[0].bar;
      $scope.drink = sucesso.data[0].drink;
      $scope.doses = sucesso.data[0].remaining_doses;
      $scope.historico = sucesso.data[0].historics;
      $scope.imgDrink = $scope.historico[$scope.historico.length-1].image_drink.url;
      $scope.imgCard = $scope.historico[$scope.historico.length-1].image_card.url; 
      var fotoCard = 0;
      var fotoDrink = 0;



      return sucesso;
    },
    function(fail){
      console.error("fail getCartoes - id"+id);
      return -1;
    });




/*

  $scope.checked = false;
  $scope.id = $stateParams.cartaoId;
  $scope.cartao = CartoesPessoais.getCartaoPorId($stateParams.cartaoId);
  $scope.bar = $scope.cartao.bar;
  $scope.drink = $scope.cartao.drink;
  $scope.doses = $scope.cartao.remaining_doses;
  $scope.historico = $scope.cartao.historics;
  $scope.imgDrink = $scope.historico[$scope.historico.length-1].image_drink.url;
  //window.localStorage['LastImgDrink'];
  $scope.imgCard = $scope.historico[$scope.historico.length-1].image_card.url; 
  //window.localStorage['LastImgCard'];
  var fotoCard = 0;
  var fotoDrink = 0;
*/
  $ionicModal.fromTemplateUrl('modal-ft.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.ChangeRange = function(val){
    $scope.doses = parseInt($scope.doses) + parseInt(val);
    if($scope.doses <= 0)
      $scope.doses = 0;
    if($scope.doses >= 20)
      $scope.doses = 20;
  }
  
  $scope.openModal = function(id) {
    if(id == 1){
      $scope.titulo = "Bebida";
      $scope.img = $scope.imgDrink;
    }
    else if (id == 2){
      $scope.titulo = "Cartão";
      $scope.img = $scope.imgCard;
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

  $scope.capturePhoto = function(id) {
    if(id == 1)
      navigator.camera.getPicture(onSuccess, onFail, { quality: 30, destinationType: Camera.DestinationType.DATA_URL });
    else if(id == 2)
      navigator.camera.getPicture(onSuccess2, onFail2, { quality: 30, destinationType: Camera.DestinationType.DATA_URL });
  }

  function onSuccess(imageData) {
    fotoDrink = imageData;
    $scope.imgDrink = "data:image/jpeg;base64," + fotoDrink;
    $scope.$digest();
  }

  function onFail(message) {
    fotoDrink = 0;
  }

  function onSuccess2(imageData) {
    fotoCard = imageData;
    $scope.imgCard = "data:image/jpeg;base64," + fotoCard;
    $scope.$digest();
  }

  function onFail2(message) {
    fotoCard = 0;
  }

  $scope.submitcartao = function() {
    if(fotoDrink == 0){
      alerta($ionicPopup, "Notificação", "Tire uma foto da bebida para continuar.");
      return 0;
    }

    if(fotoCard == 0){
      alerta($ionicPopup, "Notificação", "Tire uma foto do cartão para continuar.");
      return 0;
    }
    $scope.checked = true;
    $ionicScrollDelegate.scrollTop();
    var req = {
      method: 'POST',
      url: 'http://developer-papudinho.herokuapp.com/webservice/update_card',
      data: { 
        card_id: $scope.id,
        remaining_doses : $scope.doses,
        image_card: $scope.imgCard,
        image_drink: $scope.imgDrink
      }
    }

    $http(req).then(function(data){
      $scope.checked = false;
      CartoesPessoais.atualizar(G_usuario.id);
      $scope.bebida = null;
      $scope.bar = null;
      fotoCard = 0;
      fotoDrink = 0;
      $scope.imgCard = null;
      $scope.imgDrink = null;
      $scope.msg = " ";
      alerta($ionicPopup, "Notificação", "Cartão atualizado com sucesso!");
      $location.path('/menu/meuscartoes'); 
    }, function(data){
      $scope.checked = false;
      alerta($ionicPopup, "Notificação", "Erro ao atualizar o cartão, tente novamente.");
      console.error(data); 
    });
    return 0; 
  }

  $scope.$on('updatecartao', function() {
    $scope.submitcartao();
  })
}]);

app.controller('FooterUpdateCartao', ['$scope', '$rootScope',  function($scope, $rootScope) {
  $scope.click1 = function () {
      $rootScope.$broadcast('updatecartao');
  }
}]);