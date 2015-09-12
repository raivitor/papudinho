app.controller('Chat', ['$scope', '$stateParams', '$firebaseArray', '$ionicScrollDelegate', function($scope, $stateParams, $firebaseArray, $ionicScrollDelegate) {
  $scope.meuName = G_usuario.id;
  $scope.nameAmigo = $stateParams.chatId;
  var ref;
  if(G_usuario.id < $stateParams.chatId){
    ref = new Firebase("https://chat-prot.firebaseio.com/"+G_usuario.id+""+$stateParams.chatId);
    console.log("https://chat-prot.firebaseio.com/"+G_usuario.id+""+$stateParams.chatI);
  } else{
    ref = new Firebase("https://chat-prot.firebaseio.com/"+$stateParams.chatId+""+G_usuario.id);
  }

  $scope.messages = $firebaseArray(ref);

  //console.log($scope.messages.length);

  $scope.addMessage = function() {
    $scope.messages.$add({
      name: G_usuario.id,
      text: $scope.message
    });
     $scope.message = "";
  };

 // $ionicScrollDelegate.scrollBottom();

}]);