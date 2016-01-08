app.controller('Promocoes', ['$scope', '$http',  function($scope, $http) {
  $scope.data = {};
  $scope.data.busca = "";
  $scope.FiltroTags = function(item) {
    var trecho = $scope.data.busca;
    var palavra = trecho.split(" ");
    cont = 0;
    for (var i = 0; i < palavra.length; i++) {
      if(item.description.toUpperCase().indexOf(palavra[i].toUpperCase()) != -1)
        cont++;
    };
    if(cont == palavra.length)
      return true;
    else 
      return false;
  };

  function Atualizar () {
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/promotions/', 
      method: "GET"
    }).

    success(function (data, status, headers, config) {
      if(data == 0){
        $scope.msg = "Nenhuma promoção disponível no momento."
      } else {
        $scope.msg = "";
        $scope.Promocoes = data;
      }
    }).

    error(function (data, status, headers, config) {
      console.log('Error promocoes');
    });

    $scope.$broadcast('scroll.refreshComplete');
  }

  Atualizar();
  $scope.doRefresh = function() {
    Atualizar();
  }
}]);