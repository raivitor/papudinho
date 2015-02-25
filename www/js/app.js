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


      function teste(){
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
          teste();
          setTimeout(recursiva,1000);
      }

      
      recursiva();
      console.log('Success');
      app.controller('MainCtrl', function($scope, $http) {
       $http.get('http://developer-papudinho.herokuapp.com/webservice/bars/').then(function(resp) {
          console.log('Success', resp);
          $scope.array = resp.data;
          // For JSON responses, resp.data contains the result
        }, function(err) {
          console.error('ERR', err);
          // err.status will contain the status code
        })
      })

