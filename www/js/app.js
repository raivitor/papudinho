// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    
    .state('login', {
      url: '/login',
      templateUrl: 'login'
    })
    
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup'
    })

    .state('eventmenu', {
      url: "/menu",
      abstract: true,
      templateUrl: "sideMenu"
    })

    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home"
        }
      }
    })

    .state('eventmenu.cartoes', {
      url: "/cartoes",
      views: {
        'menuContent' :{
          templateUrl: "cartoes"
        }
      }
    })

    .state('eventmenu.promocao', {
      url: "/promocao",
      views: {
        'menuContent' :{
          templateUrl: "promocao"
        }
      }
    })

    .state('eventmenu.amigos', {
      url: "/amigos",
      views: {
        'menuContent' :{
          templateUrl: "amigos"
        }
      }
    })

    .state('eventmenu.bares', {
      url: "/bares",
      views: {
        'menuContent' :{
          templateUrl: "bares"
        }
      }
    })

    .state('addCartao', {
      url: '/addCartao',
      templateUrl: 'addCartao'
    })

    .state('addBar', {
      url: '/addBar',
      templateUrl: 'addBar'
    })

    .state('addAmigo', {
      url: '/addAmigo',
      templateUrl: 'addAmigo'
    })

    .state('timeline', {
      url: '/timeline',
      templateUrl: 'timeline'
    })

    ;
  
  $urlRouterProvider.otherwise('/login');
});


app.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
/*
      function initialize() {
        var myLatlng = new google.maps.LatLng(-5.794478499999999000,-35.210953099999980000);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
/*
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }

*/
/*
      var mapDiv = document.getElementById('map');
      $("#addBar").load('pageload', function() {
          //alert("oi");
        //initialize();
        //google.maps.event.addDomListener(window, 'load', initialize);
      });
      $("#addBar").ready(function( $ ) {
          google.maps.event.addDomListener(window, 'load', initialize);
        //alert("oi");
      });
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Pegando localização',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Não foi possível pegar localização: ' + error.message);
        });
      };
      */
    });

      function initialize() {
        var myLatlng = new google.maps.LatLng(-5.794478499999999000,-35.210953099999980000);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
    /*
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });*/

       // $scope.map = map;
      }


      // Testa a cada segundo se o usuario está na página do mapa, se tiver ele inicializa.
      function InicializarMapa(){
        //alert(window.location.href);
        var url = window.location.href;
        var bar = "addBar";
        //console.log(url.search(bar));
        if(url.search(bar)>0){
          //alert("entrei");
          initialize();
        }
        
      }

      var recursiva = function () {
          //console.log("Se passaram 1 segundo!");
          InicializarMapa();
          setTimeout(recursiva,1000);
      }

      recursiva();
      

      app.controller('LoginForm', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {
        window.localStorage['login'] = 0;
        $scope.submit = function() {
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/authenticate_user/', 
            method: "POST",
            params: {
              email: $scope.email,
              password: $scope.senha
            }
          }).

          success(function (data, status, headers, config) {
            console.log('Success', status);
            window.localStorage['login'] = 1;
            window.localStorage['id'] = data.id;
            window.localStorage['email'] = data.email;
            window.localStorage['name'] = data.name;
            $location.path('/menu/home');  
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro");
          });
        };
      }])


      app.controller('CadastroForm', ['$scope', '$http', '$location',  function($scope, $http, $location) {
        $scope.submitcadastro = function() {
          if($scope.password == $scope.password2){
            $http({
              url: 'http://developer-papudinho.herokuapp.com/webservice/registering_user/', 
              method: "POST",
              params: {
                name: $scope.user,
                email: $scope.email,
                password: $scope.password,
                password_confirmation: $scope.password2
              }
            }).

            success(function (data, status, headers, config) {
              console.log('Success', status);
              $location.path('home');  
            }).

            error(function (data, status, headers, config) {
              $scope.erro = "Erro ao cadastrar, tente novamente mais tarde.";
              console.log('Error');
            });
          }
          else{
            $scope.erro = "Senhas diferentes";
          }
          
        };
      }]);

    app.controller('Home', ['$scope', '$http',  function($scope, $http) {
      
      $scope.msg = "Cartões perto do vencimento (falta css)";

      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/cards/due_date', 
            method: "GET",
            params: {
              user: window.localStorage['id']
            }
          }).

          success(function (data, status, headers, config) {
            console.log('Success', status);
            $scope.CartoesVencimento = data;
            if(data == 0){
              $scope.msg = "Nenhum cartão perto do vencimento (falta css)";
            }
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro");
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();
    }]);
  
  app.controller('Bares', ['$scope', '$http',  function($scope, $http) {
      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
            method: "GET"
          }).

          success(function (data, status, headers, config) {
            console.log('Success', status);
            $scope.Bares = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro");
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();
    }]);

  app.controller('Cartoes', ['$scope', '$http',  function($scope, $http) {
      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/cards/', 
            method: "GET",
            params: {
              //user: 3
              user: window.localStorage['id']
            }
          }).

          success(function (data, status, headers, config) {
            console.log('Success', status);
            $scope.Cartoes = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro");
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();
    }]);

  app.controller('Promocoes', ['$scope', '$http',  function($scope, $http) {
      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/promotions/', 
            method: "GET"
          }).

          success(function (data, status, headers, config) {
            console.log('Success', status);
            $scope.Promocoes = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro");
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();
    }]);

  app.controller('NovoCartao', ['$scope', '$http',  function($scope, $http) {
      $scope.volume = 10;
      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/drinks/', 
            method: "GET"            
          }).

          success(function (data, status, headers, config) {
            console.log('Success bebida', data);
            $scope.Bebidas = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro");
          });

          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
            method: "GET"
          }).

          success(function (data, status, headers, config) {
            console.log('Success', status);
            $scope.Bares = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro");
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();
    }]);