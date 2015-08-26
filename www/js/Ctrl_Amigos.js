app.controller('Amigos', ['$scope', '$http',  function($scope, $http) {

  function timedCount() {
    var time;
    if(window.localStorage['login'] == 1){
      clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/friends', 
        method: "GET",
        params: {
          id: window.localStorage['id']
        }
      }).

      success(function (data, status, headers, config) {
        if( data == 0){
          $scope.msg = "Você ainda não tem amigos, clique no + para adicionar novos amigos";
        }
        $scope.Amigos = data;

      }).

      error(function (data, status, headers, config) {
        console.log('Error Amigos');

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
    if(window.localStorage['atualizarAmigo'] == 1){
      clearTimeout(time);
      window.localStorage['atualizarAmigo'] = 0;

      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/friends', 
        method: "GET",
        params: {
          id: window.localStorage['id']
        }
      }).

      success(function (data, status, headers, config) {
        $scope.msg = " ";
        $scope.Amigos = data;
      }).

      error(function (data, status, headers, config) {
        console.log('Error Amigos');
      });

    }
    else{
      time = setTimeout(function(){ atualizar() }, 500);
    }
  }
  
  atualizar();
}]);