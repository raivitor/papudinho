app.controller('AddAmigo', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.submitamigo = function() {
    if($scope.email == undefined){
      $scope.msg = "O campo 'Email' está vazio";
      return 0;
    }
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/new_friendship', 
      method: "POST",
      params: {
        id: window.localStorage['id'],
        email: $scope.email
      }
    }).

    success(function (data, status, headers, config) {
      window.localStorage['atualizarAmigo'] = 1
      $location.path('/menu/amigos'); 
    }).

    error(function (data, status, headers, config) {
      console.log('Error add Amigo');
    });

    return 0; 
  }
}]);