app.controller('dados', ['$scope', '$http', '$ionicPlatform', '$ionicPopup', '$interval', '$location', function($scope, $http, $ionicPlatform, $ionicPopup, $interval, $location) {
  $scope.email = G_usuario.email; 
  $scope.nome = G_usuario.name;
  //Força a atualização por causa do cache
  $interval(atualizar, 1000, false);

  function atualizar(){
    if(window.localStorage['atualizarDados'] == 1 ){
      console.log("dados atualizados");
      window.localStorage['atualizarDados'] = 0;
      $scope.email = G_usuario.email; 
      $scope.nome = G_usuario.name;
    }
  }

  $scope.submitDados = function() {
    //$location.path('/menu/home');
    //return 0;
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
      url: servidor+'/webservice/change_password', 
      method: "POST",
      params: {
        id: G_usuario.id,
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