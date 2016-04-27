app.controller('CartaoBarHistorico', ['$scope', '$http', '$interval','$location','$state', function($scope, $http, $interval, $location,$state) {
  
  $scope.viewCartao = function(id){
    console.log(id);
    $location.path("/cartao/"+id)
  }


  //$scope.atualizar = function(){
    console.log($state.params.cartaoId);

    $http({
      url: 'http://developer-papudinho.herokuapp.com/webservice/cards/'+$state.params.cartaoId, 
      method: "GET",
    }).

    success(function (data, status, headers, config) {
      $scope.$broadcast('scroll.refreshComplete');

      var dados = [];



      $scope.historico =  data[0].historics;
      $scope.total_doses = data[0].total_doses;
      $scope.drink = data[0].drink;

      $scope.bar = data[0].bar;
      $scope.msg = " ";
      console.log(data);
      if(data == 0){
        $scope.msg = "Ainda não tem cartão em nenhum bar!";
      }
    }).

    error(function (data, status, headers, config) {
      $scope.$broadcast('scroll.refreshComplete');
      console.log('Error cartoes');
    });
    $scope.$broadcast('scroll.refreshComplete');
 // });

 
}]);