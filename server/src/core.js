var io = require('socket.io');
var db = require('./db/index.js')();

var userSockets = [];

// EVENT CONST DEFINES
const CONNECTION = 'connection';
const WHO = 'who';
const DISCONNECT = 'disconnect';
const MESSAGE = 'message';
const HISTORY = 'history';
const ONLINE_USERS = 'online_users';
const MARK_AS_READ = 'mark_as_read';
const USER_TYPING = 'user_typing';
const ERR = {
    connection_failed: 'Failed to connect!',
}

// EVENT HANDLERS
//////////////////////////
function onConnection(socket){
    console.log('an user has been connected!');
    socket.on(WHO, onWho.bind(this));
    socket.on(MESSAGE, onMessage);
    socket.on(HISTORY, onHistory);
    socket.on(ONLINE_USERS, onOnlineUsers);
    socket.on(MARK_AS_READ, onMarkAsRead);
    socket.on(USER_TYPING,onUserTyping);
    socket.on(DISCONNECT, onDisconnect);
}

function onWho(user_infor){
    console.log('Hello server. I am ' + user_infor.name);
    // Push to array. If existed kick the old socket.
}


function onDisconnect(socket){
    console.log('An user has been disconnected!');
}

function onMessage(message){
    var targetSocket = getSocketByUserId(message.receiver.id);

    if(targetSocket) 
        sendMessage(targetSocket, message); 
}

function onHistory(history){

}

function onOnlineUsers(params){

}

function onMarkAsRead(params){
    db.markAsRead(params.msg_id_list);
}

function onUserTyping(params){

}

// EVENT SENDERS.
//////////////////////////
function sendMessage(toSocket, message){

}

function sendHistory(toSocket, history){

}

function sendOnlineUserList(toSocket, userList){

}

function sendTypingUser(toSocket, typingUserId){

}




////// INTERNAL FUNCTIONS
function getSocketByUserId(id){
    return _.find(userSockets,(socket)=>{return socket.user.id == id});
}

function isExistedUser(id){
    return _.indexOf(userSockets,(socket)=>{return socket.user.id == id});
}

function removeSocketOutArray(socket){
     var index = _.findIndex(userSockets, function (sk) {
        return sk.id == socket.id
    });

    if (index != -1) {
        clientSockets.splice(index, 1);
    }
}



// MODULE EXPORT

module.exports =  function(httpServer){
    if(!httpServer) 
        console.log('This module require an http server. Try pass this parameter: Express().listen(PORT:NUMBER) ')
    var IO = io(httpServer);


    IO.on(CONNECTION,onConnection);

    return IO;
}
