app.factory('CartoesPessoais', ['$http', function($http){
  var cartoes = 0;
  /**
  * -1: Erro de servidor
  *  1: Sucesso
  */
  function getCartoes(id){
    if(cartoes == 0){
      var req = {
        method: 'GET',
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/particular',
        params:{
          user: id
        }
      }
      $http(req).
        then(function (sucesso) {
          console.log(sucesso);
          cartoes = sucesso;
          return cartoes;
        },
        function(fail){
          console.error("fail getCartoes - id"+id);
          return -1;
        });
    }
    return cartoes;
  }

  function atualizar(id){
    var req = {
      method: 'GET',
      url: 'http://developer-papudinho.herokuapp.com/webservice/cards/particular/',
      params: { 
        user: id
      }
    }

    $http(req).
      then(function (sucesso) {
        cartoes = sucesso;
        return 1;
      },
      function(fail){
        return -1;
      });
  }

  function deletar(cardId, userId){
    var req = {
      method: 'GET',
      url: 'http://developer-papudinho.herokuapp.com/webservice/delete_card/',
      params: { 
        user_id: userId,
        card_id: cardId
      }
    }

    $http(req).
      then(function (sucesso) {
        atualizar(userId);
        return 1;
      },
      function(fail){
        console.error(fail);
        return -1;
      });
  }

  function getId(id){
    var i;
    x = cartoes.data;
    for (i = 0; i < x.length; i++) {
      if(x[i].id == id)
        return x[i];
    }
    return -1;
  }

  return {
    getCartoes: getCartoes,
    atualizar: atualizar,
    getId: getId, 
    deletar: deletar
  }
}]);