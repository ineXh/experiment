var ctx;
var background_clr = "#88B4FF";//"#00";//"#AA8844";
var world;// = createWorld();
var mouseJointGroundBody;
var ground;

var shapes = [];
var canvas;
var width = 600;
var height = 600;
var scope_width = width*0.15;
var scope_height = height*0.25;
var center = null;
var showStats = false;
var car1, car2;

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

        const container = document.createElement("div");
        document.body.appendChild(container);        
        stats = new Stats();
        container.appendChild(stats.domElement);
        stats.domElement.style.position = "absolute";
		
        addListeners(renderer);
        
        updateQueue = new UpdateQueue();

        sprite = buttonCreate(resources.bunny.texture, 0, 0, 30);
        //sprite = buttonCreate(PIXI.Texture.fromFrame("cloud.png"), 0, 0, 30);
        
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
        stats.update();
        updateQueue.update();
         step();
         shapes.forEach(function(s){
            s.update();
         });
         car1.update();
        if(center != undefined && center != null){
            if(center.x > (-stage.x + width/2 + scope_width)){
                stage.x = -(center.x - width/2 - scope_width);
            }
            if(center.x < (-stage.x + width/2 - scope_width)){
                stage.x = -(center.x - width/2 + scope_width);
            }

            if(center.y > (-stage.y + height*0.45/2 + scope_height)){
                stage.y = -(center.y -height*0.45/2 - scope_height);
            }

            if(center.y < (-stage.y + height/2 - scope_height)){
                stage.y = -(center.y - height/2 + scope_height)
            }
        }
                
    } // end update

    function animate() {
        update();
        requestAnimationFrame(animate);
        renderer.render(stage);		
    } // end animate
    
})(); // end main

