app.controller('CadastroForm', ['$scope', '$http', '$location', '$ionicPopup',  function($scope, $http, $location, $ionicPopup) {
  $scope.checked = false;
  $scope.submitcadastro = function() {
    $scope.msg = "";
    if($scope.user == undefined ){
      $scope.msg = "O campo 'Nome' está vazio.";
      return 0;
    }

    if($scope.email == undefined ){
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
      url: 'http://developer-papudinho.herokuapp.com/webservice/registering_user/', 
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
      window.localStorage['login'] = 1;
      G_usuario = data;
      $scope.checked = false;
      $location.path('/menu/home');  
    }).

    error(function (data, status, headers, config) {
      $scope.checked = false;
      $scope.msg = "Erro ao cadastrar, tente novamente mais tarde.";
      console.log('Error CadastroForm');
    });
  }
}]);