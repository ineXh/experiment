var enums = require("./enums.js");
module.exports = exports = webClient;

function webClient(io, gameServer){
    //var client = this;
    var gameServer = gameServer;

	io.on('connection', function(socket){
        var client = {socket: socket,
                     game: null,
                    };


        onConnect(socket, gameServer);

        socket.on('chat', onChat);
        //socket.on('join game', onJoinGame)
        

        function onConnect(socket, server){
            console.log('A webClient has connected.');
            socket.join('Global Chat')
            client.room = 'Global Chat';
            gameServer.join(client);
            //socket.join('Game Chat')
            //socket.emit('chat', 'Hi Client.');
        }
        function onDisconnect(){
            console.log('A webClient has disconnected.');
            gameServer.leave(client);
        }
        function onChat(msg){
            console.log('onChat')
            console.log(msg);
            gameServer.sendChat(client, msg);
        }
        function onJoinGame(index){
            console.log('join game ' + index);
            gameServer.joinGame(client, index);
        }        
	}); // end io connection callback

	return this;
} // end webClient