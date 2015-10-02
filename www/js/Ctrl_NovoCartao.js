app.controller('NovoCartao', ['$scope', '$http', '$location', '$ionicPopup', 'CartoesPessoais', function($scope, $http, $location, $ionicPopup, CartoesPessoais) {
  $scope.doses = 10;
  var fotoCard = 0;
  var fotoDrink = 0;
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
    fotoCard = 0;
  }

  function onSuccess2(imageData) {
    fotoCard = imageData;
    $scope.imgCard = "data:image/jpeg;base64," + fotoCard;
    $scope.$digest();
  }

  function onFail2(message) {
    fotoDrink = 0;
  }

  $scope.submitcartao = function() {
    var dataUsuario = (new Date($scope.vencimento)).toString().split(' ');
    dataUsuario[1] = new Date(Date.parse(dataUsuario[1] +" 1, "+dataUsuario[3])).getMonth()+1;
    vencimento = [dataUsuario[2],dataUsuario[1],dataUsuario[3]].join('/');

    var dataAtual = (new Date()).toString().split(' ');
    dataAtual[1] = new Date(Date.parse(dataAtual[1] +" 1, "+dataAtual[3])).getMonth()+1;
    data1 = [dataAtual[2],dataAtual[1],dataAtual[3]].join('/');

    if (dataUsuario[3]<dataAtual[3]) { //ano anterior
      $scope.msg = "Data inválida";
      return 0;
    }
    else{ //ano atual
      if (dataUsuario[1]<dataAtual[1]) { //mes anterior
        $scope.msg = "Data inválida";
        return 0;
      }
      else{ //mes atual
        if(dataUsuario[2]<dataAtual[2]){ // dia anterior
          $scope.msg = "Data inválida";
          return 0;
        }
      }
    }
    
    if($scope.bebida <= 0){
      $scope.msg = "Bebida inválida";
      return 0;
    }

    if($scope.bar <= 0){
      $scope.msg = "Bar inválido";
      return 0;
    }

    if(fotoCard == 0){
      $scope.msg = "Foto do cartão inválida";
      return 0;
    }
    
    if(fotoDrink == 0){
      $scope.msg = "Foto da bebida inválida";
    }

    $scope.msg = "Salvando...";
    $scope.msg.focus();
    //console.log("drink: "+$scope.bebida+"\nparticular: "+true+"\nbar: "+$scope.bar+ "\nuser_id: "+G_usuario.id+ "\ndue_date: "+vencimento+ "\ntotal_doses: "+$scope.doses+"\ncard_secret: "+$scope.secreto);
    
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
      //console.log(data); 
    }, function(data){
      $scope.msg = "Erro ao criar o cartão, tente novamente";
      console.error(data); 
    });
    return 0; 
  }
}]);