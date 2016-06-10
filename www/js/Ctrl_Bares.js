app.controller('Bares', ['$scope', '$http','$ionicModal' , function($scope, $http,$ionicModal) {
  $http({
    url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
    method: "GET",
    params:{
          latitude: window.localStorage['latitude'],
          longitude: window.localStorage['longitude']
        }
  }).

  success(function (data, status, headers, config) {
    G_bares = data;
    $scope.Bares = data;
  }).

  error(function (data, status, headers, config) {
    console.log('Error bares');
  });


$scope.modal = function(bar){

  console.log(bar)
  $scope.bar = bar;
  $scope.oModal1.show();
}



$scope.geolocalizar = function(bar){


  var mapa = "http://maps.google.com/maps?q="+bar.latitude+","+bar.longitude
  console.log(mapa)
  cordova.InAppBrowser.open(mapa, '_blank', 'location=yes');
}

$scope.closeModal = function(bar){

  $scope.oModal1.hide();
}

  $ionicModal.fromTemplateUrl('bar-modal.html', {
      id: '1', 
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });


  $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

  $scope.$on('modal.hidden', function(event, modal) {
    console.log('Modal ' + modal.id + ' is hidden!');
  });

  $scope.$on('$destroy', function() {
    console.log('Destroying modals...');
    $scope.oModal1.remove();
  });    

}]);