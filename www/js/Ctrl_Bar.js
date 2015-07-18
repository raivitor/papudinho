app.controller('Bar', ['$scope', '$stateParams',  function($scope, $stateParams) {
	$scope.bar = bares.getId($stateParams.id);
}]);