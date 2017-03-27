// https://github.com/kripken/box2d.js
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

function createWorld() {
	
	var gravity = new Box2D.b2Vec2(0.0, 0.0);
    world = new Box2D.b2World(gravity);
    
    createStaticFloor(width/2,0,width,height/20);
    createStaticFloor(width/2,height,width,height/20);
    createStaticFloor(0,height/2,height/20,height);
    createStaticFloor(width,height/2,height/20,height);

	car1 = new CarFlat(width/2, height/2);
    car1.init(0,0, stage);

    car2 = new CarFlat(width/2, height/2);
    car2.init(0,0, stage);

    //createCar(0, 0);
	//stage.x = 200;

    listener = new Box2D.JSContactListener();
    listener.BeginContact = function (contactPtr) {
        //console.log('begin contact')
        var contact = Box2D.wrapPointer( contactPtr, b2Contact );
        var fixtureA = contact.GetFixtureA();
        var fixtureB = contact.GetFixtureB();

        if(fixtureB.shape) fixtureB.shape.setRed();
        // now do what you wish with the fixtures
    }

    // Empty implementations for unused methods.
    listener.EndContact = function(contactPtr) {
        //console.log('end contact');
        var contact = Box2D.wrapPointer( contactPtr, b2Contact );
        var fixtureA = contact.GetFixtureA();
        var fixtureB = contact.GetFixtureB();

        if(fixtureB.shape) fixtureB.shape.setRandomClr();
    };
    listener.PreSolve = function() {};
    listener.PostSolve = function() {};

    world.SetContactListener( listener );
}


function createCar(x, y){
	
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
    				{x: 28*METER	, y: height*0.8},
    				{x: 30*METER	, y: height*0.8},
    				{x: 36*METER	, y: height*0.8 - 0.25*METER},
    				{x: 37*METER	, y: height*0.8 - 1.0*METER},
    				{x: 44*METER	, y: height*0.8 - 1.25*METER},
    				{x: 46*METER	, y: height*0.8 - 0.0*METER},
    				{x: 50*METER	, y: height*0.8 - 0.0*METER},
    				{x: 52*METER	, y: height*0.8 + 0.5*METER},
    				{x: 54*METER	, y: height*0.8 + 1.25*METER},
    				{x: 75*METER	, y: height*0.5 + 1.25*METER},
    				{x: 100*METER	, y: height*0.8 + 1.25*METER},
    				{x: 100*METER	, y: 0},
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

function createStaticFloor(x,y,w,h){
    x = x/METER;
    y = y/METER;
    w = w/METER;
    h = h/METER;

	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

	var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_staticBody);//b2_staticBody //b2_dynamicBody
    var body = world.CreateBody(bd);

	var shape = new Box2D.b2PolygonShape();
    shape.SetAsBox(w/2, h/2);

    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_density( 0 );
    fixtureDef.set_shape( shape );    
    fixture = body.CreateFixture( fixtureDef );

    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    shape = spawnRect(stage, x, y, w*METER, h*METER);    
    shape.body = body;
    shape.fixture = fixture;
    fixture.shape = shape;
    shape.fixtureDef = fixtureDef;
    return shape;
}
function createSensorRect(x,y,w,h){
    shape = createStaticFloor(x,y,w,h);
    
    //shape.fixtureDef.set_isSensor(true);
    //shape.body.CreateFixture( shape.fixtureDef );
    shape.fixture.SetSensor(true);
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

function createRect(x, y, w, h, box2dtype){
	x = x/METER;
	y = y/METER;
	w = w/METER;
	h = h/METER;

	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd	= new b2BodyDef();
    if(box2dtype){
        bd.set_type(box2dtype);
    }else{
        bd.set_type(Box2D.b2_dynamicBody);    
    }
    
    
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
    shape.fixture = fixture;
    return shape;
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
    //console.log('step')
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
