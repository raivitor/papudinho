app.controller('AddBar', ['$scope', '$http', '$location', '$ionicPopup', function($scope, $http, $location, $ionicPopup) {
  $scope.name = "";
  $scope.phone = "";
  $scope.state = "";
  $scope.city = "";
  $scope.district = "";
  $scope.street = "";
  $scope.number = "";
  $scope.email = "";
  $scope.submitbar = function() {
    $scope.msg = "";
    
    GetLocation();
    // console.log("latitude: "+window.localStorage['latitude']);
    // console.log("longitude: "+window.localStorage['longitude']);

    if(window.localStorage['latitude'] == undefined){
      $scope.msg = "Ligue o GPS para termos uma localização precisa" ;  
      return 0;
    }

    if(window.localStorage['longitude'] == undefined){
      $scope.msg = "Ligue o GPS para termos uma localização precisa" ;  
      return 0;
    }

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
      $location.path('/menu/bares'); 
    }).

    error(function (data, status, headers, config) {
      console.log('Error add Bar: '+data);
    });

    return 0; 
  }
}]);