app.factory('Geolocalizacao', ['$http', function($http){


  function UpdateGps(){

      var req = {
        method: 'POST',
        url: servidor+'/webservice/user_geo',
        params:{
          id: window.localStorage['user_id'], 
          latitude: window.localStorage['latitude'], 
          longitude: window.localStorage['longitude']
        }
      }
      $http(req).
        then(function (sucesso) {
          /*console.warn("Sucesso token");*/
          console.log(sucesso);
        },
        function(fail){
          console.error("Fail token");
          //console.log(fail);
        });

  }

  return {
    UpdateGps: UpdateGps
  }
}]);