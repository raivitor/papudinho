app.controller('Cartoes', ['$scope', '$http', '$interval','$window', function($scope, $http, $interval, $window) {
  atualizar();

  $scope.vencidos = [];
  $scope.atuais = [];


  $scope.controleFiltroCartoes = 0;

  $scope.viewCartao = function(id){
    console.log(id);
    $window.location = '#/cartaoHistorico/' + id;
  }


  //$interval(atualizar, 100000, false);
  function atualizar(){


   if($scope.controleFiltroCartoes == 1){
      $scope.labelCartao = "Cartões Vencidos";

    }else{
      $scope.labelCartao = "Cartões Válidos";
    }
    


    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/cards/', 
      method: "GET",
      params: {
        user: G_usuario.id
      }
    }).

    success(function (data, status, headers, config) {
      $scope.$broadcast('scroll.refreshComplete');
      
      $scope.msg = " ";
      console.log(data);

      if(data == 0){
        $scope.msg = "Ainda não tem cartão em nenhum bar!";
      }else{


        $scope.vencidos = [];
        $scope.atuais = [];
        
        for (var i = 0; i < data.length; i++) {

          var parts = data[i].due_date.split('-');
          var dataFim = new Date(parts[2],parts[1]-1,parts[0]); 

          var dataAtual = new Date();

          if(dataAtual > dataFim){
            $scope.vencidos.push(data[i])
          }else{
            $scope.atuais.push(data[i])
          }
        };

        //$scope.Cartoes = $scope.atuais;


      }
    }).

    error(function (data, status, headers, config) {
      $scope.$broadcast('scroll.refreshComplete');
      console.log('Error cartoes');
    });
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.doRefresh = function() {
    atualizar();
  }

  $scope.mudar = function() {

    console.log($scope.controleFiltroCartoes);

    if($scope.controleFiltroCartoes == 1){
      $scope.labelCartao = "Cartões Vencidos";
      $scope.controleFiltroCartoes = 0;
      $scope.Cartoes = $scope.atuais;

    }else{

      $scope.labelCartao = "Cartões Válidos";
      $scope.Cartoes = $scope.vencidos;
      $scope.controleFiltroCartoes = 1;
    }

  }



}]);