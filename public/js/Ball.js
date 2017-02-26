function Ball(){
	this.create();
}
Ball.prototype = {
	create: function(){
		this.pos = new PVector(0, 0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);
		this.r = 50;

	},
	init: function(context, x, y){
		this.context = context;
		this.pos.x = x;
		this.pos.y = y;
		this.maxSpeed = context.canvas.width/20;
		this.clr = getRndColor();
		//console.log(this.clr)
	},
	update: function(){
		this.move();
	},
	move: function(time){
		this.vel.add(this.accel);
		//this.vel.mult(damping);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.accel.mult(0);
		//if(this.border)   this.stayinBorder();
	}, 
	render: function(){
		//this.context.strokeStyle = '#ffffff';
		this.context.beginPath();
		this.context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, false);
		this.context.fillStyle = this.clr;//'green';
		this.context.fill();
		this.context.lineWidth = 5;
		this.context.strokeStyle = '#003300';
		this.context.stroke();
		this.context.closePath();
	},
};
