app.controller('LoginForm', ['$scope', '$http', '$location', '$window' ,function($scope, $http, $location, $window) {
  $scope.msg = " ";
  $scope.checked = false;
  //$window.location.reload(true);

  $scope.submit = function() {
    $scope.msg = " ";

    if($scope.email == undefined ){
      $scope.msg = "O campo 'Email' está vazio";
      return 0;
    } 

    if($scope.senha == undefined ){
      $scope.msg = "O campo 'Senha' está vazio";
      return 0;
    } 

    if($scope.senha.length < 8 ){
      $scope.msg = "Senha precisa ter 8 ou mais dígitos";
      return 0;
    }
    $scope.checked = true;
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/authenticate_user/', 
      method: "POST",
      params: {
        email: $scope.email,
        password: $scope.senha
      }
    }).

    success(function (data, status, headers, config) {
      window.localStorage['email'] = $scope.email;
      window.localStorage['senha'] = $scope.senha;
      $scope.msg = "";
      $scope.email = "";
      $scope.senha = "";
      window.localStorage['atualizarAmigo'] = 1;
      window.localStorage['atualizarDados'] = 1;
      window.localStorage['login'] = 1;
      G_usuario = data;
      $scope.checked = false;
      $location.path('/menu/home');  
    }).

    error(function (data, status, headers, config) {
      console.log('Error LoginForm');
      $scope.checked = false;
      $scope.msg = "Usuário ou senha incorretos";
    });
  };

  /**
  * Verificação se o usuario encerrou o app sem deslogar
  * se tiver feito isto então ele realiza o login automatico
  */
  if(window.localStorage['login'] == undefined){
    window.localStorage['login'] = 0;
    console.log("zerei");
    //$window.location.reload(true);
  } else if(window.localStorage['login'] == 1) {
    $scope.email = window.localStorage['email'];
    $scope.senha = window.localStorage['senha'];
    $scope.submit();
    console.log("passei");
  } else{
    window.localStorage['login'] = 0;
    console.log("fiquei");
  }
}])