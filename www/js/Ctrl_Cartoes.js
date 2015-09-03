app.controller('Cartoes', ['$scope', '$http',  function($scope, $http) {
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
      $scope.Cartoes = data;
      if(data == 0){
        $scope.msg = "Sem cartões, para cadastrar um novo cartão clique no +";
      }
    }).

    error(function (data, status, headers, config) {
      console.log('Error cartoes');
    });
  }
}]);