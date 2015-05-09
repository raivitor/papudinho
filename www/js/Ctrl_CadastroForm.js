app.controller('CadastroForm', ['$scope', '$http', '$location', '$ionicPopup',  function($scope, $http, $location, $ionicPopup) {
  $scope.checked = false;
  $scope.submitcadastro = function() {
    if($scope.user == undefined ){
      $scope.msg = "O campo 'Nome' está vazio";
      return 0;
    }

    if($scope.email == undefined ){
      $scope.msg = "O campo 'Email' está vazio";
      return 0;
    } 

    if($scope.phone == undefined ){
      $scope.msg = "O campo 'Celular' está vazio";
      return 0;
    }

    if($scope.password == undefined ){
      $scope.msg = "O campo 'Senha' está vazio";
      return 0;
    } 

    if($scope.password2 == undefined ){
      $scope.msg = "O campo 'Confirmar Senha' está vazio";
      return 0;
    } 
    
    if($scope.password.length < 8 ){
      $scope.msg = "Senha precisa ter 8 ou mais dígitos";
      return 0;
    }

    if($scope.phone.length < 10){
      $scope.msg = "Insira o DDD junto ao seu número";
      return 0;
    }

    if($scope.password != $scope.password2){
      $scope.msg = "Senhas diferentes";
      return 0;
    }

    $scope.checked = true;
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/registering_user/', 
      method: "POST",
      params: {
        name: $scope.user,
        email: $scope.email,
        phone: $scope.phone,
        password: $scope.password,
        password_confirmation: $scope.password2
      }
    }).

    success(function (data, status, headers, config) {
      $scope.checked = false;
      $scope.msg = "";
      alerta($ionicPopup, "Notificação", "Cadastro realizado com sucesso!");
      $location.path('home');  
    }).

    error(function (data, status, headers, config) {
      $scope.checked = false;
      $scope.msg = "Erro ao cadastrar, tente novamente mais tarde.";
      console.log('Error CadastroForm');
    });
  }
}]);