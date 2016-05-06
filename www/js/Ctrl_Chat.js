app.controller('Chat', ['$scope', '$stateParams', '$firebaseArray', '$ionicScrollDelegate', '$interval', '$ionicNavBarDelegate', function($scope, $stateParams, $firebaseArray, $ionicScrollDelegate, $interval, $ionicNavBarDelegate) {
  $scope.meuName = G_usuario.id;
  $scope.nameAmigo = $stateParams.chatId;
  $ionicNavBarDelegate.title($stateParams.nome);
  var ref;

  /**
  * Garantir que o 'id' menor seja escrito primeiro.
  */
  if(G_usuario.id < $stateParams.chatId){
    ref = new Firebase("https://chat-prot.firebaseio.com/"+G_usuario.id+""+$stateParams.chatId);
  } else{
    ref = new Firebase("https://chat-prot.firebaseio.com/"+$stateParams.chatId+""+G_usuario.id);
  }

  $scope.messages = $firebaseArray(ref);

  $scope.addMessage = function() {

    var dados = {
      name: G_usuario.id,
      text: $scope.message
    }

    $scope.messages.$add(dados);

    var req = {
      method: 'POST',
      url: 'http://developer-papudinho.herokuapp.com/webservice/chat',
      params:{
        name: G_usuario.id,
        text: $scope.message
      }
    }

    $http(req).
      then(
        function (sucesso) {
          console.log(sucesso);          
        },
        function(fail){}
      );


     $scope.message = "";
     $ionicScrollDelegate.scrollBottom();
  };

  stopTime = $interval(atualizar, 1000, false);
  flag = 0;
  function atualizar(){
    if(flag == 0){
      if($scope.messages.length > 0){
        console.log($scope.messages);
        flag = 1;
        $interval.cancel(stopTime);
      }
      $ionicScrollDelegate.scrollBottom();  
    }
  }

}]);