app.controller('Amigos', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  
  $interval(atualizar, 1000, false);
  
  function atualizar() {
    if(window.localStorage['atualizarAmigo'] == 1){
      window.localStorage['atualizarAmigo'] = 0;
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/friends', 
        method: "GET",
        params: {
          id: G_usuario.id
        }
      }).

      success(function (data, status, headers, config) {
        if( data == 0){
          $scope.msg = "Você ainda não tem amigos, clique no + para adicionar novos amigos";
        } else{
          $scope.Amigos = data;  
        }
      }).

      error(function (data, status, headers, config) {
        console.log('Error Amigos');
      });
    } 
  }

}]);