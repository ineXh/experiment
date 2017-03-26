var shapeTemplate = {x: 0, y: 0, r: 0, width: 0, height: 0, numVerts: 0, type: ShapeType.Invalid,
					points: []};
function Shape(){
	this.create();
}
Shape.prototype = {
	create: function(){
		this.body = null;
		this.fixture = null;
		this.graphics = null;
		this.pos = new PVector(0, 0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);
		this.r = 50;
		this.alpha = 0.8;
		this.lineThick = 5;
		this.maxSpeed = width/20;
		this.points = [];
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
		this.numVerts = input.numVerts;
		this.container = container;

		for(var i = 0; i < input.points.length; i++){
			this.points[i] = new PVector(input.points[i].x, input.points[i].y);
		}
		//console.log(this.clr)
		this.draw();
		this.graphics.alpha = this.alpha;
	},
	update: function(){
		//this.move();
		if(this.body != null){
			this.pos.x = this.body.GetPosition().get_x()*METER;
			this.pos.y = this.body.GetPosition().get_y()*METER;
			this.graphics.x = this.pos.x;
			this.graphics.y = this.pos.y;
			this.graphics.rotation = this.body.GetAngle();
		}else{this.move();}
	},
	move: function(time){
		this.vel.add(this.accel);
		//this.vel.mult(damping);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.accel.mult(0);
		this.graphics.x = this.pos.x;//*METER;
		this.graphics.y = this.pos.y;//*METER;
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
			case ShapeType.Tri:
				this.drawTri();
			break;
			case ShapeType.Poly:
				this.drawPoly();
			break;
			case ShapeType.Line:
				if(this.points.length < 1) return;
				this.drawLine();
			break;
			case ShapeType.Vertices:
				if(this.points.length < 1) return;
				this.drawVertices();
			break;
		}
		this.container.addChild(this.graphics);
	}, // end draw
	drawCircle: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		this.graphics.drawCircle(0, 0, this.r);
		this.graphics.endFill();
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(this.r, 0);
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
	drawLine: function(){		
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.moveTo(this.points[0].x, this.points[0].y);
		for(var i = 1; i < this.points.length; i++){
			this.graphics.lineTo(this.points[i].x, this.points[i].y);
		}
	}, // end drawLine
	drawRect: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		this.graphics.drawRect(-this.width/2, -this.height/2, this.width, this.height);
		this.graphics.endFill();
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(this.width/2, 0);
		
	}, // end drawRect
	drawTri: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		
		this.graphics.moveTo(this.width/2, this.height/3);
		this.graphics.lineTo(0, -this.height*2/3);
		this.graphics.lineTo(-this.width/2, this.height/3);
		this.graphics.lineTo(this.width/2, this.height/3);

		this.graphics.endFill();
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(this.width/2/3*2, 0);
	}, // end drawTri
	drawPoly: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		
		var i = 0;
		var angle = i / this.numVerts * 360.0 * Math.PI / 180;
		this.graphics.moveTo(this.r * Math.sin(angle), this.r * -Math.cos(angle));
		for (var i = 1; i < this.numVerts + 1; i++) {
	        var angle = i / this.numVerts * 360.0 * Math.PI / 180;
	        this.graphics.lineTo(this.r * Math.sin(angle), this.r * -Math.cos(angle));
	    }
		this.graphics.endFill();
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(0, -this.r);
	}, // end drawPoly
	drawVertices: function(){
		var vertices = [];
		for(var i = 0; i < this.points.length; i++){
			vertices.push(this.points[i].x);
			vertices.push(this.points[i].y);
		}
		vertices.push(this.points[0].x);
		vertices.push(this.points[0].y);
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);		
    	this.graphics.drawPolygon(vertices);
    	this.graphics.endFill();
	}, // end drawVertices
	setRed(){
		this.clr = 0xFF0000;
		this.draw();
	},
	setRandomClr(){
		this.clr = getRndColor();
		this.draw();
	},
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
var spawnLine = function(container, points){
	var shape = new Shape();
	shapeTemplate.type = ShapeType.Line;
	shapeTemplate.points = points;
	shape.init(container, shapeTemplate);
	shapes.push(shape);
	return shape;
}
var spawnPoly = function(container, x, y, numVerts, r){
	var shape = new Shape();
	shapeTemplate.x = x;
	shapeTemplate.y = y;
	shapeTemplate.numVerts = numVerts;
	shapeTemplate.r = r;
	shapeTemplate.type = ShapeType.Poly;
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
var spawnTri = function(container, x,y,width, height){
	var shape = new Shape();
    shapeTemplate.x = x;
    shapeTemplate.y = y;
    shapeTemplate.type = ShapeType.Tri;
    shapeTemplate.width = width;
    shapeTemplate.height = height;
    shape.init(container, shapeTemplate);
    shapes.push(shape);
    return shape;
}
var spawnVertices = function(container, x, y, points){
	var shape = new Shape();
	shapeTemplate.x = x;
    shapeTemplate.y = y;
	shapeTemplate.type = ShapeType.Vertices;
	shapeTemplate.points = points;
	shape.init(container, shapeTemplate);
	shapes.push(shape);
	return shape;
}