function CarFlat(x,y){
	this.create(x,y);
}
CarFlat.prototype = {
	create: function(x,y){
		this.pos = new PVector(0, 0);
        this.frontWheel = new PVector(0, 0);
        this.backWheel = new PVector(0, 0);
        this.vel = new PVector(0, 0);
        this.accel = new PVector(0, 0);
        this.speed = 0;
		this.maxSpeed = 4;

		this.acceleration = height/10000;

		this.angleTolerance = PI/240;
        this.angleSpeed = PI/600;

        this.carHeading = 3*PI/2;
        //this.carHeading = new PVector(0, -1);
        this.steerAngle = 0;

        this.width = width/10;
        this.height = height/8;
        this.wheelWidth = this.width/5;
        this.wheelHeight = this.height/5;

		this.shape = createRect(x,y, this.width, this.height);
		this.body = this.shape.body;

		this.shape.body.SetLinearDamping(0.8);  //gradually reduces velocity, makes the car reduce speed slowly if neither accelerator nor brake is pressed
    	this.shape.body.SetBullet(true); //dedicates more time to collision detection - car travelling at high speeds at low framerates otherwise might teleport through obstacles.
    	this.shape.body.SetAngularDamping(0.3);

    	this.shape.fixture.SetDensity(1);
    	this.shape.fixture.SetFriction(0.3);
    	this.shape.fixture.SetRestitution(0.4);
    	
    	this.wheels = [];
    	wheel = new Wheel(x-this.width/2,y+this.height/2,true, true, this);
    	wheel = new Wheel(x+this.width/2,y+this.height/2,true, true, this);
    	/*wheel = createRect(x-this.width/2,y+this.height/2, this.width/5, this.height/5);
    	wheel.fixture.SetSensor(true);
    	var jointdef = new b2RevoluteJointDef();
    	jointdef.Initialize(this.shape.body, wheel.body, wheel.body.GetWorldCenter());
    	jointdef.set_enableMotor(true);*/


		//this.createBox2D(width/4,height/2, width/8);//width/2, height/2);
		this.carContainer = new PIXI.Container();

        this.wheelBackLSprite = new PIXI.extras.MovieClip(wheelBackTexture);
        this.wheelBackRSprite = new PIXI.extras.MovieClip(wheelBackTexture);
        this.wheelFrontLSprite = new PIXI.extras.MovieClip(wheelFrontTexture);
        this.wheelFrontRSprite = new PIXI.extras.MovieClip(wheelFrontTexture);

        this.sprite = buttonCreate(carBodyTexture, 0, 0, this.width);        
        this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
        this.wheelBackLSprite.anchor.x = this.wheelBackLSprite.anchor.y = 0.5;
        this.wheelBackRSprite.anchor.x = this.wheelBackRSprite.anchor.y = 0.5;
        this.wheelFrontLSprite.anchor.x = this.wheelFrontLSprite.anchor.y = 0.5;
        this.wheelFrontRSprite.anchor.x = this.wheelFrontRSprite.anchor.y = 0.5;

        /*this.carContainer.addChild(this.sprite);
        this.carContainer.addChild(this.wheelBackLSprite);
        this.carContainer.addChild(this.wheelBackRSprite);
        this.carContainer.addChild(this.wheelFrontLSprite);
        this.carContainer.addChild(this.wheelFrontRSprite);*/
	},
	scale: function(height){
        scale = height / this.sprite.texture.height;

        //this.speedChange = dim/2000*scale;
        //this.maxSpeed = dim/100*scale;
        //this.maxforce = dim/1000*scale;

        this.sprite.scale.set(scale);
        this.wheelBackLSprite.scale.set(scale);
        this.wheelBackRSprite.scale.set(scale);
        this.wheelFrontLSprite.scale.set(scale);
        this.wheelFrontRSprite.scale.set(scale);

        this.wheelBackLSprite.x = -this.sprite.width/2*0.8;
        this.wheelBackLSprite.y = -this.sprite.height/2*0.3;
        this.wheelBackRSprite.x = -this.wheelBackLSprite.x;
        this.wheelBackRSprite.y = this.wheelBackLSprite.y;

        this.wheelFrontLSprite.x = -this.sprite.width/2*0.5;
        this.wheelFrontLSprite.y = this.sprite.height/2*0.85;
        this.wheelFrontRSprite.x = -this.wheelFrontLSprite.x;
        this.wheelFrontRSprite.y = this.wheelFrontLSprite.y;

        this.wheelBase = this.wheelFrontLSprite.y - this.wheelBackLSprite.y; // the distance between the two axles
        // opposite side
        this.wheelFrontRatio = - this.wheelBackLSprite.y / this.wheelBase;
        this.wheelBackRatio = this.wheelFrontLSprite.y / this.wheelBase;
    },
	createBox2D: function(){		
		
	},
	init: function(x, y, container){
		this.container = container;

		this.scale(this.height);		
		container.addChild(this.carContainer);		
	},
	update(){
		this.handleInput();
		
		if(this.shape.body){
			this.pos.x = this.shape.body.GetPosition().get_x()*METER;
			this.pos.y = this.shape.body.GetPosition().get_y()*METER;
			this.carContainer.rotation = this.shape.body.GetAngle();
			this.carContainer.x = this.pos.x;
        	this.carContainer.y = this.pos.y;
			//this.carHeading = new PVector.fromAngle(this.carContainer.rotation + PI/2);

			//rotation = this.carContainer.rotation + this.steerAngle;
			var velocity=this.shape.body.GetLinearVelocity();			
			this.vel.x = velocity.get_x();	this.vel.y = velocity.get_y();

			var heading = new PVector.fromAngle(this.carHeading);
			//this.speed = this.vel.dot(heading);
			//console.log(this.vel.dot(heading));
			this.speed *= 0.99;

			this.vel.x = -this.speed*Math.cos(this.carHeading);
			this.vel.y = -this.speed*Math.sin(this.carHeading);
			//console.log(this.speed);
			this.vel.limit(this.maxSpeed);
			velocity=new b2Vec2(this.vel.x, this.vel.y);
	    	this.shape.body.SetLinearVelocity(velocity);
			//console.log(this.carHeading)
		}		
		//this.updateWheel();
        /*var velocity=this.shape.body.GetLinearVelocity();
	    this.vel.x = velocity.get_x();	this.vel.y = velocity.get_y();
	    this.vel.y += this.speed;
	    this.vel.limit(this.maxSpeed);
	    velocity=new b2Vec2(this.vel.x, this.vel.y);
	    this.shape.body.SetLinearVelocity(velocity);*/



        //this.speed = this.vel.mag();
        this.setWheelSpeed();
	},
	updateWheel: function(){ 
        this.frontWheel.x = this.pos.x + this.wheelFrontLSprite.y*Math.cos(this.carHeading);
        this.frontWheel.y = this.pos.y + this.wheelFrontLSprite.y*Math.sin(this.carHeading);

        this.backWheel.x = this.pos.x + this.wheelBackLSprite.y*Math.cos(this.carHeading);
        this.backWheel.y = this.pos.y + this.wheelBackLSprite.y*Math.sin(this.carHeading);

        this.frontWheel.x += this.speed *Math.cos(this.carHeading + this.steerAngle);
        this.frontWheel.y += this.speed *Math.sin(this.carHeading + this.steerAngle);

        this.backWheel.x += this.speed *Math.cos(this.carHeading);
        this.backWheel.y += this.speed *Math.sin(this.carHeading);

        //this.carContainer.rotation = this.carHeading + PI/2;
        
        //this.shape.body.SetFixedRotation(this.carContainer.rotation);
        
        this.shape.body.SetTransform(this.shape.body.GetPosition(), this.carHeading + PI/2);
        //this.shape.body.SetTransform(this.shape.body.GetPosition(), this.shape.body.GetAngle());
        //body->SetAngularVelocity(0);

        //this.pos.x = this.frontWheel.x *this.wheelFrontRatio + this.backWheel.x * this.wheelBackRatio;
        //this.pos.y = this.frontWheel.y *this.wheelFrontRatio + this.backWheel.y * this.wheelBackRatio;

        this.carHeading = lock(Math.atan2( this.frontWheel.y - this.backWheel.y ,
                                      this.frontWheel.x - this.backWheel.x ));
        //this.carHeading += car1.shape.body.GetAngularVelocity();
    }, // end updateWheel
    setWheelSpeed: function(){
        speed = this.speed / this.maxSpeed;
        if(Math.abs(speed) < 0.05){
            if(this.moving){
                this.moving = false;
                this.wheelBackLSprite.stop();
                this.wheelBackRSprite.stop();
                this.wheelFrontLSprite.stop();
                this.wheelFrontRSprite.stop();
            }
        }else{
            speed = speed*5;
            this.wheelBackLSprite.animationSpeed = speed;
            this.wheelBackRSprite.animationSpeed = speed;
            this.wheelFrontLSprite.animationSpeed = speed;
            this.wheelFrontRSprite.animationSpeed = speed;
            if(!this.moving){
                this.moving = true;
                this.wheelBackLSprite.play();
                this.wheelBackRSprite.play();
                this.wheelFrontLSprite.play();
                this.wheelFrontRSprite.play();
            }
        }
    },
    clean: function(){
        this.container.removeChild(this.carContainer);        
    },
    handleInput: function(){
    	if(this != car1) return;
        if(keys[37] || keys[65]){
            this.turnLeft();
        }else if(keys[39] || keys[68]){
            this.turnRight();
        }else{
        	this.straighten();
        }
        if(keys[38] || keys[87]){
            this.speedUp();
        }
        
        if(keys[40] || keys[83]){
            this.speedDown();
        }
    }, // end handleInput
    turnLeft: function(){
        //this.steerAngle -= PI/120; //PI/60; //
        //if(this.steerAngle <= -PI/6) this.steerAngle = -PI/6;
        this.steerAngle = -PI/6;
        this.wheelFrontLSprite.rotation = this.steerAngle;
        this.wheelFrontRSprite.rotation = this.steerAngle;
    },
    turnRight: function(){
        //this.steerAngle += PI/120; //PI/60; //
        //if(this.steerAngle >= PI/6) this.steerAngle = PI/6;
        this.steerAngle = PI/6;
        this.wheelFrontLSprite.rotation = this.steerAngle;
        this.wheelFrontRSprite.rotation = this.steerAngle;
    },
    straighten: function(){
        //this.steerAngle += PI/120; //PI/60; //
        //if(this.steerAngle >= PI/6) this.steerAngle = PI/6;
        this.steerAngle = 0;
        this.wheelFrontLSprite.rotation = this.steerAngle;
        this.wheelFrontRSprite.rotation = this.steerAngle;
    },
	/*turnLeft(){
		//console.log('left')
		var velocity=this.shape.body.GetLinearVelocity();
	    //velocity=vectors.unit([velocity.get_x(), velocity.get_y()]);
	    this.vel.x = velocity.get_x();	this.vel.y = velocity.get_y();
	    this.vel.x -= this.speed;
	    this.vel.limit(this.maxSpeed);
	    velocity=new b2Vec2(this.vel.x, this.vel.y);
	    this.shape.body.SetLinearVelocity(velocity);
	},
	turnRight(){
		//console.log('right')
		var velocity=this.shape.body.GetLinearVelocity();
	    //velocity=vectors.unit([velocity.get_x(), velocity.get_y()]);
	    this.vel.x = velocity.get_x();	this.vel.y = velocity.get_y();
	    this.vel.x += this.speed;
	    this.vel.limit(this.maxSpeed);
	    velocity=new b2Vec2(this.vel.x, this.vel.y);
	    this.shape.body.SetLinearVelocity(velocity);
	},*/
	speedUp(){
		this.speed += this.acceleration;
        if(this.speed >= this.maxSpeed) this.speed = this.maxSpeed;
		/*//console.log('up')
		var velocity = this.shape.body.GetLinearVelocity();
	    this.vel.x = velocity.get_x();	this.vel.y = velocity.get_y();

	    //this.speed = this.vel.mag();
	    this.speed += this.acceleration;
	    if(this.speed > this.maxSpeed) this.speed = this.maxSpeed;
	    
		
		this.carHeading.normalize();
	    this.carHeading.mult(this.speed);
	    this.vel.x += this.carHeading.x;
	    this.vel.y += this.carHeading.y;
	    //this.vel.y -= this.speed;
	    //this.vel.limit(this.maxSpeed);

	    velocity=new b2Vec2(this.vel.x, this.vel.y);
	    this.shape.body.SetLinearVelocity(velocity);*/
	},
	speedDown(){
		this.speed -= this.acceleration;
        if(this.speed <= -this.maxSpeed) this.speed = -this.maxSpeed;
		/*//console.log('down')
		var velocity=this.shape.body.GetLinearVelocity();
	    this.vel.x = velocity.get_x();	this.vel.y = velocity.get_y();
	    this.vel.y += this.speed;
	    this.vel.limit(this.maxSpeed);
	    velocity=new b2Vec2(this.vel.x, this.vel.y);
	    this.shape.body.SetLinearVelocity(velocity);*/
	},
} // end CarFlat

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