var trackTriggers = [];
function TrackTrigger(x1,y1,x2,y2){
    this.create(x1,y1,x2,y2);
}
TrackTrigger.prototype = {
    create: function(x1,y1,x2,y2){
        this.width = width/20; this.height = height/5;
        this.boxObjectType = BoxObjectType.TrackTrigger;
        this.shape = createRect(x1, y1, this.width, this.height); //createSensorRect
        this.shape.setAngle(1);
        this.shape.parent = this;
    }
} // end TrackTrigger