app.controller('NovaSenha', ['$scope', '$http', '$location', '$ionicPopup',  function($scope, $http, $location, $ionicPopup) {
  $scope.checked = false;
  $scope.submitsenha = function() {
    if($scope.email == undefined ){
      $scope.msg = "O campo 'Email' está vazio";
      return 0;
    } 
    $scope.checked = true;
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/reset_password/', 
      method: "POST",
      params: {
        email: $scope.email
      }
    }).

    success(function (data, status, headers, config) {
      $scope.checked = false;
      alerta($ionicPopup, "Notificação", "Enviamos a nova senha para o seu email.");
      $location.path('home');  
    }).

    error(function (data, status, headers, config) {
      $scope.checked = false;
      alerta($ionicPopup, "Notificação", "Erro ao enviar a nova senha, tente novamente mais tarde.");
      console.log('Error NovaSenha');
      console.log("Data: "+data);
      console.log("Status: "+status);
      console.log("headers: "+headers);
      console.log("Config: "+config);
    });
  }
}]);