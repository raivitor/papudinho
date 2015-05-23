// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'lr.upload']);

app.run(function($ionicPlatform, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    $ionicPlatform.registerBackButtonAction(function(e){
      str = window.location.href;
      if(str.indexOf("login") > 0){
        navigator.app.exitApp();
      }
      else{
        $ionicHistory.goBack();
        e.preventDefault();
      }
      
      return false;
    },101);

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

    .state('senha', {
      url: '/senha',
      templateUrl: 'senha'
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

    .state('eventmenu.dados', {
      url: "/dados",
      views: {
        'menuContent' :{
          templateUrl: "dados"
        }
      }
    })

    .state('addCartao', {
      url: '/addCartao',
      templateUrl: 'addCartao'
    })

    .state('addAmigo', {
      url: '/addAmigo',
      templateUrl: 'addAmigo'
    })

    .state('addBar', {
      url: '/addBar',
      templateUrl: 'addBar'
    })
    ;
  
  $urlRouterProvider.otherwise('/login');
});