function ControlState(){}
ControlState.None = 0;
ControlState.Left = 1;
ControlState.Right = 2;
ControlState.Up = 3;
ControlState.Down = 4;

var ACC_NONE=0;
var ACC_ACCELERATE=1;
var ACC_BRAKE=2;

var STEER_NONE=0;
var STEER_RIGHT=1;
var STEER_LEFT=2;

function Car2D(x,y){
	this.create(x,y);
}
// http://www.iforce2d.net/b2dtut/top-down-car
Car2D.prototype = {
	create: function(x,y){
		this.controlState = ControlState.None;

		this.power = 2;
		this.vel = new PVector(0, 0);
		this.steer = STEER_NONE;
		this.accelerate = ACC_NONE;
		this.acceleration = height/10000;
		scale = 10;
	    points = [{x: 1.5*scale, y: 0*scale}  , {x: 3*scale, y: 2.5*scale}, 
	                {x: 2.8*scale, y: 5.5*scale}, {x: 1*scale, y: 10*scale} , 
	                {x: -1*scale, y: 10*scale}  , {x: -2.8*scale, y: 5.5*scale}, 
	                {x: -3*scale, y: 2.5*scale}, {x: -1.5*scale, y: 0*scale}];
	    this.shape = createShape(x, y, points);
	    this.body = this.shape.body;
	    this.tires = [];
		this.LFTire = new Tire2D(this, x - 30,y + 75);
		this.RFTire = new Tire2D(this, x + 30,y + 75);
		this.LBTire = new Tire2D(this, x - 30,y + 15);
		this.RBTire = new Tire2D(this, x + 30,y + 15);
		this.tires.push(this.LFTire);
		this.tires.push(this.RFTire);
		this.tires.push(this.LBTire);
		this.tires.push(this.RBTire);

		var jointDef = new b2RevoluteJointDef();
		//var axis = new b2Vec2(0.0, -1.0);
	    jointDef.Initialize(this.body, this.LFTire.body, this.LFTire.body.GetWorldCenter());//, axis);
	    //debugger;
	    //jointDef.set_bodyA(this.body);
	    jointDef.set_enableLimit(true);
	    jointDef.set_lowerAngle(0);
	    jointDef.set_upperAngle(0);
	    jointDef.set_localAnchorB(new b2Vec2(0.0, 0.0))
	    
	    //jointDef.set_bodyB(this.LFTire.body);
	    //jointDef.set_localAnchorA(new b2Vec2(-3*scale, 8.5*scale))	    
	    LFJoint = Box2D.castObject( world.CreateJoint(jointDef), b2RevoluteJoint );
	    //var jointDef = new b2RevoluteJointDef();
	    jointDef.Initialize(this.body, this.RFTire.body, this.RFTire.body.GetWorldCenter());
		RFJoint = Box2D.castObject( world.CreateJoint(jointDef), b2RevoluteJoint );

		jointDef.Initialize(this.body, this.RFTire.body, this.RFTire.body.GetWorldCenter());
		RFJoint = Box2D.castObject( world.CreateJoint(jointDef), b2RevoluteJoint );

		jointDef.Initialize(this.body, this.LBTire.body, this.LBTire.body.GetWorldCenter());
		LBJoint = Box2D.castObject( world.CreateJoint(jointDef), b2RevoluteJoint );

		jointDef.Initialize(this.body, this.RBTire.body, this.RBTire.body.GetWorldCenter());
		RBJoint = Box2D.castObject( world.CreateJoint(jointDef), b2RevoluteJoint );

	},

	update: function(){
		this.handleInput();
		for(var i=0;i<this.tires.length;i++){
            this.tires[i].killSidewaysVelocity();
        }

        msDuration = 20;
        this.max_steer_angle = PI/4;///180*PI;
        var incr=(this.max_steer_angle/200) * msDuration;
        

        this.wheel_angle=0;
        if(this.steer == STEER_LEFT)
        	this.wheel_angle=Math.max(Math.min(this.wheel_angle, 0)-incr, -this.max_steer_angle) //decrement angle without going over max steer
        else if(this.steer == STEER_RIGHT)
        	this.wheel_angle=Math.min(Math.max(this.wheel_angle, 0)+incr, this.max_steer_angle) //increment angle without going over max steer
        //console.log(this.wheel_angle);
        
        this.LFTire.setAngle(this.wheel_angle);
        this.RFTire.setAngle(this.wheel_angle);

        var fvect = [0, 0];
        if(this.accelerate == ACC_ACCELERATE)
        		fvect=[0, 1*this.power];
       	else if(this.accelerate == ACC_BRAKE)
        		fvect=[0, -0.7*this.power];
        
        //console.log(fvect);

		var position=this.LFTire.body.GetWorldCenter();
           this.LFTire.body.ApplyForce(this.LFTire.body.GetWorldVector(new b2Vec2(fvect[0], fvect[1])), position );
        var position=this.RFTire.body.GetWorldCenter();
           this.RFTire.body.ApplyForce(this.RFTire.body.GetWorldVector(new b2Vec2(fvect[0], fvect[1])), position );
		//this.LFTire.updateFriction();
		//this.LFTire.updateDrive(this.controlState);
		//this.RFTire.updateFriction();
		//this.RFTire.updateDrive(this.controlState);
	},
	handleInput: function(){
    	//if(this != car1) return;
        if(keys[37] || keys[65]){
        	this.steer = STEER_LEFT;
            this.turnLeft();
        }else if(keys[39] || keys[68]){
        	this.steer = STEER_RIGHT;
            this.turnRight();
        }else{
        	this.steer = STEER_NONE;
        	this.straighten();
        }
        if(keys[38] || keys[87]){
        	this.accelerate = ACC_ACCELERATE;
            this.speedUp();
            //console.log('speedup')
        }else if(keys[40] || keys[83]){
        	this.accelerate = ACC_BRAKE;
            this.speedDown();
        }else{
        	this.accelerate = ACC_NONE;
        }
    }, // end handleInput
    turnLeft: function(){
    	this.controlState = ControlState.Left;    	
    },
    turnRight: function(){ 
    	this.controlState = ControlState.Right;
    },
    straighten: function(){
    	this.controlState = ControlState.None;
    },	
	speedUp: function(){
		this.controlState = ControlState.Up;
		/*var velocity = this.body.GetLinearVelocity();
		this.vel.x = velocity.get_x();	this.vel.y = velocity.get_y();
		//this.speed = this.vel.mag();
	    //this.speed += this.acceleration;
	    this.vel.y += this.acceleration;
	    //this.vel.limit(this.maxSpeed);
	    velocity=new b2Vec2(this.vel.x, this.vel.y);
	    this.body.SetLinearVelocity(velocity);*/

	},
	speedDown: function(){
		this.controlState = ControlState.Down;
	},
} // end Car2D

function Tire2D(car, x, y){
	this.create(car, x, y);
}
Tire2D.prototype = {
	create: function(car, x,y){
		this.car = car;
		this.x = x;
		this.y = y;
		this.maxForwardSpeed = 2;  // 100;
  		this.maxBackwardSpeed = -1; // -20;
  		this.maxDriveForce = 2;    // 150;

		this.width = width/30;
		this.height = height/20;
		useForDebug = false;
		this.shape = createRect(x,y, this.width, this.height, Box2D.b2_dynamicBody, useForDebug);
		this.body = this.shape.body;
	},
	update: function(){

	},
	updateDrive: function(controlState){
		var desiredSpeed = 0;
      switch ( controlState) {
          case ControlState.Up:   desiredSpeed = this.maxForwardSpeed;  break;
          case ControlState.Down: desiredSpeed = this.maxBackwardSpeed; break;
          default: return;//do nothing
      }
      
      //find current speed in forward direction
      currentForwardNormal = this.body.GetWorldVector( b2Vec2(0,1) );
      var currentSpeed = b2Dot( this.getForwardVelocity(), currentForwardNormal );
      
      //apply necessary force
      var force = 0;
      if ( desiredSpeed > currentSpeed )
          force = this.maxDriveForce;
      else if ( desiredSpeed < currentSpeed )
          force = -this.maxDriveForce;
      else
          return;
      //this.body.ApplyForce( force * currentForwardNormal, this.body.GetWorldCenter() );
	},
	getLateralVelocity: function() {
      //currentRightNormal = this.body.GetWorldVector( b2Vec2(1,0) );
      //var dot = b2Dot( currentRightNormal, this.body.GetLinearVelocity());
      //latVel = new b2Vec2(dot*currentRightNormal.get_x(), dot*currentRightNormal.get_y())
      //return null;// latVel;
   }, 
   updateFriction: function() {
   		mass = this.body.GetMass();
   		localVel = this.getLocalVelocity();
   		console.log(localVel)
   		//latVel = this.getLateralVelocity()
    	//impulse = new b2Vec2(-mass*latVel.get_x(), -mass*latVel.get_y());
      //console.log(impulse.get_x() + ', ' + impulse.get_y());
      //debugger;
      //this.body.ApplyLinearImpulse( impulse, this.body.GetWorldCenter() );
   },
   setAngle: function(angle){
   	this.body.SetTransform(this.body.GetPosition(),
        	angle);
   },
   getDirectionVector: function(){
   	return vectorRotate((this.getLocalVelocity()[1]>0) ? [0, 1]:[0, -1] , this.body.GetAngle()) ;
   },
   getKillVelocityVector: function(){
		var velocity=this.body.GetLinearVelocity();
	    var sideways_axis=this.getDirectionVector();
	    var dotprod = velocity.get_x()*sideways_axis[0] + 
	    				velocity.get_y()*sideways_axis[1];
	    return [sideways_axis[0]*dotprod, sideways_axis[1]*dotprod];
   },
   killSidewaysVelocity: function(){
   	var kv=this.getKillVelocityVector();
    this.body.SetLinearVelocity(new b2Vec2(kv[0], kv[1]));
   },
   getLocalVelocity: function(){    
    	var res=this.car.body.GetLocalVector(
    		this.car.body.GetLinearVelocityFromLocalPoint(new b2Vec2(this.x, this.y)));
    	//console.log(res)
    	return [res.get_x(), res.get_y()];
	},
} // end Tire2D
