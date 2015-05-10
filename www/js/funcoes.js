function alerta (alert, titulo, msg) {
  alert.alert({
   title: titulo,
   template: msg
 });
}

/* atualizar()
* Em alguns controlers existe a função atualizar()
* pq aconteceu alguma adição ou exclusão de informações
* E foi preciso atualizar a tela.
* Ela fica se chamando sempre e testando a condição de atualização.
*/

/*
document.addEventListener('deviceready', function () {
  document.addEventListener('backbutton', function (event) {
    //window.localStorage['atualizarHome'] = 1;
    //location.href = "http://localhost:3000/#/menu/home";
    //alert(location.href);
    window.history.back();
    event.preventDefault();
    event.isDefaultPrevented();
  }, false);
}, false);
*/
/*
app.run(function($ionicPlatform, $ionicHistory){

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
  },102);

});*/