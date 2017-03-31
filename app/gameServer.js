var enums = require("./enums.js");
module.exports = exports = gameServer;

// //////////////////////
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function gameServer(io){
    this.io = io;
    this.games = [];

    this.init();
    //return this;
} // end gameServer
gameServer.prototype = {
    init: function(){
        this.players = [];
        this.playerId = 0;
    }, // end init

    join: function(player){
        this.players.push(player);
        console.log('total players on server ' + this.players.length);
        player.id = this.playerId++;
        var obj = {
            id: player.id,
        }
        this.io.in(player.room).emit('playerJoins', obj);

    },
    leave: function(player){
        
    },
    sendChat : function(player, msg){
      var obj = {
          time: (new Date()).getTime(),
          msg: htmlEntities(msg),
          author: player.name,
          //color: player.color,
        };
        this.io.in(player.room).emit('chat', obj);
    },
} // end gameServer