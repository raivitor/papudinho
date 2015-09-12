app.controller('Bares', ['$scope', '$http',  function($scope, $http) {
  $http({
    url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
    method: "GET"
  }).

  success(function (data, status, headers, config) {
    G_bares = data;
    $scope.Bares = data;
  }).

  error(function (data, status, headers, config) {
    console.log('Error bares');
  });
}]);