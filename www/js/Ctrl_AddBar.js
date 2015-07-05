app.controller('AddBar', ['$scope', '$http', '$location', '$ionicPopup', function($scope, $http, $location, $ionicPopup) {
  $scope.submitbar = function() {
    if($scope.name == undefined){
      $scope.msg = "O campo 'Nome' está vazio";
      return 0;
    }
    if($scope.phone == undefined){
      $scope.msg = "O campo 'Telefone' está vazio";
      return 0;
    }
    if($scope.state == undefined){
      $scope.msg = "O campo 'Estado' está vazio";
      return 0;
    }
    if($scope.city == undefined){
      $scope.msg = "O campo 'Cidade' está vazio";
      return 0;
    }
    if($scope.district == undefined){
      $scope.msg = "O campo 'Bairro' está vazio";
      return 0;
    }
    if($scope.street == undefined){
      $scope.msg = "O campo 'Rua' está vazio";
      return 0;
    }
    if($scope.number == undefined){
      $scope.msg = "O campo 'Número' está vazio";
      return 0;
    }
    if($scope.email == undefined){
      $scope.email = "";
    }
    $scope.msg = "";
    
    GetLocation();
    console.log("latitude: "+window.localStorage['latitude']);
    console.log("longitude: "+window.localStorage['longitude']);

    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/create_suggestion', 
      method: "POST",
      params: {
        name: $scope.name,
        phone: $scope.phone,
        state: $scope.state,
        city: $scope.city,
        district: $scope.district,
        street: $scope.street,
        number: $scope.number,
        latitude: window.localStorage['latitude'],
        longitude: window.localStorage['longitude'],
        email: $scope.email
      }
    }).

    success(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Bar sugerido com sucesso!");
      //$location.path('/menu/amigos'); 
    }).

    error(function (data, status, headers, config) {
      console.log('Error add Bar');
    });

    return 0; 
  }
}]);