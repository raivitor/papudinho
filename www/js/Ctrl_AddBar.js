app.controller('AddBar', ['$scope', '$http', '$location', '$ionicPopup', function($scope, $http, $location, $ionicPopup) {
  $scope.name = "";
  $scope.phone = "";
  $scope.state = "";
  $scope.city = "";
  $scope.district = "";
  $scope.street = "";
  $scope.number = "";
  $scope.email = "";

  $scope.Gps = function(){
    GetLocation();

    $http({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+window.localStorage['latitude']+','+window.localStorage['longitude']+'&sensor=true', 
      method: "GET"
    }).

    success(function (data, status, headers, config) {
      $scope.street = data.results[0].address_components[1].short_name;
      $scope.district = data.results[0].address_components[2].short_name;
      $scope.city = data.results[0].address_components[3].short_name;
      $scope.state = data.results[0].address_components[5].short_name;
    }).

    error(function (data, status, headers, config) {
      console.log(data);
    });
  }

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
      url: servidor+'/webservice/create_suggestion', 
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