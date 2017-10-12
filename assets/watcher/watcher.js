const fs = require('fs');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
        res.sendFile(__dirname + '/watcher.ts');
});

io.on('connection',function (client) {
        console.log("watcher connection");
});

fs.watch(__dirname + '/watcher.ts', function(curr, prev) {
        console.log("watcher file changed");
        io.emit('file-changed', '');
});

http.listen(22280, function(){
        console.log('watcher listening on port 22280');
});
