
function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}

app.controller('Chat', function($scope, $http, $rootScope, Amizade,$location){

  $scope.myGoBack = function() {
    $location.path("/menu/home")
  };

  var user_id = window.localStorage['user_id'];



  $scope.chats = [];

  Papuchat.getChats(user_id, function(data){
     console.log(data);
     safeApply($scope, function(){
       $scope.chats = data;
     })
   });


 $rootScope.excluirAmizade = function(){
    console.log("asd")
    var partes = location.href.split('/');
    var tamanho = partes.length
    console.log(partes[tamanho-1]);

    var r = confirm("Deseja excluir a amizade?");
    if (r == true) {
        Amizade.RecusarAmizade(partes[tamanho-1])
        window.history.back();
    }
 }

});

app.controller('Messages', function($scope, $state, $ionicScrollDelegate){

  var chat_uuid = $state.params.id;
  var from_id = window.localStorage['user_id'];
  $scope.user_id = from_id;
  var to_id = "";
  var from = "";
  var to = "";

  console.log(chat_uuid)

  $scope.messages = [];


  Papuchat.getMessages(chat_uuid, function(data){
    console.log(data);


    if(data.length > 0){
      to_id = data[0].from_id;
      from = data[0].to;
      to = data[0].from;
    }

    safeApply($scope, function(){
      $scope.messages = data;
      $ionicScrollDelegate.scrollBottom();
    })

  });

  $scope.text = "";

  $scope.send = function(){
    Papuchat.send(chat_uuid, {
      to_id: to_id,
      from_id: from_id,
      from: from,
      to: to,
      text: $scope.text
    });

    $scope.text = "";
  };

});


app.controller('ChatUsuarios', ['$scope', '$stateParams', '$firebaseArray', '$ionicScrollDelegate', '$interval', '$ionicNavBarDelegate','$http', function($scope, $stateParams, $firebaseArray, $ionicScrollDelegate, $interval, $ionicNavBarDelegate, $http) {
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
