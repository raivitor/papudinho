/**
* Função para gerar uma tela de alerta no app
* @param alert - Variável '$ionicPopup' do Ionic
* @param titulo - Título do alert
* @param msg - Mensagem do corpo do alert
*/
function alerta (alert, titulo, msg) {
  alert.alert({
   title: titulo,
   template: msg
 });
}

/**
* Converte latitude e longitude para radianos
* Função utilizada em GetLocation()
*/
function conversor (angle) {
  return (angle * 3.14)/180;
}

/**
* Retorna a distancia entre dois pontos, em kilometros
* Os dados de entrada tem que estar em radianos
*/
function Distancia (latA, lonA, latB, lonB) {
  var x = 6371*Math.acos( Math.sin(latA)*Math.sin(latB) + Math.cos(latA)*Math.cos(latB) * Math.cos(lonA-lonB));
  return x;
}

/**
* Envia uma notifição para o usuario
* @param texto - Texto a ser mostrado na noficiação
*/
function Notificar (texto) {
  window.plugin.notification.local.add({ message: texto });
}

// variaveis para realizar testes de distancia
lat = conversor(-5.855706);
lon = conversor(-35.2454187);

function GetLocation() {
  if(window.localStorage['login'] == 1){
    navigator.geolocation.getCurrentPosition(function(position) {
      window.localStorage['latitude'] = position.coords.latitude;
      window.localStorage['longitude'] = position.coords.longitude;
      Comparar();
    }, function(error) {
        console.log('Erro ao pegar localização: ' + error.message);
    }, {enableHighAccuracy: true });
  }
}

/**
* Compara a posição atual com a posição dos bares.
* Se a distancia for menor que 1km ele envia uma notificação para o usuário.
*/
function Comparar(){
  for(i = 0; i < G_bares.length; i++){
    lat = conversor(G_bares[i].latitude);
    lon = conversor(G_bares[i].longitude);
    distancia = Distancia(lat, lon, conversor(window.localStorage['latitude']), conversor(window.localStorage['longitude']));
    //console.log(distancia);
    if(distancia <= 1.0){
      Notificar("O bar "+G_bares[i].name+" está perto de você!");
    }
  }
}