app.controller('Cartoes', ['$scope', '$http', function($scope, $http) {
  atualizar();
  //$interval(atualizar, 2000, false);
  function atualizar(){
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/cards/', 
      method: "GET",
      params: {
        user: G_usuario.id
      }
    }).

    success(function (data, status, headers, config) {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.Cartoes = data;
      $scope.msg = " ";
      console.log(data);
      if(data == 0){
        $scope.msg = "Ainda não tem cartão em nenhum bar!";
      }
    }).

    error(function (data, status, headers, config) {
      $scope.$broadcast('scroll.refreshComplete');
      console.log('Error cartoes');
    });
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.doRefresh = function() {
    atualizar();
  }
}]);