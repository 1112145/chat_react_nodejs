var io = require('socket.io');
var _ = require('lodash');

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
function onConnection(socket) {
    console.log('an user has been connected!');
    sayHelloServerFrom(socket);
    socket.on(MESSAGE, onMessage);
    socket.on(HISTORY, onHistory);
    socket.on(ONLINE_USERS, onOnlineUsers);
    socket.on(MARK_AS_READ, onMarkAsRead);
    socket.on(USER_TYPING, onUserTyping);
    socket.on(DISCONNECT, onDisconnect);
}

function sayHelloServerFrom(socket) {
    socket.on(WHO, function (user) {
        console.log('Hello server!');
        var index = _.findIndex(userSockets, (el) => { return el.user.id == user.id });
        if (index == -1) {
            socket.user = user;
            userSockets.push(socket);
        }
        else {
            var temp = userSockets[index];
            userSockets[index] = socket;
            temp.disconnect(true);
        }
        sendOnlineUserListTo(socket);
    })
}




function onDisconnect(socket) {
    console.log('An user has been disconnected!');
    var index = _.findIndex(userSockets, function (sk) {
        return sk.id == socket.id
    });

    if (index != -1) {
        userSockets.splice(index, 1);
    }
}

function onMessage(message) {
    var targetSocket = getSocketByUserId(message.receiver.id);

    if (targetSocket)
        sendMessage(targetSocket, message);
}

function onHistory(history) {

}

function onOnlineUsers(params) {

}

function onMarkAsRead(params) {
    db.markAsRead(params.msg_id_list);
}

function onUserTyping(params) {

}

// EVENT SENDERS.
//////////////////////////
function sendMessageTo(targetSocket, message) {

}

function sendHistoryTo(targetSocket, history) {

}

function sendOnlineUserListTo(targetSocket) {
    targetSocket.emit(ONLINE_USERS, _.map(userSockets, (e) => { return e.user }));
}

function sendTypingUserTo(targetSocket, typingUserId) {

}



// MODULE EXPORT

module.exports = function (httpServer) {
    if (!httpServer)
        console.log('This module require an http server. Try pass this parameter: Express().listen(PORT:NUMBER) ')
    var IO = io(httpServer);


    IO.on(CONNECTION, onConnection);

    return IO;
}
