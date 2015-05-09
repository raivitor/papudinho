app.controller('Bares', ['$scope', '$http',  function($scope, $http) {
  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
        method: "GET"
      }).

      success(function (data, status, headers, config) {
        $scope.Bares = data;
      }).

      error(function (data, status, headers, config) {
        console.log('Error bares');
      });

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 500);
    }
  }

  timedCount();
}]);