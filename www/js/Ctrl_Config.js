app.controller('Config', ['$scope', '$http', '$ionicPopup', function($scope, $http, $ionicPopup) {

	$scope.promocoes = G_usuario.promotion;
	$scope.gps = G_usuario.gps;
	$scope.visibilidade = G_usuario.visibility;
  $scope.privacidade = false;
  console.log("user id:" + G_usuario.id);
	$scope.submitConfig = function() {
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/update_config/', 
      method: "POST",
      params: {
        id: G_usuario.id,
        promotion: $scope.promocoes,
        gps: $scope.gps,
        visibility: $scope.visibilidade,
        card_secret: $scope.privacidade
      }
    }).
    success(function (data, status, headers, config) {
      G_usuario.promotion = $scope.promocoes;
      G_usuario.gps = $scope.gps;
      G_usuario.visibility = $scope.visibilidade;
      G_usuario.card_secret = $scope.privacidade;
      alerta($ionicPopup, "Notificação", "Configurações salvas!");
    }).

    error(function (data, status, headers, config) {
      console.error(status);
      alerta($ionicPopup, "Notificação", "Problema no servidor, tente novamente.");
      console.log('Error Config');
    });
	};

}]);