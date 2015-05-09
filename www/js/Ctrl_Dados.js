app.controller('Dados', ['$scope', '$http', '$ionicPlatform', '$ionicPopup',  function($scope, $http, $ionicPlatform, $ionicPopup) {
  $scope.msg = ""

  $scope.submitDados = function() {

    if($scope.passwordOld == undefined ){
      $scope.msg = "O campo 'Senha Antiga' está vazio";
      return 0;
    } 

    if($scope.passwordOld == undefined ){
      $scope.msg = "'Senha Antiga' precisa ter 8 ou mais dígitos";
      return 0;
    } 

    if($scope.password == undefined ){
      $scope.msg = "O campo 'Senha Nova' está vazio";
      return 0;
    } 

    if($scope.password2 == undefined ){
      $scope.msg = "O campo 'Confirmar Senha Nova' está vazio";
      return 0;
    } 
    
    if($scope.password.length < 8 ){
      $scope.msg = "'Senha Nova' precisa ter 8 ou mais dígitos";
      return 0;
    }

    if($scope.password != $scope.password2){
      $scope.msg = "Senhas diferentes";
      return 0;
    }

    $scope.msg = '';

    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/change_password', 
      method: "POST",
      params: {
        id: window.localStorage['id'],
        old_password: $scope.passwordOld,
        new_password: $scope.password
      }
    }).

    success(function (data, status, headers, config) {
      $scope.msg = "Senha alterada com sucesso";
      $scope.password = '';
      $scope.passwordOld = '';
      $scope.password2 = '';
    }).

    error(function (data, status, headers, config) {
      $scope.msg = "Senha antiga está errada";
      console.log('Error add Amigo');
    });

    return 0; 
  }

  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      clearTimeout(time);
      $scope.email = window.localStorage['email'];
      $scope.nome = window.localStorage['name'];

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 500);
    }
  }

  timedCount();
}]);