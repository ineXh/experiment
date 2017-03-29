var metaChar = false;
var exampleKey = 16;
var typing = false;
var keyList = {};
function keyEvent(event) {
  var key = event.keyCode || event.which;
  var keychar = String.fromCharCode(key);
  if (key == exampleKey) {
    metaChar = true;
  }
  if (key != exampleKey) {
    if (metaChar) {
      //console.log(keychar)
      //alert("Combination of metaKey + " + keychar);
      metaChar = false;
    } else if(!typing) {
      //console.log(key)
      switch(key){
        case 65:  // A
        case 97:  // a
          console.log('a')
        break;
        /*case 38: // Up
          carSpeedUp();
          break;
        case 40: // Down
          carSpeedDown();
          break;*/
        // NumPad
        case 100: // Left
          stage.x += 10;
          break;
        case 102: // Right
          stage.x -= 10;
          break;
        case 104: // Up
          stage.y += 10;
          break;
        case 98: // Down
          stage.y -= 10;
          break;

        case 37: // Left Arrow Key
          //if(car1) car1.turnLeft();
          break;
        case 38: // Up
          //if(car1) car1.speedUp();
          //borderpan_top();
          break;
        case 39: // Right
          //if(car1) car1.turnRight();
          //borderpan_right();
          break;
        case 40: // Down
          //if(car1) car1.speedDown();
          //borderpan_bot();
          break;
        case 32: // Spacebar
          //panToBase();
          if(car1 && center == null){
            center = car1.shape.pos
          }else{
            center = null;
          }
          break;
        case 106: // *
          //record = !record;          
          if(verticesRecorder){
            verticesRecorder.record = !verticesRecorder.record;
            console.log('record ' + verticesRecorder.record);
          }           
        break;
        case 107: // +
          // Flip draw on/off
          if(verticesRecorder) verticesRecorder.draw(stage, !verticesRecorder.display);
        break;
        case 109: // -
          if(verticesRecorder) verticesRecorder.clean();
        break;
        case 111: //  /   slash
          if(verticesRecorder) verticesRecorder.export();
        break;
        /*
        case 107:
        case 187: // + key        
          zoom_in();
          break;
        case 109:
        case 189: // - Key
          zoom_out();
          break;*/
      }
      //alert("Key pressed " + key);
    }
  }
}

function metaKeyUp (event) {
  var key = event.keyCode || event.which;

  if (key == exampleKey) {
    metaChar = false;
  }
}  

var keys = {};
document.addEventListener("keydown", function(e){
  keys[e.keyCode] = true;
});
document.addEventListener("keyup", function(e){
  keys[e.keyCode] = false;
});
