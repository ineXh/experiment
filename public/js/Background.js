function Background(){
	this.create();
}
Background.prototype = {
	create: function(){
		this.points = [];

		this.pos = new PVector(0, 400);
		this.lineThick = 5;
		this.clr = getRndColor();
		this.strokeClr = getRndColor();
		this.r = 10;

		
		var n = getRandomInt(2,4);
		
		this.points.push(new PVector(0, 0));
		var pt = this.points[this.points.length-1];
		this.points.push(new PVector(pt.x + width/10, pt.y + getRandomRange(-height*0.2, 0)));
		var pt = this.points[this.points.length-1];
		this.points.push(new PVector(pt.x + width/10, pt.y + getRandomRange(0, height*0.1)));
		var pt = this.points[this.points.length-1];
		this.points.push(new PVector(pt.x + width/10, pt.y + getRandomRange(0, height*0.1)));

		for(var i = 0; i < 2; i++){
			var ptN1 = this.points[this.points.length-2]; 
			var pt0 = this.points[this.points.length-1];
			this.points.push(new PVector(2*pt0.x-ptN1.x, 2*pt0.y-ptN1.y));

			var pt = this.points[this.points.length-1];
			this.points.push(new PVector(pt.x + width/10, pt.y + getRandomRange(-height*0.2, 0)));

			var pt = this.points[this.points.length-1];
			this.points.push(new PVector(pt.x + width/10, pt.y + getRandomRange(0, height*0.1)));
		}

		var ptN1 = this.points[this.points.length-2]; 
		var pt0 = this.points[this.points.length-1];
		this.points.push(new PVector(2*pt0.x-ptN1.x, 2*pt0.y-ptN1.y));

		var pt = this.points[this.points.length-1];
		this.points.push(new PVector(pt.x + width/10, pt.y + getRandomRange(-height*0.2, 0)));

		this.points.push(new PVector(width*1.5, 0));

		this.graphics = new PIXI.Graphics();
		this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, getRndColor(), 1);
		this.graphics.beginFill(getRndColor(), 1);		
		
		for(var i = 0; i < this.points.length; i++){
			this.graphics.drawCircle(this.points[i].x, this.points[i].y, this.r);			
		}						
		this.graphics.endFill();


		this.hill = new PIXI.Graphics();
		this.hill.x = this.pos.x;
	    this.hill.y = this.pos.y;
		this.hill.lineStyle(this.lineThick, this.strokeClr, 1);
		this.hill.beginFill(this.clr, 1);
		
		for(var i = 0; i < this.points.length-3; i=i+3){
			//this.hill.moveTo(this.points[i].x, this.points[i].y);
			this.hill.bezierCurveTo(this.points[i+1].x, this.points[i+1].y,
									this.points[i+2].x, this.points[i+2].y,
									this.points[i+3].x, this.points[i+3].y);
		}
		this.hill.lineTo(width*1.5, height/2);
		this.hill.lineTo(0, height/2);
		this.hill.lineTo(0, 0);
		//this.hill.lineTo(0, 50);
		//this.hill.lineTo(0, 0);
		//this.hill.bezierCurveTo(30, -180, 60, -120, 80, 0);
		//this.hill.bezierCurveTo(60, 0, 130, 40, 160, 0);
		//this.hill.lineTo(120, 0);
		//this.hill.lineTo(0, 80);
		//this.hill.lineTo(0, 0);

		this.hill.endFill();
		
		stage.addChild(this.hill);
		stage.addChild(this.graphics);
	}
}