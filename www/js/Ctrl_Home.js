app.controller('Home', ['$scope', '$http', '$ionicModal', '$ionicPopup','$rootScope','$window','$location', function($scope, $http, $ionicModal, $ionicPopup, $rootScope,$window,$location) {
  window.localStorage['login'] = 1;


function getGpS(){
  //Localizacao do GPS
    navigator.geolocation.getCurrentPosition(function(position) {
      window.localStorage['latitude'] = position.coords.latitude;
      window.localStorage['longitude'] = position.coords.longitude;
      console.log(position.coords.latitude, position.coords.longitude)
    }, function(error) {
        console.log('Erro ao pegar localização: ' + error.message);
    });//{ timeout: 60000 });

}

  function timedCount() {
    getGpS()
    document.getElementsByClassName("title").innerHTML = "teste";
    var time;
    if(window.localStorage['login'] == 1){
      //clearTimeout(time);
      $http({
        url: 'http://developer-papudinho.herokuapp.com/webservice/cards/due_date', 
        method: "GET",
        params: {
          user: G_usuario.id
        }
      }).

      success(function (data, status, headers, config) {
        console.log(data)
        $scope.CartoesVencimento = data;
        if(data == 0){
          $scope.msg = "Nenhum clube a expirar";
        }
        else{
          $scope.msg = "Clubes perto do vencimento";
        }
      }).

      error(function (data, status, headers, config) {
        console.log('Error home');
      });

      return 0;
    }
    else{
      time = setTimeout(function(){ timedCount() }, 2000);
    }
  }

  timedCount();



  $scope.checkin = function(bar){
    $http({
    url: 'http://developer-papudinho.herokuapp.com/webservice/check_in', 
    method: "POST",
    params: {
      bar_id: bar,
      user_id: G_usuario.id
    }
  }).

  success(function (data, status, headers, config) {
    $scope.closeModal(1);
    alerta($ionicPopup, "Check-in", "Check-in realizado com sucesso!");
  }).

  error(function (data, status, headers, config) {
    $scope.closeModal(1);
    alerta($ionicPopup, "Check-in", "Erro ao realizar Check-in, tente novamente.");
    console.error('Checkin');
  });
  }

//convide
 $scope.convideAmigo = function() {
    console.log('amigo')
     window.plugins.socialsharing.share('Estou usando o Papudinho Clube do Whisky, vamos tomar uma?!');
     $scope.closeModal(2);
 };

 $scope.convideApp = function() {
    console.log('app')
     window.plugins.socialsharing.share('Baixe o app na GOOGLE PLAY (http://urele.com/Papudinho-Android) ou na APP STORE (http://urele.com/PAPUDINHO-IOS) e entre para o maior clube de apreciadores de Whisky do mundo =D');
     $scope.closeModal(2);
 };


  $scope.sugerir = function() {
    console.log('sugeir')
    $scope.closeModal(2)
    $scope.closeModal(1)
    $location.path("/addBar");
     //$window.location.href = '/#/addBar';
 };



// Modal 1
    $ionicModal.fromTemplateUrl('my-modal.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('shared-modal.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
        console.log('Modal ' + modal.id + ' is shown!');


        console.log(window.localStorage['latitude'],window.localStorage['longitude'])
        $http({
          url: 'http://developer-papudinho.herokuapp.com/webservice/get_near_bars', 
          method: "GET",
          params: {
            latitude: window.localStorage['latitude'],
            longitude: window.localStorage['longitude']
          }
        }).

        success(function (data, status, headers, config) {
          $scope.Bares = data;
        }).

        error(function (data, status, headers, config) {
          console.log('Error bares');
        });

    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });


}]);