app.controller('AddAmigo', ['$scope', '$http', '$location', '$ionicPopup', function($scope, $http, $location, $ionicPopup) {
  
  $http({
      url: servidor+'/webservice/users', 
      method: "GET"
    }).

    success(function (data, status, headers, config) {

      var lista = [];
      console.log(data.length);

      for (var i = 0; i < data.length; i++) {
        
        if(data[i].id != G_usuario.id){

          lista.push(data[i]);
        }

      };

      console.log(lista.length);
      $scope.users = lista;
    }).

    error(function (data, status, headers, config) {
      console.log('Error add Amigo: '+data);
  });

  $scope.Adicionar = function(email, nome) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Adicionar Amigo',
      template: 'Deseja adicionar '+nome+' ?',
      cancelText: 'Não',
      cancelType: 'button-assertive',
      okText: 'Adicionar',
      okType: 'button-positive'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.submitamigo(email);
      }
    });
 };

  $scope.submitamigo = function(email) {
    console.log(email,G_usuario.id)
/*
    return false;
    */
    $http({
      url: servidor+'/webservice/new_friendship', 
      method: "POST",
      params: {
        id: G_usuario.id,
        email: email
      }
    }).

    success(function (data, status, headers, config) {
      console.log(data)
      if(data.msg == "Amizade já existe."){
        alerta($ionicPopup, "Notificação", "Amizade já existe!");
      } else{
        alerta($ionicPopup, "Notificação", "Amizade criada com sucesso!");
        $scope.nome = "";
        window.localStorage['atualizarAmigo'] = 1;
        $location.path('/menu/amigos'); 
      }
      
    }).

    error(function (data, status, headers, config) {
      alerta($ionicPopup, "Notificação", "Problema no servidor, tente novamente!");
      console.log('Error add Amigo: '+data);
    });
  }
}]);