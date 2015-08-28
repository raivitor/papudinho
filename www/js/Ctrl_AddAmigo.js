app.controller('AddAmigo', ['$scope', '$http', '$location', '$ionicPopup', function($scope, $http, $location, $ionicPopup) {
  $scope.submitamigo = function() {
    if($scope.email == undefined){
      $scope.msg = "O campo 'Email' está vazio";
      return 0;
    }
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/new_friendship', 
      method: "POST",
      params: {
        id: G_usuario.id,
        email: $scope.email
      }
    }).

    success(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Amizade criada com sucesso!");
      window.localStorage['atualizarAmigo'] = 1
      $location.path('/menu/amigos'); 
    }).

    error(function (data, status, headers, config) {
      console.log('Error add Amigo: '+data);
    });

    return 0; 
  }
}]);