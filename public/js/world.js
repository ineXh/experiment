/*var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;*/
/*var b2Vec2 = Box2D.b2Vec2;
var b2BodyDef = Box2D.b2BodyDef;
var b2World = Box2D.b2World;*/
using(Box2D, "b2.+");

var bodies = [];
var METER = 100;

function createWorld() {
	/*if ( world != null )	Box2D.destroy(world);
	 world = new b2World( new b2Vec2(0.0, -10.0) );
	 mouseJointGroundBody = world.CreateBody( new b2BodyDef() );
	 createGround(world);*/
	var gravity = new Box2D.b2Vec2(0.0, 10.0);
    world = new Box2D.b2World(gravity);
    //createBound();
    createGround();
    /*var bd_ground = new Box2D.b2BodyDef();
    ground = world.CreateBody(bd_ground);
    var shape0 = new Box2D.b2EdgeShape();
    shape0.Set(new Box2D.b2Vec2(-40.0, -6), new Box2D.b2Vec2(40.0, -6));
	ground.CreateFixture(shape0, 0.0);

	*/
	//createStaticFloor();
	for(var i = 0; i < 10; i++){
		//createBall(Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/20);
		//createRect(Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/10, getRandomArbitrary(0.5, 1)*height/10);
		//createPoly(getRandomInt(3,8), Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/10);
	}
	//createShape1(Math.random()*width, -getRandomInt(50,height/2));
	createCar(width/2, height/2);
	stage.x = 200;
}

function createCar(x, y){
	x = x/METER;
	y = y/METER;

	var x0 = 0;
    var y0 = -1;

	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    var carBody = world.CreateBody(bd);
    
    var points = [	{x: -1.5*METER		, y: 0.5*METER},
    				{x: 1.5*METER		, y: 0.5*METER},
    				{x: 1.5*METER		, y: 0*METER},
    				{x: 0*METER			, y: -0.9*METER},
    				{x: -1.15*METER		, y: -0.9*METER},
    				{x: -1.5*METER		, y: -0.2*METER},
    			 ];

    var verts = [];    
    for(var i = 0; i < points.length; i++){
    	verts.push(new b2Vec2( points[i].x/METER, points[i].y/METER) );
    }    

    var chassisShape = createPolygonShape(verts);    
	carBody.CreateFixture(chassisShape, 1);
	
    temp.Set(x0, y0);
    carBody.SetTransform(temp, 0.0);
    carBody.SetLinearVelocity(ZERO);
    
    bodies.push(carBody);
    carBodyShape = spawnVertices(stage, 0, 0, points);
    carBodyShape.body = carBody;

    // Wheel 1    
    var r = 0.05*width/METER;
    var x1 = -1.0;
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
	fixtureDef.set_restitution(0.4);
	fixtureDef.set_shape( cshape );
	fixture = wheelBody1.CreateFixture( fixtureDef );
	
    temp.Set(x1, y1);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    wheelBody1.SetTransform(temp, 0.0);
    wheelBody1.SetLinearVelocity(ZERO);
    wheelBody1.SetAwake(1);
    wheelBody1.SetActive(1);

    bodies.push(wheelBody1);       

    shape = spawnCircle(stage, 0, 0, r*METER);
    shape.body = wheelBody1;

    // Wheel 2
    var x2 = 1.0;
    var y2 =-0.4;

    var wheelBody2 = world.CreateBody(bd);
    wheelBody2.CreateFixture(fixtureDef);

    temp.Set(x2, y2);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    wheelBody2.SetTransform(temp, 0.0);
    wheelBody2.SetLinearVelocity(ZERO);
    wheelBody2.SetAwake(1);
    wheelBody2.SetActive(1);

    bodies.push(wheelBody2);       

    shape = spawnCircle(stage, 0, 0, r*METER);
    shape.body = wheelBody2;


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
} // end createCar
var motorSpeed = 0;
function carSpeedUp(){
	rearWheelJoint.SetMotorSpeed(++motorSpeed);
}
function carSpeedDown(){
	rearWheelJoint.SetMotorSpeed(--motorSpeed);
}
function createShape1(x, y){
	x = x/METER;
	y = y/METER;
	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    var body = world.CreateBody(bd);
    
    var points = [	{x: -1*METER	, y: -1*METER},
    				{x: 3*METER		, y: -1*METER},
    				{x: 0*METER		, y: 1*METER},    				
    			 ];

    var verts = [];    
    for(var i = 0; i < points.length; i++){
    	verts.push(new b2Vec2( points[i].x/METER, points[i].y/METER) );
    }    

    var shape = createPolygonShape(verts);
    
    var fixtureDef = new b2FixtureDef();
	fixtureDef.set_density( 1 );
	fixtureDef.set_friction( 1 );
	fixtureDef.set_restitution(0.4);
	fixtureDef.set_shape( shape );
	fixture = body.CreateFixture( fixtureDef );
	
    temp.Set(x, y);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    //shape = spawnTri(stage, 25, 5, 85, 85);
    shape = spawnVertices(stage, 0, 0, points);
    shape.body = body;
}
function createGround(){
	var bd_ground = new b2BodyDef();
	bd_ground.set_type(Box2D.b2_staticBody);
    ground = world.CreateBody(bd_ground);

	var shape = new b2EdgeShape();

    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_shape(shape);
    fixtureDef.set_density(0.0);
    fixtureDef.set_friction(0.6);

    var points = [	{x: -1*METER	, y: height*0.8},
    				{x: 3*METER		, y: height*0.8},
    				{x: 5*METER		, y: height*0.8 - 0.25*METER},
    				{x: 6*METER		, y: height*0.8 - 1.0*METER},
    				{x: 9*METER		, y: height*0.8 - 1.25*METER},
    				{x: 11*METER	, y: height*0.8 - 0.0*METER},
    				{x: 13*METER	, y: height*0.8 - 0.0*METER},
    				{x: 15*METER	, y: height*0.8 + 0.5*METER},
    				{x: 17*METER	, y: height*0.8 + 1.25*METER},    				
    				{x: 18*METER	, y: height*0.8},
    				{x: 20*METER	, y: height*0.8},
    				{x: 26*METER	, y: height*0.8 - 0.25*METER},
    				{x: 27*METER	, y: height*0.8 - 1.0*METER},
    				{x: 34*METER	, y: height*0.8 - 1.25*METER},
    				{x: 36*METER	, y: height*0.8 - 0.0*METER},
    				{x: 40*METER	, y: height*0.8 - 0.0*METER},
    				{x: 42*METER	, y: height*0.8 + 0.5*METER},
    				{x: 44*METER	, y: height*0.8 + 1.25*METER},
    				{x: 44*METER	, y: 0},
    			 ];

    for (var i = 0; i < points.length-1; ++i){        
        shape.Set( new b2Vec2(points[i].x/METER, points[i].y/METER), new b2Vec2(points[i+1].x/METER, points[i+1].y/METER));
        ground.CreateFixture(fixtureDef);        
    }

    spawnLine(stage, points);
} // end createGround

function createBound() {
	/*var ground = world.CreateBody( new b2BodyDef() );
	createBall(0);*/
	var bd_ground = new b2BodyDef();
	bd_ground.set_type(Box2D.b2_staticBody);
    ground = world.CreateBody(bd_ground);

    // bot
	var shape0 = new Box2D.b2EdgeShape();
	shape0.Set(new Box2D.b2Vec2(-1.0, height/METER), new Box2D.b2Vec2(width/METER+1, height/METER)); //height/METER + 1
	ground.CreateFixture(shape0, 0.0);

	// left
	var shape1 = new Box2D.b2EdgeShape();
	shape1.Set(new Box2D.b2Vec2(0, 0), new Box2D.b2Vec2(0, height/METER)); //height/METER + 1
	ground.CreateFixture(shape1, 0.0);

	// right
	var shape1 = new Box2D.b2EdgeShape();
	shape1.Set(new Box2D.b2Vec2(width/METER, 0), new Box2D.b2Vec2(width/METER, height/METER)); //height/METER + 1
	ground.CreateFixture(shape1, 0.0);

}

function createStaticFloor(){
	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

	var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_staticBody);//b2_staticBody //b2_dynamicBody
    var body = world.CreateBody(bd);

	var shape = new Box2D.b2PolygonShape();
    shape.SetAsBox(width/2 /2/METER, height/10 /2/METER);

    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_density( 0 );
    fixtureDef.set_shape( shape );
    fixture = body.CreateFixture( fixtureDef );

    temp.Set(width/2/METER, height/2/METER);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    shape = spawnRect(stage, 25, 5, width/2, height/10);
    shape.body = body;

}

function createBall(x, y, r){//world, x, y) {
	x = x/METER;
	y = y/METER;
	r = r/METER;
    var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    var body = world.CreateBody(bd);
    var cshape = new Box2D.b2CircleShape();    	
    cshape.set_m_radius(r);
    var fixtureDef = new b2FixtureDef();
	fixtureDef.set_density( 1 );
	fixtureDef.set_friction( 1 );
	fixtureDef.set_restitution(0.4);
	fixtureDef.set_shape( cshape );
	fixture = body.CreateFixture( fixtureDef );
	
    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    shape = spawnCircle(stage, 0, 0, r*METER);
    shape.body = body;
}

function createRect(x, y, w, h){
	x = x/METER;
	y = y/METER;
	w = w/METER;
	h = h/METER;

	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    var body = world.CreateBody(bd);
    var shape = new Box2D.b2PolygonShape();    	
    shape.SetAsBox(w/2, h/2);
    var fixtureDef = new b2FixtureDef();
	fixtureDef.set_density( 1 );
	fixtureDef.set_friction( 1 );
	fixtureDef.set_restitution(0.4);
	fixtureDef.set_shape( shape );
	fixture = body.CreateFixture( fixtureDef );
	
    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    shape = spawnRect(stage, 0, 0, w*METER, h*METER);
    shape.body = body;
}

function createPoly(numVerts, x, y, r){
	x = x/METER;
	y = y/METER;
	r = r/METER;
	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    var body = world.CreateBody(bd);
    //var shape = new Box2D.b2PolygonShape();
    //shape.SetAsBox(85/2/METER, 85/2/METER);

    var verts = [];
    var width = 85;
    var height = 85;
    /*verts.push( new b2Vec2( width/2/METER, height/3 /2 /METER) );
    verts.push( new b2Vec2( 0,-2*height/3/2/METER) );
    verts.push( new b2Vec2( -width/2/METER, height/3 /2 /METER) );*/
    //radius = 85/2/METER;
    for (var i = 0; i < numVerts; i++) {
        var angle = i / numVerts * 360.0 * Math.PI / 180;
        verts.push( new b2Vec2( r * Math.sin(angle), r * -Math.cos(angle) ) );
    }

    var shape = createPolygonShape(verts);
    
    var fixtureDef = new b2FixtureDef();
	fixtureDef.set_density( 1 );
	fixtureDef.set_friction( 1 );
	fixtureDef.set_restitution(0.4);
	fixtureDef.set_shape( shape );
	fixture = body.CreateFixture( fixtureDef );
	
    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    //shape = spawnTri(stage, 25, 5, 85, 85);
    shape = spawnPoly(stage, 0, 0, numVerts, r*METER);
    shape.body = body;
}

function step(timestamp) {
    
    /*if ( currentTest && currentTest.step ) 
        currentTest.step();*/
    
    if ( ! showStats ) {
        world.Step(1/60, 2, 2);
        draw();
        return;
    }
    
    var current = Date.now();
    world.Step(1/60, 2, 2);
    var frametime = (Date.now() - current);
    frameTime60 = frameTime60 * (59/60) + frametime * (1/60);
    
    draw();
    statusUpdateCounter++;
    if ( statusUpdateCounter > 20 ) {
        updateStats();
        statusUpdateCounter = 0;
    }
}

function draw(){
	/*var node = world.GetBodyList();
		 while (node) {
			var b = node;
			node = node.GetNext();
			// Destroy objects that have floated off the screen
			var position = b.GetPosition();
			//console.log(position.x);
		}*/

}

function createBox(world, x, y, width, height, fixed) {
	if (typeof(fixed) == 'undefined') fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed) boxSd.density = 1.0;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	return world.CreateBody(boxBd)
}

var demos = {};
demos.InitWorlds = [];
