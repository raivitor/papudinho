app.controller('Cartoes', ['$scope', '$http',  function($scope, $http) {
  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/', 
        method: "GET",
        params: {
          user: window.localStorage['id']
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

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 500);
    }
  }

  timedCount();

  function atualizar() {
    var time;
    if(window.localStorage['atualizarCartao'] == 1){
      clearTimeout(time);
      window.localStorage['atualizarCartao'] = 0;
      location.reload();
    }
    else{
      time = setTimeout(function(){ atualizar() }, 500);
    }
  }
  
  atualizar();

}]);