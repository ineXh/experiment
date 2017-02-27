function ShapeType(){}
ShapeType.Invalid = -1;
ShapeType.Circle = 0;
ShapeType.Rect = 1;

var shapeTemplate = {x: 0, y: 0, r: 0, width: 0, height: 0, type: ShapeType.Invalid};
function Shape(){
	this.create();
}
Shape.prototype = {
	create: function(){
		this.body = null;
		this.pos = new PVector(0, 0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);
		this.r = 50;
		this.alpha = 0.8;
		this.lineThick = 5;
		//this.sprite = buttonCreate(resources.circle.texture, 0, 0, this.r*2);		
	},
	init: function(container, input){//x, y, type){
		this.pos.x = input.x;
		this.pos.y = input.y;
		//this.maxSpeed = context.canvas.width/20;
		this.clr = getRndColor();
		this.strokeClr = getRndColor();

		this.type = input.type;
		this.r = input.r;
		this.width = input.width;
		this.height = input.height;
		this.container = container;
		//console.log(this.clr)
		this.draw();
		this.graphics.alpha = this.alpha;
	},
	update: function(){
		//this.move();
		if(this.body != null){
			this.pos.x = this.body.GetPosition().get_x()*100;
			this.pos.y = this.body.GetPosition().get_y()*100;
			this.graphics.x = this.pos.x;
			this.graphics.y = this.pos.y;
		} 
	},
	move: function(time){
		this.vel.add(this.accel);
		//this.vel.mult(damping);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.accel.mult(0);
		//if(this.border)   this.stayinBorder();
	},
	draw: function(){
		switch(this.type){
			case ShapeType.Circle:
				this.drawCircle();
			break;
			case ShapeType.Rect:
				this.drawRect();
			break;
		}
	},
	drawCircle: function(){
		this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		this.graphics.drawCircle(0, 0, this.r);
		this.graphics.endFill();
		this.container.addChild(this.graphics);
	}, // end drawCircle
	renderCircle: function(){
		//this.context.strokeStyle = '#ffffff';
		this.context.beginPath();
		this.context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, false);
		this.context.fillStyle = this.clr;//'green';
		this.context.fill();
		this.context.lineWidth = 5;
		this.context.strokeStyle = '#003300';
		this.context.stroke();
		this.context.closePath();
	}, // end renderCircle
	drawRect: function(){
		this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		this.graphics.drawRect(0, 0, this.width, this.height);
		this.graphics.endFill();
		this.container.addChild(this.graphics);
	}, // end drawRect
};
var spawnCircle = function(container, x, y, r){
	var shape = new Shape();
	shapeTemplate.x = x;
	shapeTemplate.y = y;
	shapeTemplate.r = r;
	shapeTemplate.type = ShapeType.Circle;
	shape.init(container, shapeTemplate);
	shapes.push(shape);
	return shape;
}
var spawnRect = function(container, x,y,width, height){
	var shape = new Shape();
    shapeTemplate.x = x;
    shapeTemplate.y = y;
    shapeTemplate.type = ShapeType.Rect;
    shapeTemplate.width = width;
    shapeTemplate.height = height;
    shape.init(container, shapeTemplate);
    shapes.push(shape);
    return shape;
}