app.controller('Config', ['$scope', '$http',  function($scope, $http) {

	$scope.promocoes = G_usuario.promotion;
	$scope.gps = G_usuario.gps;
	$scope.visibilidade = G_usuario.visibility;

	$scope.ConfigChange = function() {
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
      //console.log("Deu certo");
    }).

    error(function (data, status, headers, config) {
      console.log('Error Config');
    });
	};

}]);