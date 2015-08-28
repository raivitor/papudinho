app.controller('dados', ['$scope', '$http', '$ionicPlatform', '$ionicPopup',  function($scope, $http, $ionicPlatform, $ionicPopup) {
  $scope.email = window.localStorage['email'];
  $scope.nome = window.localStorage['name'];

  $scope.submitDados = function() {
    if($scope.passwordOld == undefined ){
      alerta($ionicPopup, "Notificação", "O campo 'Senha Antiga' está vazio");
      return 0;
    } 

    if($scope.passwordOld.length < 8 ){
      alerta($ionicPopup, "Notificação", "'Senha Antiga' precisa ter 8 ou mais dígitos");
      return 0;
    } 

    if($scope.password1 == undefined ){
      alerta($ionicPopup, "Notificação", "O campo 'Senha Nova' está vazio");
      return 0;
    } 

    if($scope.password2 == undefined ){
      alerta($ionicPopup, "Notificação", "O campo 'Confirmar Senha Nova' está vazio");
      return 0;
    } 
    
    if($scope.password1.length < 8 ){
      alerta($ionicPopup, "Notificação", "'Senha Nova' precisa ter 8 ou mais dígitos");
      return 0;
    }

    if($scope.password1 != $scope.password2){
      alerta($ionicPopup, "Notificação", "Senhas diferentes");
      return 0;
    }

    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/change_password', 
      method: "POST",
      params: {
        id: window.localStorage['id'],
        old_password: $scope.passwordOld,
        new_password: $scope.password1
      }
    }).

    success(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Senha alterada com sucesso!");
      $scope.password1 = '';
      $scope.passwordOld = '';
      $scope.password2 = '';
    }).

    error(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Senha antiga está errada");
      console.log('Error add Amigo');
    });

    return 0; 
  }
}]);