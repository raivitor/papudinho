app.controller('CartaoDetalhe', ['$scope', 'CartoesPessoais', '$stateParams', function($scope, CartoesPessoais, $stateParams) {
  $scope.cartao = CartoesPessoais.getId($stateParams.cartaoId);
  $scope.bar = $scope.cartao.bar;
  $scope.drink = $scope.cartao.drink;
  $scope.vencimento = $scope.cartao.due_date;
  $scope.total_doses = $scope.cartao.total_doses;
  $scope.historico = $scope.cartao.historics;
  $scope.detalhe = $scope.historico.getId($stateParams.histId);
}]);