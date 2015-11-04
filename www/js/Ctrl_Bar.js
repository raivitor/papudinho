app.controller('Bar', ['$scope', '$stateParams',  function($scope, $stateParams) {
	$scope.bar = G_bares.getId($stateParams.id);

	$scope.link = function(site){
		var ref = window.open('http://www.'+site, '_blank', 'location=yes');
		var myCallback = function() { 

		}
		ref.addEventListener('loadstart', myCallback);
		//ref.removeEventListener('loadstart', myCallback);
		//window.open(site, '_blank', 'location=yes');
	}
}]);