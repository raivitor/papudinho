app.controller('Back', ['$scope', '$ionicHistory',  function($scope, $ionicHistory) {
   $scope.myGoBack = function() {
   	window.history.back();
    //$ionicHistory.goBack();
  };
}]);