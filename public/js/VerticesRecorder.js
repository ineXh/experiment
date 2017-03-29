function VerticesRecorder(){
	this.create();
}
VerticesRecorder.prototype = {
	create: function(){
		this.record = false;
		this.display = false;
		this.graphics = null;
		this.vertices = [];
		this.lineThick = 5;
		this.alpha = 0.8;
		this.clr = getRndColor();
		this.strokeClr = getRndColor();
	},
	add: function(x, y){
		if(!this.record) return false;
		console.log('record x ' + x + ', y ' + y)
		this.vertices.push(x);
		this.vertices.push(y);
		if(this.display) this.draw(this.container, this.display);
		return true;
	},
	export: function(){
		console.log(JSON.stringify(this.vertices));
		/*var para = document.createElement("p");
		var node = document.createTextNode("This is new.");
		para.appendChild(node);
		document.body.appendChild(para);*/
	},
	import: function(arr){
		this.clean();
		for(var i = 0; i < arr.length; i++){
			this.vertices.push(arr[i]);
		}
	},
	clean: function(){
		this.vertices.length = 0;
		if(this.graphics){
			this.graphics.clear();
			if(this.container) this.container.removeChild(this.graphics);
		} 
	}, // end clean
	draw: function(container, display){
		this.display = display;
		if(!display){
			if(!this.graphics) return;
			this.container.removeChild(this.graphics);
			this.graphics.clear();
			return;	
		} 
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
		var vertices = [];
		for(var i = 0; i < this.vertices.length; i=i+2){
			vertices.push(this.vertices[i]*width);
			vertices.push(this.vertices[i+1]*height);
		}
		vertices.push(this.vertices[0]*width);
		vertices.push(this.vertices[1]*height);

		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);		
    	this.graphics.drawPolygon(vertices);
    	this.graphics.endFill();
    	this.container = container;
    	this.container.addChild(this.graphics);
    	this.graphics.alpha = this.alpha;
	}, // end display
} // end VerticesRecorder