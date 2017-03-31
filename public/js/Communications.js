function Communications(){
	this.init();
}
Communications.prototype = {
	init:function(){

	},
	connect: function(){
		return new Promise(function(resolve, reject){
			if(communication.socket != undefined)
				communication.socket.io._reconnection =true;
			console.log('connect')
			communication.socket = iox.connect('http://localhost:443/',
			//communication.socket = io.connect('https://192.168.0.105:443/',
			//communication.socket = iox.connect('https://frenzy.supercow.org/',
			
			//communication.socket = io.connect('https://murmuring-waters-23161.herokuapp.com:443/',
			//communication.socket = io.connect('http://104.197.194.141:80/',
				{reconnection: false}); //secure: true,
			//this.socket = io.connect('http://104.197.217.162:80/');
			//if(!this.socket.connected) return false;
			setTimeout( function(){
				if(communication.socket.connected){
					communication.setupconnection();
					resolve();
				}else{
					addmsg('Connection Timed Out! :(')
					communication.socket.io._reconnection =false;
					//reject();
				}
			}, 1000 );

			//return true;
		});
	},
	disconnect: function(){
		if(gamemode != GameMode.MultiPlayer) return;
		//console.log('Client Disconnect')
		communication.socket.emit('disc');
		addmsg('Disconnected!')		
		communication.socket.removeListener('playerJoins', onPlayerJoin);
	},
	setupconnection:function(){
		addmsg('Connection Successful! :D')
		communication.sendClientInfo();
		//this.socket.on('chat', onChat);
		communication.socket.on('playerJoins', onPlayerJoin);
		communication.socket.on('chat', onChat);
		
	},

	sendClientInfo: function(){
		this.socket.emit('client info', {width: width, height: height, stageWidth: stageWidth, stageHeight: stageHeight});
	},
	update: function(time){

	},
}; // end Communications

function sendChat(msg){
	communication.socket.emit('chat', msg);
}
function onChat(msg){
	console.log('onChat')
	console.log(msg);
	var time = convertTime(new Date(msg.time));
	addmsg(time + " : " + msg.msg);
} // end onChat
function onPlayerJoin(msg){
	console.log('onPlayerJoin')
	console.log(msg);
	addmsg('player joins ' + msg.id)
	spawnCar();
} // end onPlayerJoin