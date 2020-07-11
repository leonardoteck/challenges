// (() => {
//     var net = require('net');
    
//     var client = new net.Socket();
//     client.connect(443, 'https://zrp-challenge-socket.herokuapp.com', function() {
//         console.log('Connected');
//     });
    
//     client.on('data', function(data) {
//         console.log('Received: ' + data);
//     });
    
//     client.on('close', function() {
//         console.log('Connection closed');
//     });
// })();


(() => {
    var io = require('socket.io-client');

    var socket = io('https://zrp-challenge-socket.herokuapp.com:443');
    // socket.on('connect', function() {
    //     console.log('Connected');
    // });
    
    socket.on('occurrence', function(data) {
        console.log('Received:');
        console.log(JSON.stringify(data, null, 2));
    });
    
    socket.on('disconnect', function() {
        console.log('Connection closed');
    });
})();
