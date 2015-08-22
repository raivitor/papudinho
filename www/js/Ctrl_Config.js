app.controller('Config', ['$scope',  function($scope) {
	/*
	console.log(window.localStorage['gps']);
	window.localStorage['gps'] = 1;
	gps = window.localStorage['gps'];
  	$scope.promocoes = { checked: window.localStorage['promotion'] == 0 };
  	$scope.gps = { checked: gps.valueOf() };
  	$scope.visibilidade = { checked: window.localStorage['visibility'] == true };
	*/
  	$scope.NotificationChange = function(id) {
  		switch (id){
  			case 1:
  				break;
  			case 2:
  				break;
  			case 3:
  				break;
  		}
  	};
}]);