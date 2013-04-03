var http = require('http');
var fs = require('fs');
var net = require('net');
var static = require('node-static');

var staticServer = new static.Server('./web');

http.createServer(function(request, response) {
    staticServer.serve(request, response);
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

console.log('hier fsdfd ben ik');