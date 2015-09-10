app.controller('Chat', ['$scope', '$stateParams', '$firebaseArray',  function($scope, $stateParams, $firebaseArray) {
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
    console.log($scope.messages);
    $scope.messages.$add({
      name: G_usuario.id,
      text: $scope.message
    });
     $scope.message = "";
  };
}]);