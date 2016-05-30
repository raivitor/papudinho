app.controller('MeusCartoes', ['$scope', '$http', '$interval', 'CartoesPessoais', function($scope, $http, $interval, CartoesPessoais) {
  
  $scope.checked = true;

  $scope.controle = false;

  $scope.loadAtualizar = function(){
    atualizar();
  }
  
  $scope.mudarVencido = function(){
    
      $scope.checked = true;
      var req = {
        method: 'GET',
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/particular',
        params:{
          user: G_usuario.id
        }
      }
      $http(req).
        then(function (sucesso) {
          console.log(sucesso);
          $scope.cartoes = sucesso.data.vencidos;
          $scope.checked = false;
          $scope.msg = "CLUBE VENCIDOS";
          return cartoes;
        },
        function(fail){
          console.error("fail getCartoes - id"+id);
          return -1;
        });
  }

  $scope.mudarAberto = function(){

      $scope.checked = true;
      var req = {
        method: 'GET',
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/particular',
        params:{
          user: G_usuario.id
        }
      }
      $http(req).
        then(function (sucesso) {
          console.log(sucesso);
          $scope.cartoes = sucesso.data.aberto;
          $scope.checked = false;
          $scope.msg = "CLUBES ABERTOS";
          return cartoes;
        },
        function(fail){
          console.error("fail getCartoes - id"+id);
          return -1;
        });
  }

  atualizar();

//  $interval(atualizar, 1000, false);
  function atualizar(){


      var req = {
        method: 'GET',
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/particular',
        params:{
          user: G_usuario.id
        }
      }
      $http(req).
        then(function (sucesso) {
          console.log(sucesso);
          $scope.cartoes = sucesso.data.aberto;
          $scope.cartoesAbertos = cards.data.aberto;
          $scope.cartoesVencidos = cards.data.vencidos;
          $scope.checked = false;
          return cartoes;
        },
        function(fail){
          console.error("fail getCartoes - id"+id);
          return -1;
        });

   $scope.checked = false;
   
    if($scope.cartoes == false){
      $scope.msg = "Nenhum clube cadastrado no momento";
      $scope.checked = false;
    }


    else if($scope.cartoes == -1){
      $scope.msg = "Erro no servidor";
      $scope.checked = false;
    } else if($scope.cartoes){
      $scope.checked = false;
    }
  }





}]);