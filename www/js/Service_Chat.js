app.factory('CartoesPessoais', ['$http', function($http){
  var cartoes = [];
/**
* -1: Erro de servidor
*/
  function getCartoes(id){
    if(!cartoes){
      var req = {
        method: 'GET',
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/particular/',
        data: { 
          user: id
        }
      }
      $http.get(req).
        then(function (sucesso) {
          cartoes = sucesso;
        },
        function(fail){
          return -1;
        });
    } else {
      console.log("Não precisou");
    }
    return cartoes;
  }

  function atualizar(id){
    var req = {
      method: 'GET',
      url: 'http://developer-papudinho.herokuapp.com/webservice/cards/particular/',
      data: { 
        user: id
      }
    }

    $http.get(req).
      then(function (sucesso) {
        cartoes = sucesso;
        return true;
      },
      function(fail){
        return false;
      });
  }

  return {
    getCartoes: getCartoes,
    atualizar: atualizar
  }
}]);

/*
angular.module('app.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var Chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return Chats;
    },
    remove: function(chat) {
      Chats.splice(Chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < Chats.length; i++) {
        if (Chats[i].id === parseInt(chatId)) {
          return Chats[i];
        }
      }
      return null;
    }
  };
  
});
*/