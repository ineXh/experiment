function Car2D(x,y){
	this.create(x,y);
}
// http://www.iforce2d.net/b2dtut/top-down-car
Car2D.prototype = {
	create: function(x,y){
		scale = 5;
	    points = [{x: 1.5*scale, y: 0*scale}  , {x: 3*scale, y: 2.5*scale}, 
	                {x: 2.8*scale, y: 5.5*scale}, {x: 1*scale, y: 10*scale} , 
	                {x: -1*scale, y: 10*scale}  , {x: -2.8*scale, y: 5.5*scale}, 
	                {x: -3*scale, y: 2.5*scale}, {x: -1.5*scale, y: 0*scale}];
	    this.shape = createShape(x, y, points);
	    this.body = this.shape.body;
	    this.tires = [];
		this.LFTire = new Tire2D(x - 5,y + 5);

		var m_hz = 4.0;
	    var m_zeta = 0.7;
	    var m_speed = 50.0;

		var jointDef = new b2RevoluteJointDef();
		var axis = new b2Vec2(0.0, -1.0);
	    jointDef.Initialize(this.body, this.LFTire.body, this.LFTire.body.GetPosition(), axis);
	    jointDef.set_motorSpeed(1.0);
	    jointDef.set_maxMotorTorque(20.0);
	    jointDef.set_enableMotor(true);
	    rearWheelJoint = Box2D.castObject( world.CreateJoint(jointDef), b2RevoluteJoint );
	  

	},

	update: function(){

	},
} // end Car2D

function Tire2D(x, y){
	this.create(x, y);
}
Tire2D.prototype = {
	create: function(x,y){
		this.width = width/30;
		this.height = height/20;
		useForDebug = false;
		this.shape = createRect(x,y, this.width, this.height, Box2D.b2_dynamicBody, useForDebug);
		this.body = this.shape.body;
	},
	getLateralVelocity: function() {
      currentRightNormal = this.body.GetWorldVector( b2Vec2(1,0) );
      return b2Dot( currentRightNormal, this.GetLinearVelocity() ) * currentRightNormal;
   }, 
} // end Tire2D
