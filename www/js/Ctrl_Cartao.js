//Historico
app.controller('Cartao', ['$scope', '$ionicPopup', 'CartoesPessoais', '$stateParams', '$location', '$interval','$http', function($scope, $ionicPopup, CartoesPessoais, $stateParams, $location, $interval,$http) {
  
  $interval(atualizar, 2000, false);


  function atualizar(){

    var partes = location.href.split('/');
    var tamanho = partes.length
    var id =  partes[tamanho-1]
    $scope.id = id;

    var req = {
        method: 'GET',
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/'+id,
      }
      $http(req).
        then(function (sucesso) {
          console.log(sucesso.data[0]);
          
          $scope.cartao = sucesso.data[0].historics;
          $scope.id = sucesso.data[0].id;
          
          $scope.bar = sucesso.data[0].bar;
          $scope.drink = sucesso.data[0].drink;
          $scope.vencimento = sucesso.data[0].due_date;
          $scope.total_doses = sucesso.data[0].total_doses;
          $scope.historico = sucesso.data[0].historics;
          
        },
        function(fail){
          console.error("fail getCartoes - id"+id);
          return -1;
        });
    
    //window.localStorage['LastImgCard'] = $scope.historico[$scope.historico.length-1].image_card.url;
    //window.localStorage['LastImgDrink'] = $scope.historico[$scope.historico.length-1].image_drink.url;
  }
  atualizar();

  $scope.deletar = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Apagar clube',
      template: 'Deseja apagar todos os dados deste clube?',
      cancelText: 'Cancelar',
      cancelType: 'button-positive',
      okText: 'Apagar',
      okType: 'button-assertive'
    });
    confirmPopup.then(function(res) {
      if(res) {
        CartoesPessoais.deletar($scope.id, G_usuario.id);
        $location.path('/menu/meuscartoes'); 
      }
    });
   };

}]);