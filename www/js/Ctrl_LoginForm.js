app.controller('LoginForm', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.msg = " ";
  $scope.checked = false;
  window.localStorage['login'] = 0;
  $scope.submit = function() {
    $scope.msg = " ";
    //$scope.email = "teste2@teste.com";
    //$scope.senha = "12345678";

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
      $scope.checked = false;
      $scope.msg = "";
      $scope.email = "";
      $scope.senha = "";
      //window.localStorage['atualizarHome'] = 1;
      window.localStorage['id'] = data.id;
      window.localStorage['email'] = data.email;
      window.localStorage['name'] = data.name;
      window.localStorage['phone'] = data.phone;
      window.localStorage['promotion'] = data.promotion;
      window.localStorage['gps'] = data.gps
      window.localStorage['visibility'] = data.visibility;
      $location.path('/menu/home');  
    }).

    error(function (data, status, headers, config) {
      console.log('Error LoginForm');
      $scope.checked = false;
      $scope.msg = "Usuário ou senha incorretos";
    });
  };
}])