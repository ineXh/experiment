// https://github.com/kripken/box2d.js

using(Box2D, "b2.+");

var bodies = [];


function createWorld() {
	this.bgSprite = buttonCreate(PIXI.Texture.fromFrame("trackA"),
                     width/2, height/2, this.width);
    stage.addChild(this.bgSprite);
    
	var gravity = new Box2D.b2Vec2(0.0, 0.0);
    world = new Box2D.b2World(gravity);
    
    createStaticFloor(width/2,0,width,height/20);
    createStaticFloor(width/2,height,width,height/20);
    createStaticFloor(0,height/2,height/20,height);
    createStaticFloor(width,height/2,height/20,height);

    /*for(var i = 0; i < StageData[0].out.length; i++){
        createField(StageData[0].out[i]);
    } */   
    createField(StageData[0].out);

	car1 = new CarFlat(width/2, height*0.3);
    car1.init(0,0, stage);

    car2 = new Car2D(width/2, height*0.3);
    


    //car2 = new CarFlat(width/2, height/2);
    //car2.init(0,0, stage);

    //createSensorRect(width*0.5, height*0.3,width/20,height/5);
    //trigger = new TrackTrigger(width*0.5, height*0.2, width*0.5, height*0.3);
     //createRect(350, 100, 35, 100);
    
    //createCar(0, 0);
	//stage.x = 200;

    listener = new Box2D.JSContactListener();
    listener.BeginContact = function (contactPtr) {
        //console.log('begin contact')
        var contact = Box2D.wrapPointer( contactPtr, b2Contact );
        var fixtureA = contact.GetFixtureA();
        var fixtureB = contact.GetFixtureB();

        if(fixtureA.shape.boxObjectType == BoxObjectType.Car && fixtureB.shape.boxObjectType == BoxObjectType.Field){
            fixtureA.shape.parent.offRoad = true;
            fixtureA.shape.parent.colliders[BoxObjectType.Field][fixtureB.e] = fixtureB;
            fixtureB.shape.setRed();
        }else if(fixtureB.shape.boxObjectType == BoxObjectType.Car && fixtureA.shape.boxObjectType == BoxObjectType.Field){
            fixtureB.shape.parent.offRoad = true;
            fixtureB.shape.parent.colliders[BoxObjectType.Field][fixtureA.e] = fixtureA;
            fixtureA.shape.setRed();
        }        

        // now do what you wish with the fixtures
    }

    // Empty implementations for unused methods.
    listener.EndContact = function(contactPtr) {
        //console.log('end contact');
        var contact = Box2D.wrapPointer( contactPtr, b2Contact );
        var fixtureA = contact.GetFixtureA();
        var fixtureB = contact.GetFixtureB();

        if(fixtureA.shape.boxObjectType == BoxObjectType.Car && fixtureB.shape.boxObjectType == BoxObjectType.Field){
            delete fixtureA.shape.parent.colliders[BoxObjectType.Field][fixtureB.e]
            fixtureB.shape.setRandomClr();
        }else if(fixtureB.shape.boxObjectType == BoxObjectType.Car && fixtureA.shape.boxObjectType == BoxObjectType.Field){
            delete fixtureB.shape.parent.colliders[BoxObjectType.Field][fixtureA.e]
            fixtureA.shape.setRandomClr();
        }
    };
    listener.PreSolve = function() {};
    listener.PostSolve = function() {};

    world.SetContactListener( listener );
} // end createWorld




function createCar(x, y){
	
}

function createShape(x, y, points){
    x = x/METER;
    y = y/METER;
    var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);
    var bd  = new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody); //b2_dynamicBody //b2_staticBody
    var body = world.CreateBody(bd);

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
    
    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    //shape = spawnTri(stage, 25, 5, 85, 85);
    shape = spawnVertices(stage, 0, 0, points);
    shape.body = body;
    shape.fixture = fixture;
    fixture.shape = shape;
    return shape
}
function createField(verticesArray){
    x = 0;//x/METER;
    y = 0;//y/METER;
    var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd  = new b2BodyDef();
    bd.set_type(Box2D.b2_staticBody); //b2_dynamicBody //b2_staticBody
    var body = world.CreateBody(bd);
    
    var points = [];
    for(var i = 0; i < verticesArray.length; i++){
        vertices = verticesArray[i];
        points[i] = [];
        for(var j = 0; j < vertices.length; j=j+2){
            points[i].push({x: vertices[j]*width, y: vertices[j+1]*height});
        }
    }

    var verts = [];    
    for(var i = 0; i < points.length; i++){
        verts.length = 0;
        for(var j = 0; j < points[i].length; j++){
            verts.push(new b2Vec2( points[i][j].x/METER, points[i][j].y/METER) );    
        }
        var shape = createPolygonShape(verts);
        //var shape = new b2EdgeShape();
        
        var fixtureDef = new b2FixtureDef();
        fixtureDef.set_shape( shape );
        fixtureDef.set_density( 1 );
        fixtureDef.set_friction( 1 );
        fixtureDef.set_restitution(0.4);
        fixtureDef.set_isSensor(true);
           
        fixture = body.CreateFixture( fixtureDef );    

        usedForDebug = true;
        shape = spawnVertices(stage, 0, 0, points[i], usedForDebug);
        shape.body = body;
        shape.fixture = fixture;
        fixture.shape = shape;
        fixture.shape.boxObjectType = BoxObjectType.Field;
    }        
    
    temp.Set(x, y);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);

    //spawnLine(stage, points);
    //shape = spawnTri(stage, 25, 5, 85, 85);
    
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
    shape.fixture.SetSensor(true);
    return shape;
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

function createRect(x, y, w, h, box2dtype, usedForDebug){
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

    if(usedForDebug == undefined) usedForDebug = false;
    shape = spawnRect(stage, 0, 0, w*METER, h*METER, usedForDebug);
    shape.body = body;
    shape.fixture = fixture;
    fixture.shape = shape;
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
    shape.fixture = fixture;
    fixture.shape = shape;
    return shape;
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
