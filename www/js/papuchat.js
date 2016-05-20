/*
v.0.0.1
Toda alteração que for comitada deve gerar um nova versão desde arquivo
  .. log de alterações...
*/


function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

var Papuchat = {
  ref: new Firebase('https://chat-prot.firebaseio.com')
};

Papuchat.isIncorret = function(message){
  var log = null
  if(!message.from_id)
    log = "Está faltando a chave from_id : Id de quem está enviado a mensagem.";
  if(!message.to_id)
    log = "Está faltando a chave to_id : Id de quem está recebendo a mensagem.";
  if(!message.from)
    log = "Está faltando a chave from : Nome de quem está enviando a mensagem.";
  if(!message.to)
    log = "Está faltando a chave to : Nome de quem está recebendo a mensagem.";
  if(!message.text)
    log = "Está faltando a chave text : texto da mensagem.";

  var stack = new Error(log).stack
  if(log) return console.error(stack);
   return false;
};

/* Iniciando uma conversa */
Papuchat.startChat = function(message){
  message.created_at =  new Date().toString();

  if(this.isIncorret(message)) return;

  var chatUUID = generateUUID();
  // Iniciador
  var fromUserRef = this.ref.child(message.from_id + "/" +chatUUID);
  fromUserRef.set(message);
  // recebedor
  var toUserRef = this.ref.child(message.to_id + "/" +chatUUID);
  toUserRef.set(message);

  var messagesRef = this.ref.child( "messages/" +chatUUID);
  messagesRef.push(message);

  sendPush(message.from, message.text, message.to_id);
};

function sendPush(name, message, to_id){
  var data = {
    name: name,
    message: message,
    to_id: to_id
  }

  //$.post('/webservice/chat/notification', data, function(){});
}

Papuchat.deleteChat = function(chatUUID, from_id, to_id){
  // Iniciador
  var fromUserRef = this.ref.child(from_id + "/" +chatUUID);
  fromUserRef.remove();
  // recebedor
  var toUserRef = this.ref.child(to_id + "/" +chatUUID);
  toUserRef.remove();

  var messagesRef = this.ref.child( "messages/" +chatUUID);
  messagesRef.remove();
};


Papuchat.getChats = function(userID, done){

  var userRef = this.ref.child(userID);

  userRef.on("value", function(snapshot){
    var results = [];
    snapshot.forEach(function(snap) {
      var data = snap.val();
      data.id = snap.key();
      results.push(data);
    });

    done(results);
  });
};

Papuchat.getMessages = function(chatUUID, done){
  var userRef = this.ref.child( "messages/" +chatUUID);

    userRef.endAt().limit(100).on("value", function(snapshot){
      var results = [];
      snapshot.forEach(function(snap) {
        var data = snap.val();
        data.id = snap.key();
        results.push(data);
      });

      done(results);
    });

};

Papuchat.send = function(chatUUID, message){
  if(this.isIncorret(message)) return;

  message.created_at =  new Date().toString();

  var fromUserRef = this.ref.child( message.from_id + "/" + chatUUID);
  fromUserRef.update(message);

  var toUserRef = this.ref.child(message.to_id + "/" +chatUUID);
  toUserRef.update(message);

  var messagesRef = this.ref.child( "messages/" +chatUUID);
  messagesRef.push(message);

  sendPush(message.from, message.text, message.to_id);

  // Atualizando mensagens novas
  var newMessages = this.ref.child(message.to_id + "/" + chatUUID + "/news");
  newMessages.transaction(function (current_value) {
    return (current_value || 0) + 1;
  });
};

Papuchat.cleanNews = function(userID, chatUUID){
  var fromUserRef = this.ref.child( userID + "/" + chatUUID);
  fromUserRef.update({ news: 0 });
};
