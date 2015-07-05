function alerta (alert, titulo, msg) {
  alert.alert({
   title: titulo,
   template: msg
 });
}

//Converte graus para radianos
function conversor (angle) {
  return (angle * 3.14)/180;
}

//Retorna a distancia entre dois pontos, em kilometros
//Os dados de entrada tem que estar em radianos
function Distancia (latA, lonA, latB, lonB) {
  var x = 6371*Math.acos( Math.sin(latA)*Math.sin(latB) + Math.cos(latA)*Math.cos(latB) * Math.cos(lonA-lonB));
  return x;
}

// variaveis para realizar testes de distancia
lat = conversor(-5.855706);
lon = conversor(-35.2454187);

function GetLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    window.localStorage['latitude'] = position.coords.latitude;
    window.localStorage['longitude'] = position.coords.longitude;
    //window.localStorage['latitude'] = conversor(position.coords.latitude);
    //window.localStorage['longitude'] = conversor(position.coords.longitude);
    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);
    //console.log(Distancia(lat, lon, window.localStorage['latitude'], window.localStorage['longitude']));
  }, function(error) {
      console.log('Erro ao pegar localização: ' + error.message);
  });
}

/* atualizar()
* Em alguns controlers existe a função atualizar()
* pq aconteceu alguma adição ou exclusão de informações
* E foi preciso atualizar a tela.
* Ela fica se chamando sempre e testando a condição de atualização.
*/