app.controller('Home', ['$scope', '$http',  function($scope, $http) {
  window.localStorage['login'] = 1;
  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/due_date', 
        method: "GET",
        params: {
          user: G_usuario.id
        }
      }).

      success(function (data, status, headers, config) {
        $scope.CartoesVencimento = data;
        if(data == 0){
          $scope.msg = "Nenhum cartão perto do vencimento";
        }
        else{
          $scope.msg = "Cartões perto do vencimento";
        }
      }).

      error(function (data, status, headers, config) {
        console.log('Error home');
      });

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 1000);
    }
  }

  timedCount();

  function atualizar() {
    var time;
    if(window.localStorage['atualizarHome'] == 1){
      clearTimeout(time);
      window.localStorage['atualizarHome'] = 0;
      location.reload();
    }
    else{
      time = setTimeout(function(){ atualizar() }, 1000);
    }
  }
  
  atualizar();
}]);