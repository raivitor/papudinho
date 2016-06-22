// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'ngCordova', 'ngMask', 'firebase']);


var servidor = "http://teste-papudinho.herokuapp.com";
//var servidor = "http://developer-papudinho.herokuapp.com";

window.addEventListener('getiduser', function(event) {
  directpush.on(event.detail, function(data){
    var event = new CustomEvent('directpush', { detail: data });
    window.dispatchEvent(event);
  })
});



app.run(function($ionicPlatform, $ionicHistory, $location, $ionicPopup, $http) {


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
      cordova.plugins.Keyboard.disableScroll(true);
      cordova.plugins.Keyboard.hideAccessoryBar(false);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.hide();
      //StatusBar.styleLightContent();
    }

    getAppVersion(function(version) {
        window.localStorage['version'] = version;
    });

/*
    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      return StatusBar.hide();
    }
    */

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

    var params = [fid, latitude, longitude, radius];
      DGGeofencing.startMonitoringRegion(params, function(result) {}, function(error) {
          alert("failed to add region");
      });

    //Localizacao do GPS
    navigator.geolocation.watchPosition(function(position) {
      window.localStorage['latitude'] = position.coords.latitude;
      window.localStorage['longitude'] = position.coords.longitude;
      console.log(position.coords.latitude, position.coords.longitude)
    }, function(error) {
        console.log('Erro ao pegar localização: ' + error.message);
    }, { timeout: 60000 });//{ timeout: 60000 });

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

    .state('eventmenu.barMensagem', {
      cache: false,
      url: "/barMensagem",
      views: {
        'menuContent' :{
          templateUrl: "barMensagem"
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

    .state('eventmenu.logoff', {
      url: "/logoff",
      views: {
        'menuContent' :{
          templateUrl: "logoff"
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
      cache: false,
      templateUrl: 'promocao'
    })

    .state('bar', {
      url: '/bar/:id',
      cache: false,
      templateUrl: 'bar'
    })

    .state('addCartao', {
      cache: false,
      url: '/addCartao',
      templateUrl: 'addCartao'
    })

    .state('addAmigo', {
      url: '/addAmigo',
      cache: false,
      templateUrl: 'addAmigo'
    })

    .state('chat', {
      url: '/chat/:chatId/:nome/:relacionamento',
      cache: false,
      templateUrl: 'chat'
    })

    .state('chatUsuarios', {
      url: '/chat/:chatId/:nome',
      cache: false,
      templateUrl: 'chat'
    })

    .state('cartao', {
      url: '/cartao/:cartaoId',
      cache: false,
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

var G_usuario = [];

/**
* Tempo de atualização da posição
    1m - 60,000ms
    5m - 300,000ms
    10m - 600,000ms
    15m - 900,000ms
*/
var G_tempo = 300000;

var G_bares = [];

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    initPushwoosh();

    
}

  function initPushwoosh(idUser,$window){
   

    var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

    



  var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");


  if(deviceType == "iPhone" || deviceType == "iPad"){
    //set push notification callback before we initialize the plugin
    document.addEventListener('push-notification', function(event) {
                                var notification = event.notification;

                                try {

                                    var id = notification.userdata.custom_data.promotion_id;
                                    window.open(servidor+'/promocao/'+id, '_blank', 'location=yes','closebuttoncaption=FECHAR');

                                }catch(err) {

                                  alert(notification.aps.alert);
                                }
                                
                                pushNotification.setApplicationIconBadgeNumber(0);
                            });
 
    //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"60C72-3A9F2"});
     
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var deviceToken = status['deviceToken'];
            //console.warn('registerDevice: ' + deviceToken);
            window.localStorage['token'] = deviceToken;
        },
        function(status) {
            console.warn('failed to register : ' + JSON.stringify(status));
            alert(JSON.stringify(['failed to register ', status]));
        }
    );
     
    //reset badges on app start
    pushNotification.setApplicationIconBadgeNumber(0);


  }else { 

    console.log(">>>>>>>>>>" + idUser)

    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;

        try {

          console.log(userData);
          console.log(userData.custom_data.promotion_id);
          window.open(servidor+'/promocao/'+userData.custom_data.promotion_id, '_blank', 'location=yes','closebuttoncaption=FECHAR');

        }catch(err) {

          alert(title);
        }


    });

    //initialize Pushwoosh with projectid: "78196470103", pw_appid : "60C72-3A9F2".
    pushNotification.onDeviceReady({ projectid: "78196470103", pw_appid : "60C72-3A9F2" });

    //register for pushes
    pushNotification.registerDevice(
        function(status) {
          var pushToken = status;
          console.warn('push token: ' + JSON.stringify(pushToken));
          window.localStorage['token'] = pushToken;
          
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
           
        }
    );
   
  }
}
