
function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}

app.controller('Chat', function($scope, $http, $rootScope, Amizade){

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
