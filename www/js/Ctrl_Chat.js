
function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}

app.controller('Chat', function($scope, $http){

  var user_id = window.localStorage['user_id'];
  $scope.chats = [];

  Papuchat.getChats(user_id, function(data){
     console.log(data);
     for (var i = 0; i < data.length; i++) {
       if (data[i].from_id != user_id)
       (function(i){
         $http.get('http://developer-papudinho.herokuapp.com/webservice/get_bar?id=' + data[i].from_id)
         .then(function(res){
           safeApply($scope, function(){
             $scope.chats[i].thumb = res.data.avatar.thumb.url;
             console.log(res.data.avatar.thumb.url);
           });
         });
       })(i);
     }

     safeApply($scope, function(){
       $scope.chats = data;
     })
   });

});

app.controller('Messages', function($scope, $state, $ionicScrollDelegate){

  var chat_uuid = $state.params.id;
  var from_id = window.localStorage['user_id'];
  $scope.user_id = from_id;
  var to_id = "";
  var from = "";
  var to = "";

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
