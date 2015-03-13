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
      

      app.controller('LoginForm', ['$scope', '$http', '$location', function($scope, $http, $location) {
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
            alert("Erro Home");
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
            $scope.Bares = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error');
            alert("Erro Bares");
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
            $scope.Cartoes = data;
            if(data == 0){
              $scope.msgCartoes = "Sem cartões!";
            }
          }).

          error(function (data, status, headers, config) {
            console.log('Error cartoes');
            alert("Erro");
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();

      function atualizar() {
        var time;
        if(window.localStorage['atualizar'] == 1){
          clearTimeout(time);
          window.localStorage['atualizar'] = 0;

          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/cards/', 
            method: "GET",
            params: {
              user: window.localStorage['id']
            }
          }).

          success(function (data, status, headers, config) {
            $scope.Cartoes = data;
            if(data == 0){
              $scope.msgCartoes = "Sem cartões!";
            }
          }).

          error(function (data, status, headers, config) {
            console.log('Error cartoes');
            alert("Erro");
          });

          return 0;

        }
        else{
          time = setTimeout(function(){ atualizar() }, 500);
        }
      }
      
      atualizar();

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

  app.controller('Amigos', ['$scope', '$http',  function($scope, $http) {
      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/friends', 
            method: "GET",
            params: {
              id: window.localStorage['id']
              //user: window.localStorage['id']
            }
          }).

          success(function (data, status, headers, config) {
            console.log('Success', status);
            $scope.Amigos = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error ');
            alert("Erro Amigos");
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();
    }]);

  app.controller('addAmigo', ['$scope', '$http', '$location', function($scope, $http, $location) {

      $scope.submitamigo = function() {
        $http({
          url: 'http://developer-papudinho.herokuapp.com/webservice/new_friendship', 
          method: "POST",
          params: {
            id: window.localStorage['id'],
            email: $scope.email
          }
        }).

        success(function (data, status, headers, config) {
          console.log('Success', status);
          alert("Amigo Adicionado com sucesso");
          //scope.$apply();
          $location.path('/menu/amigos'); 
        }).

        error(function (data, status, headers, config) {
          console.log('Error ');
          alert("Erro add Amigo");
        });

        return 0; 
      }
    }]);

  app.controller('NovoCartao', ['$scope', '$http', '$location', function($scope, $http, $location) {
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

      $scope.submitcartao = function() {
        arrayOfObjects = $scope.Bebidas;
        id_bebida = 0; flag = 0;
        for (var i = 0; i < arrayOfObjects.length; i++) {
            var object = arrayOfObjects[i];
            for (var property in object) {
                //alert('item ' + i + ': ' + property + '=' + object[property]);
                if(property == "id"){
                  id_bebida = object[property];
                }
                if(object[property] = $scope.bebida){
                  flag = 1;
                  break;
                }
            }
            if(flag == 1)
              break;
          }
          
          arrayOfObjects = $scope.Bares;
          id_bar = 0; flag = 0;
          for (var i = 0; i < arrayOfObjects.length; i++) {
            var object = arrayOfObjects[i];
            for (var property in object) {
                //alert('item ' + i + ': ' + property + '=' + object[property]);
                if(property == "id"){
                  id_bar = object[property];
                }
                if(object[property] = $scope.bar){
                  flag = 1;
                  break;
                }
            }
            if(flag == 1)
              break;
          }
        $http({
          url: 'http://developer-papudinho.herokuapp.com/webservice/new_card', 
          method: "POST",
          params: {
            drink_id: id_bebida,
            bar_id: id_bar,
            user_id: window.localStorage['id'],
            due_date: "30/03/2015",
            total_doses: $scope.volume
          }
        }).

        success(function (data, status, headers, config) {
          console.log('Success', status);
          alert("Cartão Adicionado");
          window.localStorage['atualizar'] = 1;
          $location.path('/menu/cartoes'); 
        }).

        error(function (data, status, headers, config) {
          console.log('Error ', data);
          alert("Erro add Cartao");
        });

        return 0; 
      }
    }]);