app.controller('NovoCartao', ['$scope', '$http', '$location', '$ionicPopup', 'CartoesPessoais', '$ionicScrollDelegate', '$ionicModal', '$rootScope', function($scope, $http, $location, $ionicPopup, CartoesPessoais, $ionicScrollDelegate, $ionicModal, $rootScope) {
  $scope.doses = 20;
  var fotoCard = 0;
  var fotoDrink = 0;
  $scope.checked = false;

  $ionicModal.fromTemplateUrl('modal-ft.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
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

  $scope.ChangeRange = function(val){
    $scope.doses = parseInt($scope.doses) + parseInt(val);
    if($scope.doses <= 0)
      $scope.doses = 0;
    if($scope.doses >= 20)
      $scope.doses = 20;
  }

  $scope.capturePhoto = function(id) {
    if(id == 1){
      navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationType: Camera.DestinationType.DATA_URL });
      /*imageData = "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"
      onSuccess(imageData);*/
    }
      
    else if(id == 2){
      navigator.camera.getPicture(onSuccess2, onFail2, { quality: 20, destinationType: Camera.DestinationType.DATA_URL });
      /*imageData = "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"
       onSuccess2(imageData);*/
    }
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

    if(fotoDrink == 0){
      alerta($ionicPopup, "Notificação", "Tire uma foto da bebida para continuar.");
      return 0;
    }

    if(fotoCard == 0){
      alerta($ionicPopup, "Notificação", "Tire uma foto do clube para continuar.");
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
        image_card: $scope.imgCard,
        image_drink: $scope.imgDrink
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
      alerta($ionicPopup, "Notificação", "Clube criado com sucesso!");
      $location.path('/menu/meuscartoes'); 
    }, function(data){
      $scope.checked = false;
      $scope.msg = "Erro ao criar o clube, tente novamente";
      console.error(data); 
    });
    return 0; 
  }

  $scope.$on('novoCartao', function() {
    $scope.submitcartao();
  })
}]);


app.controller('FooterNovoCartao', ['$scope', '$rootScope',  function($scope, $rootScope) {
  $scope.click1 = function () {
      $rootScope.$broadcast('novoCartao');
  }
}]);