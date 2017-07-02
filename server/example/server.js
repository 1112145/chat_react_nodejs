var express = require('express');
var chat = require('../index.js');

var app = express();


app.use(express.static('www'));


app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/www/index.html');
});


var http = app.listen(4040,()=>{
    console.log('Success to start server at port 4040');
})

chat(http);