var ctx;
var background_clr = "#88B4FF";//"#00";//"#AA8844";
var world;// = createWorld();
var mouseJointGroundBody;
var ground;

var shapes = [];
var canvas;
var width = 600;
var height = 600;
var showStats = false;

var spriteTouched = false;
graphics = new PIXI.Graphics();

(function(){
    //renderer = new PIXI.WebGLRenderer(800, 800, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    renderer = PIXI.autoDetectRenderer(width, height ,{backgroundColor : 0x59b4ff, antialias: false});//LightCyan});//'Black'});GrassColor 0x4F8EDB
	var canvas1 = document.getElementById("canvas1");
	canvas1.appendChild(renderer.view);
    stage = new PIXI.Container();
	
    var initialize = function(load, res){
        loader = load;
        resources = res;
		
        addListeners(renderer);
        
        updateQueue = new UpdateQueue();

        sprite = buttonCreate(resources.bunny.texture, 0, 0, 30);            
        sprite.x = 50;
        sprite.y = 50;
        //sprite.scale.set(this.scale);
        stage.addChild(sprite);
        stage.addChild(graphics);

        //spawnRect(stage, 50,50, width/2, 50);

        createWorld();

        animate();
    } // end initialize

    loadAssets(initialize);

    var update = function(){
        updateQueue.update();
         step();
         shapes.forEach(function(s){
            s.update();
         });
        //drawWorld(world, ctx);
                
    } // end update

    function animate() {
        update();
        requestAnimationFrame(animate);
        renderer.render(stage);		
    } // end animate
    
})(); // end main

