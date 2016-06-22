
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


var chat_uuid = null;
var from_id = null;
var to_id = "";
var from = "";
var to = "";

app.controller('Messages', function($scope, $state, $ionicScrollDelegate){

  chat_uuid = $state.params.id;
  from_id = window.localStorage['user_id'];
  $scope.user_id = from_id;
  to_id = "";
  from = "";
  to = "";



  console.log(chat_uuid)

  $scope.messages = [];


  Papuchat.getMessages(chat_uuid, function(data){
    console.log(data);

    if(data.length > 0){
      to_id = data[0].from_id;
      from = data[0].to;
      to = data[0].from;
    }

    user_id = window.localStorage['user_id'];

    for (var i = 0; i < data.length; i++) {
      if(Number(user_id) == Number(data[i].from_id)){
        data[i].class = "chat-eu";
      } else {
        data[i].class = "chat-amigo";
      }
    }

    safeApply($scope, function(){
      $scope.messages = data;
      $ionicScrollDelegate.scrollBottom();
    })

  });

  $scope.text = "";



});

function sendUserBarMessage(){
  var textarea = document.getElementById("message");
  if(textarea.value != ""){

    Papuchat.send(chat_uuid, {
      to_id: to_id,
      from_id: from_id,
      from: from,
      to: to,
      text: textarea.value
    });

    textarea.value = "";
    document.getElementById("message").focus();
  }
};

app.controller('ChatUsuarios', ['$scope', '$stateParams', '$firebaseArray', '$ionicScrollDelegate', '$interval', '$ionicNavBarDelegate','$http', function($scope, $stateParams, $firebaseArray, $ionicScrollDelegate, $interval, $ionicNavBarDelegate, $http) {
  $scope.meuName = localStorage.getItem('user_id');
  $scope.nameAmigo = $stateParams.chatId;
  $ionicNavBarDelegate.title($stateParams.nome);
  var ref;
  $scope.ju = "hello";

  $scope.my_name = null;
  $http.get(servidor+'/webservice/users/'+$scope.meuName).then(function(res){
    $scope.my_name  = res.data[0].name ;
  });

  $scope.other_name = null;
  $http.get(servidor+'/webservice/users/'+$scope.nameAmigo).then(function(res){
    $scope.other_name  = res.data[0].name ;
  });

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
    if(document.getElementById('message').value != ""){

        var dados = {
          name: localStorage.getItem('user_id'),
          text: document.getElementById('message').value
        }
        console.log(dados);
        $scope.messages.$add(dados);


//

        //add mensagem
        /*
        var req = {
          method: 'POST',
          url: servidor+'/webservice/chat',
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
        */
        // com Push
        var chatuuid;
        if(localStorage.getItem('user_id') < $stateParams.chatId){
          chatuuid = localStorage.getItem('user_id')+""+$stateParams.chatId;
        } else{
          chatuuid = $stateParams.chatId+""+localStorage.getItem('user_id');
        }

        var data = {
            name: $scope.my_name,
            message: document.getElementById('message').value,
            to_id: $stateParams.chatId,
            chatuuid: chatuuid
        }

        $http.post(servidor + '/webservice/chat/notification',data).then(function () {
          console.log('sucesso com o push');
         });

    }
    document.getElementById('message').value = "";
    document.getElementById("message").focus();
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
