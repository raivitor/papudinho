app.controller('Config', ['$scope', '$http', '$ionicPopup', function($scope, $http, $ionicPopup) {

	$scope.promocoes = G_usuario.promotion;
	$scope.gps = G_usuario.gps;
	$scope.visibilidade = G_usuario.visibility;

	$scope.submitConfig = function() {
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/update_config/', 
      method: "POST",
      params: {
        id: G_usuario.id,
        promotion: $scope.promocoes,
        gps: $scope.gps,
        visibility: $scope.visibilidade
      }
    }).
    success(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Configurações salvas!");
      //console.log("Deu certo");
    }).

    error(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Problema no servidor, tente novamente.");
      console.log('Error Config');
    });
	};

}]);