var trackTriggers = [];
function TrackTrigger(x,y,w,h){
	this.create(x,y,w,h);
}
TrackTrigger.prototype = {
	create: function(x,y,w,h){
        this.boxObjectType = BoxObjectType.TrackTrigger;
        this.shape = createSensorRect(x, y, w, h);
        this.shape.parent = this;
    }
} // end TrackTrigger