app.controller('Bar', ['$scope', '$stateParams',  function($scope, $stateParams) {
	$scope.bar = G_bares.getId($stateParams.id);
}]);