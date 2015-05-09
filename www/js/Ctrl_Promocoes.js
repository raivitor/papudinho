app.controller('Promocoes', ['$scope', '$http',  function($scope, $http) {
  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/promotions/', 
        method: "GET"
      }).

      success(function (data, status, headers, config) {
        if(data == 0){
          $scope.msg = "Nenhuma promoção disponível no momento."
        }
        $scope.Promocoes = data;
      }).

      error(function (data, status, headers, config) {
        console.log('Error promocoes');
      });

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 500);
    }
  }

  timedCount();
}]);