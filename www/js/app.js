// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var app = angular.module('app', ['ionic', 'lr.upload']);

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

    .state('timeline', {
      url: '/timeline',
      templateUrl: 'timeline'
    })

    ;
  
  $urlRouterProvider.otherwise('/login');
});
      
      function alerta (alert, titulo, msg) {
        alert.alert({
         title: titulo,
         template: msg
       });
      }

      app.controller('LoginForm', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.msg = " ";
        window.localStorage['login'] = 0;
        $scope.submit = function() {
          $scope.msg = " ";
          //$scope.email = "teste2@teste.com";
         // $scope.senha = "12345678";
          if($scope.senha.length < 8 ){
            $scope.msg = "Senha precisa ter 8 ou mais dígitos";
            return 0;
          }
          $scope.msg = "Aguarde um momento";

          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/authenticate_user/', 
            method: "POST",
            params: {
              email: $scope.email,
              password: $scope.senha
            }
          }).

          success(function (data, status, headers, config) {
            $scope.msg = "";
            window.localStorage['atualizarHome'] = 1;
            window.localStorage['login'] = 1;
            window.localStorage['id'] = data.id;
            window.localStorage['email'] = data.email;
            window.localStorage['name'] = data.name;
            $location.path('/menu/home');  
          }).

          error(function (data, status, headers, config) {
            console.log('Error LoginForm');
            $scope.msg = "Usuário ou senha incorretos";
          });
        };
      }])


      app.controller('CadastroForm', ['$scope', '$http', '$location', '$ionicPopup',  function($scope, $http, $location, $ionicPopup) {
        $scope.submitcadastro = function() {

          if($scope.user == undefined ){
            $scope.msg = "O campo 'Nome' está vazio";
            return 0;
          }

          if($scope.email == undefined ){
            $scope.msg = "O campo 'Email' está vazio";
            return 0;
          } 

          if($scope.password == undefined ){
            $scope.msg = "O campo 'Senha' está vazio";
            return 0;
          } 

          if($scope.password2 == undefined ){
            $scope.msg = "O campo 'Confirmar Senha' está vazio";
            return 0;
          } 
          
          if($scope.password.length < 8 ){
            $scope.msg = "Senha precisa ter 8 ou mais dígitos";
            return 0;
          }

          if($scope.password != $scope.password2){
            $scope.msg = "Senhas diferentes";
            return 0;
          }

          $scope.msg = "Aguarde um momento";

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
            $scope.msg = "";
            alerta($ionicPopup, "Notificação", "Cadastro realizado com sucesso!");
            $location.path('home');  
          }).

          error(function (data, status, headers, config) {
            $scope.msg = "Erro ao cadastrar, tente novamente mais tarde.";
            console.log('Error CadastroForm');
          });
        }
      }]);

    app.controller('NovaSenha', ['$scope', '$http', '$location',  function($scope, $http, $location) {
        $scope.submitsenha = function() {
          if($scope.email == undefined ){
            $scope.msg = "O campo 'Email' está vazio";
            return 0;
          } 
          $scope.msg = "";
          
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/reset_password/', 
            method: "POST",
            params: {
              email: $scope.email
            }
          }).

          success(function (data, status, headers, config) {
            $location.path('home');  
          }).

          error(function (data, status, headers, config) {
            $scope.msg = "Erro ao enviar a nova senha, tente novamente mais tarde.";
            console.log('Error NovaSenha');
          });
        }
      }]);

    app.controller('Home', ['$scope', '$http',  function($scope, $http) {
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
            $scope.CartoesVencimento = data;
            if(data == 0){
              $scope.msg = "Nenhum cartão perto do vencimento";
            }
            else{
              $scope.msg = "Cartões perto do vencimento";
            }
          }).

          error(function (data, status, headers, config) {
            console.log('Error home');
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
        if(window.localStorage['atualizarHome'] == 1){
          clearTimeout(time);
          window.localStorage['atualizarHome'] = 0;
          location.reload();
        }
        else{
          time = setTimeout(function(){ atualizar() }, 500);
        }
      }
      
      atualizar();
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
            console.log('Error bares');
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
              user: window.localStorage['id']
            }
          }).

          success(function (data, status, headers, config) {
            $scope.Cartoes = data;
            if(data == 0){
              $scope.msg = "Sem cartões, para cadastrar um novo cartão clique no +";
            }
          }).

          error(function (data, status, headers, config) {
            console.log('Error cartoes');
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
        if(window.localStorage['atualizarCartao'] == 1){
          clearTimeout(time);
          window.localStorage['atualizarCartao'] = 0;
          location.reload();
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
            if(data == 0){
              $scope.msg = "Nenhuma promoção disponível no momento."
            }
            $scope.Promocoes = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error promocoes');
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
            }
          }).

          success(function (data, status, headers, config) {
            if( data == 0){
              $scope.msg = "Você ainda não tem amigos, clique no + para adicionar novos amigos";
            }
            $scope.Amigos = data;

          }).

          error(function (data, status, headers, config) {
            console.log('Error Amigos');

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
        if(window.localStorage['atualizarAmigo'] == 1){
          clearTimeout(time);
          window.localStorage['atualizarAmigo'] = 0;

          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/friends', 
            method: "GET",
            params: {
              id: window.localStorage['id']
            }
          }).

          success(function (data, status, headers, config) {
            $scope.Amigos = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error Amigos');
          });

        }
        else{
          time = setTimeout(function(){ atualizar() }, 500);
        }
      }
      
      atualizar();
    }]);

  app.controller('addAmigo', ['$scope', '$http', '$location', function($scope, $http, $location) {

      $scope.submitamigo = function() {
        if($scope.email == undefined){
          $scope.msg = "O campo 'Email' está vazio";
          return 0;
        }
        if($scope.phone == undefined){
          $scope.msg = "O campo 'Telefone' está vazio";
          return 0;
        }
        $http({
          url: 'http://developer-papudinho.herokuapp.com/webservice/new_friendship', 
          method: "POST",
          params: {
            id: window.localStorage['id'],
            email: $scope.email
          }
        }).

        success(function (data, status, headers, config) {
          window.localStorage['atualizarAmigo'] = 1
          $location.path('/menu/amigos'); 
        }).

        error(function (data, status, headers, config) {
          console.log('Error add Amigo');
        });

        return 0; 
      }
    }]);

  app.controller('NovoCartao', ['$scope', '$http', '$location', 'upload', function($scope, $http, $location, upload) {
      $scope.doses = 10;
      var image = 0;
      var arquivo;

      $scope.capturePhoto = function() {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 20,  targetWidth: 300, targetHeight: 300,  destinationType: Camera.DestinationType.FILE_URI  });
      }

      function onSuccess(imageData) {
       // $scope.imgURI = "";
        //document.getElementById('imagem').src = imageData;
        //alert(document.getElementById('imgURI').src);
        //$scope.imgURI = "data:image/jpeg;base64," + imageData;
        //alert(imageData);
        /*
        window.resolveLocalFileSystemURI(imageData, function(fileEntry) {
            alert(fileEntry.fullPath);
            Plugin.callNativeFunction(nativePluginResultHandler, nativePluginErrorHandler, 'success', fileEntry.fullPath);
        }, onError);  */

        window.resolveLocalFileSystemURL(imageData, onResolveSuccess2, fail2);

        function onResolveSuccess2 (fileentry) {
          $scope.imgURI = fileentry.toURL();
         // alert(fileentry.toURL());
          //largeImage
        }
        function fail2 (argument) {
       //   alert("erro file");
        }




        image = imageData;
        
/*
        $scope.file = image;
        $scope.imgURI = image;
*/
       // alert(imageData);
        $scope.$apply();
        
      }

      function onFail(message) {
        alert("erro");
        image = 0;
      }

      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/drinks/', 
            method: "GET"            
          }).

          success(function (data, status, headers, config) {
            $scope.Bebidas = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error drink');
          });


          $http({
            url: 'http://developer-papudinho.herokuapp.com/webservice/bars', 
            method: "GET"
          }).

          success(function (data, status, headers, config) {
            $scope.Bares = data;
          }).

          error(function (data, status, headers, config) {
            console.log('Error bar');
          });

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();

      $scope.submitcartao = function() {
       // alert($scope.file);
        $scope.msg = "";
        var dataUsuario = (new Date($scope.vencimento)).toString().split(' ');
        dataUsuario[1] = new Date(Date.parse(dataUsuario[1] +" 1, "+dataUsuario[3])).getMonth()+1;
        data = [dataUsuario[2],dataUsuario[1],dataUsuario[3]].join('/');

        var dataAtual = (new Date()).toString().split(' ');
        dataAtual[1] = new Date(Date.parse(dataAtual[1] +" 1, "+dataAtual[3])).getMonth()+1;
        data1 = [dataAtual[2],dataAtual[1],dataAtual[3]].join('/');

        if (dataUsuario[3]<dataAtual[3]) { //ano anterior
          $scope.msg = "Data inválida";
          return 0;
        }
        else{ //ano atual
          if (dataUsuario[1]<dataAtual[1]) { //mes anterior
            $scope.msg = "Data inválida";
            return 0;
          }
          else{ //mes atual
            if(dataUsuario[2]<dataAtual[2]){ // dia anterior
              $scope.msg = "Data inválida";
              return 0;
            }
          }
        }
          
        id_bebida = validar($scope.Bebidas, $scope.bebida);
        if(id_bebida <= 0){
          $scope.msg = "Bebida inválida";
          return 0;
        }

        id_bar = validar($scope.Bares, $scope.bar);
        if(id_bar <= 0){
          $scope.msg = "Bar inválido";
          return 0;
        }

        function validar(lista, nome){
          if(nome == undefined){
            return -1;
          }
          arrayOfObjects = lista;
          id = 0; flag = 0;
          for (var i = 0; i < arrayOfObjects.length; i++) {
            var object = arrayOfObjects[i];
            for (var property in object) {
                //alert('item ' + i + ': ' + property + '=' + object[property]);
                if(property == "id"){
                  id = object[property];
                }
                if(property == "name"){
                  var aux = nome;
                  var aux2 = object[property];
                  if(aux2.trim() == aux.trim()){
                    flag = 1;
                    break;
                  }
                }
            }
            if(flag == 1)
              break;
          }
          if(flag==0)
            return 0;
          else
            return id;
        }
/*
        if(image == 0){
          $scope.msg = "Imagem inválida";
          return 0;
        }*/

        $scope.msg = "Salvando...";

      //  window.resolveLocalFileSystemURL(image, onResolveSuccess, fail);

     //   function onResolveSuccess(fileEntry) {
/*
        $http({
          url: 'http://developer-papudinho.herokuapp.com/webservice/new_card', 
          method: "POST",
          transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
          params: {
            drink_id: id_bebida,
            bar_id: id_bar,
            user_id: window.localStorage['id'],
            due_date: data,
            total_doses: $scope.doses,
            image: image
          }
        }).

        success(function (data, status, headers, config) {
          $scope.msg = "Cartão criado";
              //console.log(response.data); 
        }).

        error(function (data, status, headers, config) {
          $scope.msg = "Erro ao criar o cartão, tente novamente";
             // console.error(response); 
        });*/


          var uploadUrl = "http://developer-papudinho.herokuapp.com/webservice/new_card";
                
          var data = { 
            drink_id: id_bebida,
            bar_id: id_bar,
            user_id: window.localStorage['id'],
            due_date: data,
            total_doses: $scope.doses,
           // image: fileEntry
            image: $scope.file
          };
   
          upload({
            url: uploadUrl,
            method: 'POST',
            data: data
          }).then(
            function (response) {
              $scope.msg = "Cartão criado";
              console.log(response.data); 
            },
            function (response) {
              $scope.msg = "Erro ao criar o cartão, tente novamente";
              console.error(response); 
            }
          );
      //  }

        function fail(evt) {
          alert("erro");
            console.log(evt.target.error.code);
        }

        return 0; 
      }
    }]);

    app.controller('sidebar', ['$scope',  function($scope) {
      $scope.sair = function() {
        window.localStorage['login'] = 0;
      }
    }]);

    app.controller('dados', ['$scope', '$http', '$ionicPlatform', '$ionicPopup',  function($scope, $http, $ionicPlatform, $ionicPopup) {
      $scope.msg = ""

      
      $scope.submitDados = function() {

        if($scope.passwordOld == undefined ){
          $scope.msg = "O campo 'Senha Antiga' está vazio";
          return 0;
        } 

        if($scope.passwordOld == undefined ){
          $scope.msg = "'Senha Antiga' precisa ter 8 ou mais dígitos";
          return 0;
        } 

        if($scope.password == undefined ){
          $scope.msg = "O campo 'Senha Nova' está vazio";
          return 0;
        } 

        if($scope.password2 == undefined ){
          $scope.msg = "O campo 'Confirmar Senha Nova' está vazio";
          return 0;
        } 
        
        if($scope.password.length < 8 ){
          $scope.msg = "'Senha Nova' precisa ter 8 ou mais dígitos";
          return 0;
        }

        if($scope.password != $scope.password2){
          $scope.msg = "Senhas diferentes";
          return 0;
        }

        $scope.msg = '';



        $http({
          url: 'http://developer-papudinho.herokuapp.com/webservice/change_password', 
          method: "POST",
          params: {
            id: window.localStorage['id'],
            old_password: $scope.passwordOld,
            new_password: $scope.password
          }
        }).

        success(function (data, status, headers, config) {
          $scope.msg = "Senha alterada com sucesso";
          $scope.password = '';
          $scope.passwordOld = '';
          $scope.password2 = '';
        }).

        error(function (data, status, headers, config) {
          $scope.msg = "Senha antiga está errada";
          console.log('Error add Amigo');
        });

        return 0; 
      }


      function timedCount() {
        var time;
        if(window.localStorage['login'] == 1){
          clearTimeout(time);
          $scope.email = window.localStorage['email'];
          $scope.nome = window.localStorage['name'];

          return 0;
        }
        else{
          time = setTimeout(function(){ timedCount() }, 500);
        }
      }

      timedCount();
    }]);


  app.controller('Back', ['$scope', '$ionicHistory',  function($scope, $ionicHistory) {
       $scope.myGoBack = function() {
        $ionicHistory.goBack();
      };
    }]);


  app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);