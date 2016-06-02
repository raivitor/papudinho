// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'ngCordova', 'ngMask', 'firebase']);


window.addEventListener('getiduser', function(event) {
  directpush.on(event.detail, function(data){
    var event = new CustomEvent('directpush', { detail: data });
    window.dispatchEvent(event);
  })
});



app.run(function($ionicPlatform, $ionicHistory, $location, $ionicPopup) {


  document.addEventListener("backbutton", onBackKeyDown, false);

  function onBackKeyDown() {
    //faz nada
  }


  window.addEventListener('directpush', function (e) {

    $ionicPopup.alert({
     title: e.detail.bar_name,
     template: e.detail.message
    });

    directpush.clean(localStorage.getItem('user_id'));
   }, false);

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.hide();
      //StatusBar.styleLightContent();
    }

    getAppVersion(function(version) {
        window.localStorage['version'] = version;
    });

    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      return StatusBar.hide();
    }

    $ionicPlatform.registerBackButtonAction(function(e){
      str = window.location.href;
      if(str.indexOf("login") > 0){
        navigator.app.exitApp();
      }
      //else if(str.indexOf("meuscartoes") >= 0 || str.indexOf("amigos") >= 0 || str.indexOf("bares") >= 0 || str.indexOf("cartoes") >= 0 || str.indexOf("promocao") >= 0 || str.indexOf("dados") >= 0 || str.indexOf("config") >= 0){
        //$location.path('/menu/home');
      //}
      else{
        $ionicHistory.goBack();
        e.preventDefault();
      }
      return false;
    },501);

    /**
    * GetLocation() fica pegando a posição atual do usuario, a função está em funcoes.js
    */
    var localizacao = setInterval(GetLocation, G_tempo);

    //Localizacao do GPS
    navigator.geolocation.watchPosition(function(position) {
      window.localStorage['latitude'] = position.coords.latitude;
      window.localStorage['longitude'] = position.coords.longitude;
      console.log(position.coords.latitude, position.coords.longitude)
    }, function(error) {
        console.log('Erro ao pegar localização: ' + error.message);
    }, { timeout: 60000 });

  });


});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle("center");
  //$ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.views.transition("android");
  //$ionicConfigProvider.views.maxCache(0);
  $stateProvider

    .state('login', {
      cache: false,
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
      cache: false,
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home"
        }
      }
    })

    .state('eventmenu.meuscartoes', {
      url: "/meuscartoes",
      views: {
        'menuContent' :{
          templateUrl: "meuscartoes"
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
      cache: false,
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


    .state('eventmenu.sobre', {
      url: "/sobre",
      views: {
        'menuContent' :{
          templateUrl: "sobre"
        }
      }
    })

    .state('eventmenu.bar', {
      url: "/barmsg",
      views: {
        'menuContent' :{
          templateUrl: "barmsg"
        }
      }
    })


    .state('promocaoId', {
      url: '/promocao/:id',
      templateUrl: 'promocao'
    })

    .state('bar', {
      url: '/bar/:id',
      templateUrl: 'bar'
    })

    .state('addCartao', {
      cache: false,
      url: '/addCartao',
      templateUrl: 'addCartao'
    })

    .state('addAmigo', {
      url: '/addAmigo',
      templateUrl: 'addAmigo'
    })

    .state('chat', {
      url: '/chat/:chatId/:nome/:relacionamento',
      templateUrl: 'chat'
    })

    .state('cartao', {
      url: '/cartao/:cartaoId',
      templateUrl: 'cartao'
    })

    .state('updatecartao', {
      cache: false,
      url: '/updatecartao/:cartaoId',
      templateUrl: 'updatecartao'
    })

    .state('cartaodetalhe', {
      cache: false,
      url: '/cartaodetalhe/:cartaoId/:histId',
      templateUrl: 'cartaodetalhe'
    })


    .state('cartaoBarHistorico', {
      cache: false,
      url: '/cartaoBarHistorico/:cartaoId',
      templateUrl: 'views/cartao_historico.html'
    })

    .state('barmsg', {
      cache: false,
      url: '/barmsg',
      templateUrl: 'views/bar_msg.html'
    })

    .state('barmsgmessages', {
      cache: false,
      url: '/messages/:id',
      templateUrl: 'views/messages.html'
    })

    .state('addBar', {
      cache: false,
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

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    initPushwoosh();
}

  function initPushwoosh(idUser){
    var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;

        if(typeof(userData) != "undefined") {
            //alert('user data: ' + JSON.stringify(userData));
        }

        console.log(userData.custom_data.promotion_id);

        window.open('http://developer-papudinho.herokuapp.com/promocao/'+userData.custom_data.promotion_id, '_blank', 'location=yes','closebuttoncaption=FECHAR');

    });

    //initialize Pushwoosh with projectid: "78196470103", pw_appid : "60C72-3A9F2".
    pushNotification.onDeviceReady({ projectid: "78196470103", pw_appid : "60C72-3A9F2" });

    //register for pushes
    pushNotification.registerDevice(
        function(status) {
          var pushToken = status;
          console.warn('push token: ' + pushToken);
          //Usuario.UpdateToken(idUser, pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
            alert(JSON.stringify(['failed to register ', status]))
        }
    );
    pushNotification.getPushToken(
      function(token)
      {
          //alert(token);
          console.warn('push token: ' + token);
          window.localStorage['token'] = token;
      }
);
}
