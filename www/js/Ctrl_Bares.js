app.controller('Bares', ['$scope', '$http',  function($scope, $http) {
  if(window.localStorage['atualizarBar'] == 1){
    window.localStorage['atualizarBar'] = 0;
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
      method: "GET"
    }).

    success(function (data, status, headers, config) {
      G_bares = data;
      $scope.Bares = data;
      console.log(data);
    }).

    error(function (data, status, headers, config) {
      console.log('Error bares');
    });

    return 0;
  }
}]);