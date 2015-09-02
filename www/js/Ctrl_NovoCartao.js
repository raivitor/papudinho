app.controller('NovoCartao', ['$scope', '$http', '$location', function($scope, $http, $location) {
      $scope.doses = 10;
      var image = 0;
      var arquivo;
      $scope.msg = "Não use!";
      $scope.capturePhoto = function() {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 1,  targetWidth: 300, targetHeight: 300,  destinationType: Camera.DestinationType.DATA_URL });
      }

      function onSuccess(imageData) {
       image = imageData;
      }

      function onFail(message) {
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

        id_bebida = $scope.bebida;
        if(id_bebida <= 0){
          $scope.msg = "Bebida inválida";
          return 0;
        }

        id_bar = $scope.bar;
        if(id_bar <= 0){
          $scope.msg = "Bar inválido";
          return 0;
        }

        console.log("Bares: "+$scope.bar+" Id: "+id_bar);
        console.log("Bebida: "+$scope.bebida+" Id: "+id_bebida);

        /*
        if(image == 0){
          $scope.msg = "Imagem inválida";
          return 0;
        }*/
        delete $http.defaults.headers.common['X-Requested-With'];
        image1 = "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";
        var binaryImg = atob(image1);
        var length = binaryImg.length;
        var arrayBuffer = new ArrayBuffer(length);
        var uintArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < length; i++) {
            uintArray[i] = binaryImg.charCodeAt(i);
        }
        G_usuario.id = 11;
        $scope.msg = "agora vai";
        console.log("drink_id: "+id_bebida+"\nbar_id: "+id_bar+ "\nuser_id: "+G_usuario.id+ "\ndue_date"+data+ "\ntotal_doses:"+$scope.doses+"\nimage"+image1);
        data = data1
        var req = {
         method: 'POST',
         url: 'http://developer-papudinho.herokuapp.com/webservice/new_card',
         headers: {
           'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
         },
         data: { 
            drink_id: id_bebida,
            bar_id: id_bar,
            user_id: G_usuario.id,
            due_date: data1,
            total_doses: $scope.doses,
            image: image1 }
        }

        $http(req).then(function(data){
          $scope.msg = "Cartão criado";
          console.log(data); 
        }, function(){
          $scope.msg = "Erro ao criar o cartão, tente novamente";
          //console.error(data); 
        });
/*
        $http({
          url: 'http://developer-papudinho.herokuapp.com/webservice/new_card', 
          method: "POST",
          headers: {'Content-Type': 'application/pdf'},
          params: {
            drink_id: id_bebida,
            bar_id: id_bar,
            user_id: 11,
            due_date: data,
            total_doses: $scope.doses,
            image: image
          }
        }).

        success(function (data, status, headers, config) {
          $scope.msg = "Cartão criado";
          console.log(data); 
        }).

        error(function (data, status, headers, config) {
          $scope.msg = "Erro ao criar o cartão, tente novamente";
          console.error(data); 
        });
*/
        return 0; 
      }
    }]);