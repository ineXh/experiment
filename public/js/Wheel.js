function Wheel(x,y, revolving, powered, car){
	this.create(x,y, revolving, powered, car);
}
Wheel.prototype = {
	create: function(x,y, revolving, powered, car){
		this.car = car;
		this.revolving = revolving;
		this.powered = powered;
		this.pos = new PVector(x, y);
		this.width = car.wheelWidth;
		this.height = car.wheelHeight;
		this.shape = createRect(x, y, this.width, this.height);
    	this.shape.fixture.SetSensor(true);
    	this.body = this.shape.body;

    	var jointdef = new b2RevoluteJointDef();
    	jointdef.Initialize(car.shape.body, this.shape.body, this.shape.body.GetWorldCenter());
    	jointdef.set_enableMotor(true);    	
	}, // end create
	setAngle: function(angle){ // angle in radian
		//this.body.SetAngle(this.car.body.GetAngle() + angle);
		if(isNaN(this.body.GetPosition().get_x())) debugger;
		this.body.SetTransform(this.body.GetPosition(), this.car.body.GetAngle() + angle*2*PI/360);
	},
	getLocalVelocity: function(){
		var res = this.car.body.GetLocalVector(
			this.car.body.GetLinearVelocityFromLocalPoint(new b2Vec2(this.pos[0], this.pos[1])));
    	return [res.x, res.y];
	}, // end getLocalVelocity
	getDirectionVector: function(){
		return vectorRotate((this.getLocalVelocity()[1]>0) ? [0, 1]:[0, -1] , this.body.GetAngle()) ;
	}, // end getDirectionVector
	getKillVelocityVector(){
		var velocity=this.body.GetLinearVelocity();
	    var sideways_axis=this.getDirectionVector();
	    var dotprod = dot([velocity.get_x(), velocity.get_y()], sideways_axis);
	    //debugger;
	    return [sideways_axis[0]*dotprod, sideways_axis[1]*dotprod];
	}, // end getKillVelocityVector
	killSidewaysVelocity(){
		var kv=this.getKillVelocityVector();
		//console.log(kv);
    	this.body.SetLinearVelocity(new b2Vec2(kv[0], kv[1]));
    	if(isNaN(this.body.GetPosition().get_x())) debugger;
	}, // end killSidewaysVelocity
} // end Wheel