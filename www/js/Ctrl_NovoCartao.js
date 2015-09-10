app.controller('NovoCartao', ['$scope', '$http', '$location', '$ionicPopup', function($scope, $http, $location, $ionicPopup) {
  $scope.doses = 10;
  var fotoCel = 0;
  $scope.capturePhoto = function() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 30,  targetWidth: 300, targetHeight: 300,  destinationType: Camera.DestinationType.DATA_URL });
  }

  function onSuccess(imageData) {
   fotoCel = imageData;
   $scope.imgBase64 = "data:image/jpeg;base64," + fotoCel;
  }

  function onFail(message) {
    fotoCel = 0;
  }

  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/drinks/', 
        method: "GET"            
      }).

      success(function (data, status, headers, config) {
        $scope.Bebidas = data;
      }).

      error(function (data, status, headers, config) {
        console.log('Error drink');
      });


      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
        method: "GET"
      }).

      success(function (data, status, headers, config) {
        $scope.Bares = data;
      }).

      error(function (data, status, headers, config) {
        console.log('Error bar');
      });

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 1000);
    }
  }

  timedCount();

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

    return 0;
    
    if($scope.bebida <= 0){
      $scope.msg = "Bebida inválida";
      return 0;
    }

    if($scope.bar <= 0){
      $scope.msg = "Bar inválido";
      return 0;
    }

    if(fotoCel == 0){
      $scope.msg = "Imagem inválida";
      return 0;
    }

    $scope.msg = "Salvando...";
    //console.log("drink_id: "+$scope.bebida+"\nbar_id: "+$scope.bar+ "\nuser_id: "+G_usuario.id+ "\ndue_date: "+vencimento+ "\ntotal_doses: "+$scope.doses+"\nimage: "+fotoCel);
    
    var req = {
      method: 'POST',
      url: 'http://developer-papudinho.herokuapp.com/webservice/new_card',
      data: { 
        drink_id: $scope.bebida,
        bar_id: $scope.bar,
        user_id: G_usuario.id,
        due_date: vencimento,
        total_doses: $scope.doses,
        image: fotoCel,
        card_secret: $scope.secreto 
      }
    }

    return 0;
    $http(req).then(function(data){
      window.localStorage['atualizarCartao'] = 1;
      alerta($ionicPopup, "Notificação", "Cartão criado com sucesso!");
      $location.path('/menu/cartoes'); 
      //console.log(data); 
    }, function(data){
      $scope.msg = "Erro ao criar o cartão, tente novamente";
      console.error(data); 
    });
    return 0; 
  }
}]);