app.controller('Promocoes', ['$scope', '$http',  function($scope, $http) {
  function Atualizar () {
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/promotions/', 
      method: "GET"
    }).

    success(function (data, status, headers, config) {
      if(data == 0){
        $scope.msg = "Nenhuma promoção disponível no momento."
      } else {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.msg = "";
        $scope.Promocoes = data;
      }
    }).

    error(function (data, status, headers, config) {
      $scope.$broadcast('scroll.refreshComplete');
      console.log('Error promocoes');
    });
  }
  Atualizar();
  $scope.doRefresh = function() {
    Atualizar();
  }
}]);