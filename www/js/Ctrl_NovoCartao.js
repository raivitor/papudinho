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
        //alert("erro");
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