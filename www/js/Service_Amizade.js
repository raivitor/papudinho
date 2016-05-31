app.factory('Amizade', ['$http', function($http){
  /**
  * -1: Erro de servidor
  */

  function getAllAmigos(myId){
    var req = {
      method: 'GET',
      url: 'http://developer-papudinho.herokuapp.com/webservice/friends',
      params: { 
        id: myId
      }
    }

    return $http(req).
      then(function (sucesso) {
        //console.log(sucesso);
        return sucesso.data;
      },
      function(fail){
        return -1;
      });
  }

  function getAllSolicitacoes(myId){
    var req = {
      method: 'GET',
      url: 'http://developer-papudinho.herokuapp.com/webservice/friends/new',
      params: { 
        id: myId
      }
    }

    return $http(req).
      then(function (sucesso) {
        //console.log(sucesso);
        return sucesso.data;
      },
      function(fail){
        return -1;
      });
  }

  function NovaAmizade(myId, emailAmigo){

  }

  function AceitarAmizade(idSolicitacao){
    var req = {
      method: 'POST',
      url: 'http://developer-papudinho.herokuapp.com/webservice/friends/acept',
      params: { 
        id: idSolicitacao
      }
    }

    return $http(req).
      then(function (sucesso) {
        console.log(sucesso);
        return sucesso.data;
      },
      function(fail){
        return -1;
      });
  }

  function RecusarAmizade(idSolicitacao){
    var req = {
      method: 'POST',
      url: 'http://developer-papudinho.herokuapp.com/webservice/friends/remove',
      params: { 
        id: idSolicitacao
      }
    }

    return $http(req).
      then(function (sucesso) {
        console.log(sucesso);
        return sucesso.data;
      },
      function(fail){
        return -1;
      });
  }

  function RemoverAmigo(idAmizade){
    console.log(idAmizade)
  }

  return {
    getAllAmigos: getAllAmigos,
    getAllSolicitacoes: getAllSolicitacoes,
    AceitarAmizade: AceitarAmizade,
    RecusarAmizade: RecusarAmizade,
    RemoverAmigo: RemoverAmigo
  };
}]);