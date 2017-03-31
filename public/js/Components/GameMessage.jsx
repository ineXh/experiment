var GameMessageItem = React.createClass({
  render: function() {
    return (
      <h2 className="gMsg">{this.props.message}</h2>
    );
  }
});
//<span>{this.props.players}/4Players</span></h2></li>
window.gamemessages = [];/*["hi folks have you been goood",
                      "sup yooooooo!!!!!",
                      "ahoi"];*/
window.GameMessage = React.createClass({
  getInitialState: function() {
        return {clients: [], index: 0};
  },
  componentDidMount: function(){

      },
  componentWillUnmount: function(){

  },
  handleSubmit: function(e) {
    e.preventDefault();
    //console.log('handle Submit');
    return;
  },
  render: function() {
    var messageNodes = gamemessages.map(function(msg, index){
      return (
        <GameMessageItem
          message = {msg}
          key={index}>
        </GameMessageItem>
      );
    });
    return (
      <div id="gamemessage">
        {messageNodes}
      </div>
    );
  }
});

window.myGameMessage = React.createFactory(GameMessage);
window.render_myGameMessage = function() {
  ReactDOM.render(myGameMessage({ foo: 'bar' }), document.getElementById('message_content'));
}
window.addmsg = function(msg){
  gamemessages.push(msg);
  render_myGameMessage();
  //if(msgtimeout != undefined) clearTimeout(msgtimeout);
  clearTimeout(msgtimeout);
  msgtimeout_counter = 5;
  setmsgtimeout();
  /*  setTimeout(function(){
      console.log("remove")
      gamemessages.splice(0,1);
      render_myGameMessage();
    }, 8000);*/
}
window.msgtimeout = null;
var msgtimeout_counter = 5;
window.setmsgtimeout = function(){
  msgtimeout = setTimeout(msgtimeout_fcn, msgtimeout_counter*500);
}
var msgtimeout_fcn = function(){
  if(gamemessages.length >= 1){
    //console.log("remove")
    gamemessages.splice(0,1);
    render_myGameMessage();
    msgtimeout_counter-=2;
    if(msgtimeout_counter <= 1) msgtimeout_counter = 1;
    setmsgtimeout();
  }
}