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
        case 38: // Up
          carSpeedUp();
          break;
        case 40: // Down
          carSpeedDown();
          break;
        /*case 32: // Spacebar
          //panToBase();
          break;
        case 37: // Left Arrow Key
          //borderpan_left();
          break;
        case 38: // Up
          //borderpan_top();
          break;
        case 39: // Right
          //borderpan_right();
          break;
        case 40: // Down
          //borderpan_bot();
          break;
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
