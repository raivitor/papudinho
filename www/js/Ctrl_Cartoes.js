app.controller('Cartoes', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  $interval(atualizar, 1000, false);
  
  function atualizar(){
    if(window.localStorage['atualizarCartao'] == 1){
      window.localStorage['atualizarCartao'] = 0;
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
        if(data == 0){
          $scope.msg = "Sem cartões, para cadastrar um novo cartão clique no +";
        }
      }).

      error(function (data, status, headers, config) {
        $scope.$broadcast('scroll.refreshComplete');
        console.log('Error cartoes');
      });
    }
  }

  //atualizar();
  $scope.doRefresh = function() {
    atualizar();
  }
}]);