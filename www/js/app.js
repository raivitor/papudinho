// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'ngCordova', 'ngMask']);

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
    
    /**
    * GetLocation() fica pegando a posição atual do usuario, a função está em funcoes.js
    */
    var localizacao = setInterval(GetLocation, G_tempo); 

  });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle("center");
  //$ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.views.transition("android");
  $ionicConfigProvider.views.maxCache(0);
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

    .state('eventmenu.config', {
      url: "/config",
      views: {
        'menuContent' :{
          templateUrl: "config"
        }
      }
    })

    .state('bar', {
      url: '/bar/:id',
      templateUrl: 'bar'
    })

    .state('addCartao', {
      url: '/addCartao',
      templateUrl: 'addCartao'
    })

    .state('addAmigo', {
      url: '/addAmigo',
      templateUrl: 'addAmigo'
    })

    .state('chat', {
      url: '/chat/:chatId',
      templateUrl: 'chat'
    })

    .state('addBar', {
      url: '/addBar',
      templateUrl: 'addBar'
    })
    ;
  
  $urlRouterProvider.otherwise('/login');
});

/**
* Adicionando um novo método no objeto 'Array'
*/
Array.prototype.getId = function(id) {
    var i;
    for (i = 0; i < this.length; i++) {
      if(this[i].id == id)
        return this[i];
    }
    return 0;
}

/* Guarda as informações do usuário. Exemplo abaixo:
"id": 11,
"email": "raivitor@gmail.com",
"created_at": "2015-03-02T00:55:46.865Z",
"updated_at": "2015-03-02T00:55:46.865Z",
"name": "teste3",
"user_type": "Sub-usuário",
"master_id": null,
"bar_id": null,
"phone": null,
"cpf": null,
"promotion": true,
"gps": true,
"visibility": true
*/
var G_usuario = []; 

/**
* Tempo de atualização da posição
    1m - 60,000ms
    5m - 300,000ms
    10m - 600,000ms
    15m - 900,000ms
*/
var G_tempo = 300000;

/* Guarda os bares. Exemplo:
"id": 1,
"name": "Casimiro",
"city": "Angicos",
"street": "Centro",
"number": "23",
"phone": "(84) 9654-489",
"created_at": "2015-01-20T13:58:30.540Z",
"updated_at": "2015-07-31T15:41:04.425Z",
"avatar": {
"url": "http://res.cloudinary.com/durxmldew/image/upload/v1438357264/wtfzq4qfcvvtqmwwbbbw.jpg",
"thumb": {
"url": "http://res.cloudinary.com/durxmldew/image/upload/c_fill,h_50,w_50/v1438357264/wtfzq4qfcvvtqmwwbbbw.jpg"
}
},
"district": "Alto da Esperança",
"state": "RN",
"CNPJ": "12.321.321/3123-21",
"social_reason": "Bar e somente bar.",
"responsible": "Marcos Oliveira",
"logo": {
"url": "http://res.cloudinary.com/durxmldew/image/upload/v1438357265/gadv9kxjxuw9kyvl6f5c.jpg",
"thumb": {
"url": "http://res.cloudinary.com/durxmldew/image/upload/c_fill,h_50,w_50/v1438357265/gadv9kxjxuw9kyvl6f5c.jpg"
}
},
"cep": "32132-132",
"latitude": "-5.668664499999999",
"longitude": "-36.6062205",
"site": "casimiro.com",
"email": "casimiro@email.com",
"twitter": "@casimiro",
"ad_package": "básico",
"note": ""
*/
var G_bares = [];