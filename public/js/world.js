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
    createGround();
    /*var bd_ground = new Box2D.b2BodyDef();
    ground = world.CreateBody(bd_ground);
    var shape0 = new Box2D.b2EdgeShape();
    shape0.Set(new Box2D.b2Vec2(-40.0, -6), new Box2D.b2Vec2(40.0, -6));
	ground.CreateFixture(shape0, 0.0);

	*/
	for(var i = 0; i < 10; i++){
		createBall(Math.random()*width/METER, -getRandomInt(50,5000) / METER);	
	}
	

}

function createGround() {
	/*var ground = world.CreateBody( new b2BodyDef() );
	createBall(0);*/

	var bd_ground = new b2BodyDef();
	bd_ground.set_type(Box2D.b2_staticBody);	
    ground = world.CreateBody(bd_ground);

    // bot
	var shape0 = new Box2D.b2EdgeShape();
	shape0.Set(new Box2D.b2Vec2(-40.0, height/METER), new Box2D.b2Vec2(40.0, height/METER)); //height/METER + 1
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

function createBall(x, y){//world, x, y) {
	/*var cshape = new Box2D.b2CircleShape();
    cshape.set_m_radius(0.5);

	var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

	var bd = new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    bd.set_position(ZERO);
    var body = world.CreateBody(bd);
    var randomValue = Math.random();
    var density = 1.0;
    fixture = body.CreateFixture(cshape, density);
    //if ( randomValue < 0.2 )
    //    body.CreateFixture(cshape, 1.0);
    //else
    //    body.CreateFixture(createRandomPolygonShape(0.5), 1.0);
    temp.Set(25,5);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);
    
    bodies.push(body);
    shape = spawnCircle(stage, 25, 5, r);
    shape.body = body;
    //fShape[0].GetPosition().get_y()*/
    //debugger;*/

    var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd	= new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    var body = world.CreateBody(bd);
    var cshape = new Box2D.b2CircleShape();    	
    cshape.set_m_radius(85 / 2 / METER);
    var fixtureDef = new b2FixtureDef();
	fixtureDef.set_density( 1 );
	fixtureDef.set_friction( 1 );
	fixtureDef.set_restitution(0.4);
	fixtureDef.set_shape( cshape );
	fixture = body.CreateFixture( fixtureDef );
	
	//debugger;

    //fixture = body.CreateFixture(cshape, density);

    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);


    bodies.push(body);
    shape = spawnCircle(stage, 25, 5, 85/2);
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
    world.Step(1/60, 3, 2);
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
