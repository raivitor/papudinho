app.controller('Chat', ['$scope', '$stateParams', '$firebaseArray', '$ionicScrollDelegate', '$interval' ,function($scope, $stateParams, $firebaseArray, $ionicScrollDelegate, $interval) {
  $scope.meuName = G_usuario.id;
  $scope.nameAmigo = $stateParams.chatId;
  var ref;
  if(G_usuario.id < $stateParams.chatId){
    ref = new Firebase("https://chat-prot.firebaseio.com/"+G_usuario.id+""+$stateParams.chatId);
  } else{
    ref = new Firebase("https://chat-prot.firebaseio.com/"+$stateParams.chatId+""+G_usuario.id);
  }

  $scope.messages = $firebaseArray(ref);

  $scope.addMessage = function() {
    $scope.messages.$add({
      name: G_usuario.id,
      text: $scope.message
    });
     $scope.message = "";
  };

  stopTime = $interval(atualizar, 1000, false);
  flag = 0;
  function atualizar(){
    if(flag == 0){
      if($scope.messages.length > 0){
        flag = 1;
        $interval.cancel(stopTime);
      }
      $ionicScrollDelegate.scrollBottom();  
    }
  }

}]);