var http = require('http');
var fs = require('fs');
var net = require('net');

http.createServer(function(request, response) {
    fs.readFile("web/" + request.url, function(error, content) {
        if(error) {
            response.writeHead(500);
            response.end(error.toString());
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content);
        }
    });
}).listen(9090);

net.createServer(function(socket) {
    socket.write("Hallo " + socket.remoteAddress + ":" + socket.remotePort + "\r\n");
    socket.pipe(socket);
}).listen(9091);

var io = require('socket.io').listen(80);

io.sockets.on('connection', function(socket) {
    socket.on('drawingStarted', function(data) {
        socket.broadcast.emit('drawingStartedOnOtherCanvas', data);
    })
    socket.on('lineSegmentDrawn', function(data) {
        socket.broadcast.emit('lineSegmentDrawnOnOtherCanvas', data);
    })
});

console.log('kben er');