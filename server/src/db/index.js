var defaultConfig = require('./dbConfig.js');
var sequelize = require('sequelize');

// Errors
const err = {
    connect_failed: 'Failed to connect to database!',
    create_database_failed: 'Can not create database!',
    save_message_failed: 'Can not save message!',
    get_history_failed: 'Failed to get chat history'
}


// Connect to database.
function _connect(config = defaultConfig) {
    try {
        // Try to connect to database.
        var connection = new sequelize(config.dbName, config.username, config.password, { host: config.host, dialect: config.dialect });
    }
    catch (e) {
        console.log(e);
        return err.connect_failed;
    }
    console.log('Success connect to database!');
    _createDatabaseIfNotExist();

}

// Create database if not exist
function _createDatabaseIfNotExist() {
    try {

    }
    catch (e) {
        console.log(err.create_database_failed);
    }
}

// Save message to database.
function _saveMessage(message) {
    try {

    }
    catch (e) {
        return console.log(err.save_message_failed);
    }
}

// Get message list between two people.
function _getHistory(senderId, receiverId, timeStamp) {
    try {
        // get chat history.
    }
    catch (e) {
        console.log(err.get_history_failed);
    }

}




// MODULE EXPORT 
module.exports = function () {
    // auto connect.
    _connect();

    return {
        errors: err,
        connect: _connect,
        saveMessage: _saveMessage,
        getHistory: _getHistory
    }
}