app.controller('UpdateCartao', ['$scope', '$http', '$location', '$ionicPopup', 'CartoesPessoais', '$stateParams', function($scope, $http, $location, $ionicPopup, CartoesPessoais, $stateParams) {
  
  $scope.id = $stateParams.cartaoId;
  $scope.cartao = CartoesPessoais.getId($scope.id);
  $scope.bar = $scope.cartao.bar;
  $scope.drink = $scope.cartao.drink;
  console.log($scope.cartao);
  $scope.doses = $scope.cartao.remaining_doses;

  var fotoCard = 0;
  var fotoDrink = 0;
  $scope.capturePhoto = function(id) {
    if(id == 1)
      navigator.camera.getPicture(onSuccess, onFail, { quality: 30,  targetWidth: 300, targetHeight: 300,  destinationType: Camera.DestinationType.DATA_URL });
    else if(id == 2)
      navigator.camera.getPicture(onSuccess2, onFail2, { quality: 30,  targetWidth: 300, targetHeight: 300,  destinationType: Camera.DestinationType.DATA_URL });
  }

  function onSuccess(imageData) {
    fotoCard = imageData;
    $scope.imgCard = "data:image/jpeg;base64," + fotoCard;
    $scope.$digest();
  }

  function onFail(message) {
    fotoCard = 0;
  }

  function onSuccess2(imageData) {
    fotoDrink = imageData;
    $scope.imgDrink = "data:image/jpeg;base64," + fotoCard;
    $scope.$digest();
  }

  function onFail2(message) {
    fotoDrink = 0;
  }

  $scope.submitcartao = function() {
    if(fotoCard == 0){
      $scope.msg = "Foto do cartão inválida";
      return 0;
    }

    if(fotoDrink == 0){
      $scope.msg = "Foto da bebida inválida";
    }

    $scope.msg = "Salvando...";
    
    var req = {
      method: 'POST',
      url: 'http://developer-papudinho.herokuapp.com/webservice/update_card',
      data: { 
        card_id: $scope.id,
        remaining_doses : true,
        image_card: fotoCard,
        image_drink: fotoDrink
      }
    }

    $http(req).then(function(data){
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
      //console.log(data); 
    }, function(data){
      $scope.msg = "Erro ao atualizar o cartão, tente novamente";
      console.error(data); 
    });
    return 0; 
  }
}]);