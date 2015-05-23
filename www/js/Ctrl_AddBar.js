app.controller('AddBar', ['$scope', '$http', '$location', '$ionicPopup', function($scope, $http, $location, $ionicPopup) {

  $scope.lati = 0;
  $scope.longi = 0;

  var onSuccess = function(position) {
    $scope.lati = position.coords.latitude;
    $scope.longi = position.coords.longitude;
    /*
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
      */
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  $scope.submitbar = function() {
    if($scope.nome == undefined){
      $scope.msg = "O campo 'Nome' está vazio";
      return 0;
    }
    if($scope.tel == undefined){
      $scope.msg = "O campo 'Telefone' está vazio";
      return 0;
    }
    if($scope.endr == undefined){
      $scope.msg = "O campo 'Endereço' está vazio";
      return 0;
    }
    if($scope.email == undefined){
      $scope.email = "";
    }
    $scope.msg = ""
    alert("Longitude: "+$scope.longi);
/*
    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/new_friendship', 
      method: "POST",
      params: {
        id: window.localStorage['id'],
        email: $scope.email
      }
    }).

    success(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Amizade criada com sucesso!");
      window.localStorage['atualizarAmigo'] = 1
      $location.path('/menu/amigos'); 
    }).

    error(function (data, status, headers, config) {
      console.log('Error add Amigo');
    });*/

    return 0; 
  }
}]);