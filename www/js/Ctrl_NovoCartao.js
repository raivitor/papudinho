app.controller('NovoCartao', ['$scope', '$http', '$location', '$ionicPopup', 'CartoesPessoais', '$ionicScrollDelegate', function($scope, $http, $location, $ionicPopup, CartoesPessoais, $ionicScrollDelegate) {
  $scope.doses = 20;
  var fotoCard = 0;
  var fotoDrink = 0;
  $scope.checked = false;
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
    $scope.msg = "";

    if($scope.vencimento == undefined){
      alerta($ionicPopup, "Notificação", "Data inválida");
      return 0;
    }

    var dataSplit = (new Date($scope.vencimento)).toString().split(' ');
    dataSplit[1] = new Date(Date.parse(dataSplit[1] +" 1, "+dataSplit[3])).getMonth()+1;
    vencimento = [dataSplit[2],dataSplit[1],dataSplit[3]].join('/');

    var dataUsuario = new Date($scope.vencimento);
    var dataAtual = new Date();

    if(dataAtual > dataUsuario){
      alerta($ionicPopup, "Notificação", "Data inválida");
      return 0;
    } 

    if($scope.bebida == null){
      alerta($ionicPopup, "Notificação", "Bebida inválida");
      return 0;
    }

    if($scope.bar == null){
      alerta($ionicPopup, "Notificação", "Bar inválido");
      return 0;
    }

    $scope.checked = true;
    $ionicScrollDelegate.scrollTop();
    
    var req = {
      method: 'POST',
      url: 'http://developer-papudinho.herokuapp.com/webservice/new_card',
      data: { 
        drink: $scope.bebida,
        particular: true,
        bar: $scope.bar,
        user_id: G_usuario.id,
        due_date: vencimento,
        total_doses: $scope.doses,
        remaining_doses: $scope.doses,
        card_secret: $scope.secreto,
        image_card: fotoCard,
        image_drink: fotoDrink
      }
    }

    $http(req).then(function(data){
      $scope.checked = false;
      window.localStorage['atualizarCartao'] = 1;
      CartoesPessoais.atualizar(G_usuario.id);
      $scope.bebida = null;
      $scope.bar = null;
      $scope.vencimento = null;
      $scope.doses = 10;
      fotoCard = 0;
      fotoDrink = 0;
      $scope.secreto = false;
      $scope.imgCard = null;
      $scope.imgDrink = null;
      $scope.msg = " ";
      alerta($ionicPopup, "Notificação", "Cartão criado com sucesso!");
      $location.path('/menu/meuscartoes'); 
    }, function(data){
      $scope.checked = false;
      $scope.msg = "Erro ao criar o cartão, tente novamente";
      console.error(data); 
    });
    return 0; 
  }
}]);