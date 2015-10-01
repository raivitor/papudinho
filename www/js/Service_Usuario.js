app.factory('Usuario', ['$http', function($http){
  var cartoes = 0;
  /**
  * -1: Erro de servidor
  *  1: Sucesso
  */

  function UpdateToken(idUser, tokenUser){
    if(cartoes == 0){
      var req = {
        method: 'POST',
        url: 'http://developer-papudinho.herokuapp.com/webservice/device_token',
        params:{
          id: idUser, 
          token: tokenUser
        }
      }
      $http(req).
        then(function (sucesso) {
          console.warn("Sucesso token");
          console.log(sucesso);
        },
        function(fail){
          console.error("Fail token");
          console.log(fail);
        });
    }
  }

  return {
    UpdateToken: UpdateToken
  }
}]);