var ctx;
var background_clr = "#88B4FF";//"#00";//"#AA8844";
(function(){
    Renderer = new PIXI.WebGLRenderer(800, 800, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
	var canvas1 = document.getElementById("canvas1");
	canvas1.appendChild(Renderer.view);
    Stage0 = new PIXI.Container();
	
	
	
    var initialize = function(load, res){
        loader = load;
        resources = res;
		
		var canvas = document.createElement('canvas');		
		ctx = canvas.getContext('2d');
		div = document.getElementById("canvas1"); 
		div.appendChild(canvas);
                
        updateQueue = new UpdateQueue();        

        animate();
    } // end initialize

    loadAssets(initialize);

    var update = function(){
        updateQueue.update();
    }

    function animate() {
        update();
        requestAnimationFrame(animate);
        Renderer.render(Stage0);  

		ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.fillStyle=background_clr;
		ctx.fill();		
    } // end animate

    
})(); // end main

