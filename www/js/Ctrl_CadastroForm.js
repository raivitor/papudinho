app.controller('CadastroForm', ['$scope', '$http', '$location', '$ionicPopup', '$ionicModal', function($scope, $http, $location, $ionicPopup, $ionicModal) {
  $scope.checked = false;

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  $scope.submitcadastro = function() {
    $scope.msg = "";
    if(isBlank($scope.user)){
      $scope.msg = "O campo 'Nome' está vazio.";
      return 0;
    }

    if(isBlank($scope.email)){
      $scope.msg = "O campo 'Email' está vazio.";
      return 0;
    }

    if($scope.phone == undefined ){
      $scope.msg = "O campo 'Celular' está vazio.";
      return 0;
    }

    if($scope.phone.length != 15){
      console.log($scope.phone.length);
      $scope.msg = "Insira o DDD junto ao seu número.";
      return 0;
    }

    if($scope.cpf == undefined ){
      $scope.msg = "O campo 'CPF' está vazio.";
      return 0;
    }

    if($scope.cpf.length != 14 ){
      $scope.msg = "CPF inválido.";
      return 0;
    }

    if($scope.password == undefined ){
      $scope.msg = "O campo 'Senha' está vazio.";
      return 0;
    }

    if($scope.password2 == undefined ){
      $scope.msg = "O campo 'Confirmar Senha' está vazio.";
      return 0;
    }

    if($scope.password.length < 8 ){
      $scope.msg = "Senha precisa ter 8 ou mais dígitos.";
      return 0;
    }

    if($scope.password != $scope.password2){
      $scope.msg = "Senhas diferentes";
      return 0;
    }

    $scope.msg = "";
    $scope.checked = true;
    $http({
      url: servidor+'/webservice/registering_user/',
      method: "POST",
      params: {
        name: $scope.user,
        email: $scope.email,
        phone: $scope.phone,
        cpf: $scope.cpf,
        password: $scope.password,
        password_confirmation: $scope.password2
      }
    }).

    success(function (data, status, headers, config) {
      window.localStorage['email'] = $scope.email;
      window.localStorage['senha'] = $scope.senha;
      $scope.msg = "";
      window.localStorage['atualizarAmigo'] = 1;
      window.localStorage['atualizarDados'] = 1;
      window.localStorage['atualizarCartao'] = 1;
      window.localStorage['login'] = 1;
      G_usuario = data;
      $scope.checked = false;
      $location.path('/menu/home');
    }).

    error(function (data, status, headers, config) {
      $scope.checked = false;
      if(status == 409)
        alerta($ionicPopup, "Notificação", "Este email já foi cadastrado. Tente outro.");
    });
  }

  $ionicModal.fromTemplateUrl('views/my-contrato.html', {
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
