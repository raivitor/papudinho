app.controller('CadastroForm', ['$scope', '$http', '$location', '$ionicPopup',  function($scope, $http, $location, $ionicPopup) {
  $scope.checked = false;
  $scope.submitcadastro = function() {
    $scope.msg = "";
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

    if($scope.cpf == undefined ){
      $scope.msg = "O campo 'CPF' está vazio";
      return 0;
    }

    if($scope.cpf.length != 11 ){
      $scope.msg = "CPF inválido, utilize somente números";
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

    cpf = "";
    for(i = 0; i<11; i++){
      if(i==9){
        cpf = cpf.concat("-");
      }
      else if(i%3==0 && i!=0){
        cpf = cpf.concat(".");
      }
      cpf = cpf.concat($scope.cpf[i]);
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
        cpf: cpf,
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