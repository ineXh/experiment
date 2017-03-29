//http://www.iforce2d.net/embox2d/testbed.html
function Car(){
	this.create();
}
Car.prototype = {
	create: function(){
		this.wheelR = 0.05*width;
		this.width = width/2.5;
		this.carBody, this.fWheelBody, this.bWheelBody;
		this.carBodySprite = buttonCreate(PIXI.Texture.fromFrame("car1a.png"), 0, 0, this.width);

		this.fWheelSprite = buttonCreate(PIXI.Texture.fromFrame("wheel.png"), 0, 0, this.wheelR*2);
		this.bWheelSprite = buttonCreate(PIXI.Texture.fromFrame("wheel.png"), 0, 0, this.wheelR*2);
		stage.addChild(this.carBodySprite);
		stage.addChild(this.fWheelSprite);
		stage.addChild(this.bWheelSprite);
		this.createBox2D(width/2, height/2);
	},
	createBox2D: function(x, y, width){
		x = x/METER;
		y = y/METER;
		width = this.width/METER;

		var x0 = 0;
	    var y0 = -1;

		var ZERO = new b2Vec2(0, 0);
	    var temp = new b2Vec2(0, 0);

	    var bd	= new b2BodyDef();
	    bd.set_type(Box2D.b2_dynamicBody);
	    var carBody = world.CreateBody(bd);
	    
	    var points = [	{x: -1.2*METER		, y: 0.5*METER},
   				{x: 1.2*METER		, y: 0.5*METER},
    				{x: 1.2*METER		, y: 0*METER},
    				{x: 0.3*METER			, y: -0.6*METER},
    				{x: -0.05*METER		, y: -0.6*METER},
    				//{x: -0.65*METER		, y: -0.2*METER},
    				{x: -1.2*METER		, y: 0.1*METER},
    			 ];
 
    var verts = [];    
    for(var i = 0; i < points.length; i++){
    	verts.push(new b2Vec2( points[i].x/METER, points[i].y/METER) );
    }    

	    /*points.forEach(function(point){
	    	point.x *= METER;
	    	point.y *= METER;
	    })*/
  

	    
	    var chassisShape = createPolygonShape(verts);
	    
	    var fixtureDef = new b2FixtureDef();
		fixtureDef.set_density( 2);
		//fixtureDef.set_friction( 1 );
		//fixtureDef.set_restitution(1);
		fixtureDef.set_shape( chassisShape );
		fixture = carBody.CreateFixture( fixtureDef );

		//carBody.CreateFixture(chassisShape, 1);
		
	    temp.Set(x0, y0);
	    carBody.SetTransform(temp, 0.0);
	    carBody.SetLinearVelocity(ZERO);
	    
	    this.carBody = carBody;
	    //bodies.push(carBody);
	    carBodyShape = spawnVertices(stage, 0, 0, points);
	    carBodyShape.body = carBody;

	    // Wheel 1    
	    var r = this.wheelR/METER;
	    var x1 = -0.7;
	    var y1 = -0.35;
	    var cshape = new b2CircleShape();
	    cshape.set_m_radius(r);

	   var ZERO = new b2Vec2(0, 0);
	   var temp = new b2Vec2(0, 0);

	    var bd	= new b2BodyDef();
	    bd.set_type(Box2D.b2_dynamicBody);    
	    var wheelBody1 = world.CreateBody(bd);    
	    var fixtureDef = new b2FixtureDef();
		fixtureDef.set_density( 1 );
		fixtureDef.set_friction( 1 );
		fixtureDef.set_restitution(0.3);
		fixtureDef.set_shape( cshape );
		fixture = wheelBody1.CreateFixture( fixtureDef );
		
	    temp.Set(x1, y1);//16*(Math.random()-0.5), 4.0 + 2.5*index);
	    wheelBody1.SetTransform(temp, 0.0);
	    wheelBody1.SetLinearVelocity(ZERO);
	    wheelBody1.SetAwake(1);
	    wheelBody1.SetActive(1);

	    this.fWheelBody = wheelBody1;
	    //bodies.push(wheelBody1);
	    //shape = spawnCircle(stage, 0, 0, r*METER);
	    //shape.body = wheelBody1;

	    // Wheel 2
	    var x2 = 0.6;
	    var y2 =-0.4;

	    var wheelBody2 = world.CreateBody(bd);
	    wheelBody2.CreateFixture(fixtureDef);

	    temp.Set(x2, y2);//16*(Math.random()-0.5), 4.0 + 2.5*index);
	    wheelBody2.SetTransform(temp, 0.0);
	    wheelBody2.SetLinearVelocity(ZERO);
	    wheelBody2.SetAwake(1);
	    wheelBody2.SetActive(1);

	    this.bWheelBody = wheelBody2;
	    //bodies.push(wheelBody2);
	    //shape = spawnCircle(stage, 0, 0, r*METER);
	    //shape.body = wheelBody2;

	    // Joint
	    var m_hz = 4.0;
	    var m_zeta = 0.7;
	    var m_speed = 50.0;
	    
	    var jd = new b2WheelJointDef();
	    var axis = new b2Vec2(0.0, -1.0);
	    jd.Initialize(carBody, wheelBody1, wheelBody1.GetPosition(), axis);
	    jd.set_motorSpeed(0.0);
	    jd.set_maxMotorTorque(20.0);
	    jd.set_enableMotor(true);
	    jd.set_frequencyHz(m_hz);
	    jd.set_dampingRatio(m_zeta);
	    rearWheelJoint = Box2D.castObject( world.CreateJoint(jd), b2WheelJoint );
	    
	    jd.Initialize(carBody, wheelBody2, wheelBody2.GetPosition(), axis);
	    //jd.set_motorSpeed(0.0);
	    //jd.set_maxMotorTorque(10.0);
	    jd.set_enableMotor(false);
	    jd.set_frequencyHz(m_hz);
	    jd.set_dampingRatio(m_zeta);
	    wheelJoint2 = Box2D.castObject( world.CreateJoint(jd), b2WheelJoint );

	    center = carBodyShape.pos;
	},
	init: function(x, y){

	},
	update(){
		this.carBodySprite.x = this.carBody.GetPosition().get_x()*METER;
		this.carBodySprite.y = this.carBody.GetPosition().get_y()*METER;
		this.carBodySprite.rotation = this.carBody.GetAngle();

		
		this.fWheelSprite.x = this.fWheelBody.GetPosition().get_x()*METER;
		this.fWheelSprite.y = this.fWheelBody.GetPosition().get_y()*METER;
		this.fWheelSprite.rotation = this.fWheelBody.GetAngle();

		this.bWheelSprite.x = this.bWheelBody.GetPosition().get_x()*METER;
		this.bWheelSprite.y = this.bWheelBody.GetPosition().get_y()*METER;
		this.bWheelSprite.rotation = this.bWheelBody.GetAngle();
		//this.graphics.x = this.pos.x;
		//this.graphics.y = this.pos.y;
		//this.graphics.rotation = this.body.GetAngle();
	}
} // end Car

function createCar(x, y){
	
} // end createCar
var motorSpeed = 0;
function carSpeedUp(){
	motorSpeed = (motorSpeed >= 40) ? motorSpeed : motorSpeed+2;
	rearWheelJoint.SetMotorSpeed(motorSpeed);
}
function carSpeedDown(){
	motorSpeed = (motorSpeed <= -40) ? motorSpeed : motorSpeed-2;
	rearWheelJoint.SetMotorSpeed(motorSpeed);
}