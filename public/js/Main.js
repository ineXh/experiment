var ctx;
var background_clr = "#88B4FF";//"#00";//"#AA8844";
var world;// = createWorld();
var balls = [];
var canvas;
var canvasWidth = 600;
var canvasHeight = 600;

function getPosition(px, py){
    //console.log("px: " + px);
    //console.log("py: " + py);
    x = px * ctx.canvas.width / canvasWidth;
    y = py * ctx.canvas.height / canvasHeight;     
    return {x: x, y: y};
}
function getDim(w1, h1){
    var w = w1 * ctx.canvas.width / canvasWidth;
    //console.log("w: " + w);
    var h = h1 * ctx.canvas.height / canvasHeight;
    //var r = r1 * ctx.canvas.width / canvas_width;
    return {w : w, h: h};
}

(function(){
    //renderer = new PIXI.WebGLRenderer(800, 800, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    renderer = PIXI.autoDetectRenderer(800, 800 ,{backgroundColor : 0x59b4ff, antialias: false});//LightCyan});//'Black'});GrassColor 0x4F8EDB
	var canvas1 = document.getElementById("canvas1");
	canvas1.appendChild(renderer.view);
    stage0 = new PIXI.Container();
	
    var initialize = function(load, res){
        loader = load;
        resources = res;
		
        
        renderer2 = new PIXI.CanvasRenderer(canvasWidth, canvasHeight, {transparent : true, antialias: false})
        //PIXI.autoDetectRenderer(canvasWidth, canvasHeight, canvas);
        document.body.appendChild(renderer2.view);
        stage2 = new PIXI.Container();

		canvas = renderer2.view;
        //canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
		ctx = canvas.getContext('2d');
        //ctx = canvas.getContext('webgl', { antialias: false, depth: false });
		div = document.getElementById("canvas1"); 
		div.appendChild(canvas);
        canvas.addEventListener("mousedown", mouseDownListener, false);
        canvas.addEventListener("touchstart", touchDownListener, false);



        //debugger;


        updateQueue = new UpdateQueue();

        //addListeners(renderer);

        sprite = buttonCreate(resources.bunny.texture, 0, 0, 30);            
        sprite.x = 50;
        sprite.y = 50;
        //sprite.scale.set(this.scale);
        stage0.addChild(sprite);
        sprite2 = buttonCreate(resources.bunny.texture, 0, 0, 30);            
        sprite2.x = 50;
        sprite2.y = 50;
        stage2.addChild(sprite2);
        //balls.push(new Ball());

        animate();
    } // end initialize

    loadAssets(initialize);

    var update = function(){
        updateQueue.update();
        //drawWorld(world, ctx);
                
    } // end update

    function animate() {
        update();
        requestAnimationFrame(animate);
        renderer.render(stage0);
        renderer2.render(stage2);

		/*ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.fillStyle=background_clr;
		ctx.fill();*/
        balls.forEach(function(ball){
            ball.render();
        });

    } // end animate

    function getmousePosition(touchobj){
        var x = new Number();
        var y = new Number();
        //var canvas = document.getElementById("canvas");
        var rect = canvas.getBoundingClientRect();
        if(touchobj != undefined){
            //console.log(touchobj)
            x = touchobj.clientX;
            y = touchobj.clientY;

        }else if (event.x != undefined && event.y != undefined)        {
            //console.log("not touched");
          x = event.x;
          y = event.y;
        }else{ // Firefox method to get the position        
          x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
        }
        x -= rect.left;//canvas.offsetLeft;
        y -= rect.top;//canvas.offsetTop;
        
        x = x / ctx.canvas.width * canvasWidth; // on Screen x
        y = y / ctx.canvas.height * canvasHeight;
        
        /*pos = getPosition(cen);
        shift_x = cen.x;
        shift_y = cen.y;
        mouseXshifted = x - canvasWidth/2 + shift_x;
        mouseYshifted = y - canvasHeight/2 + shift_y;*/
        
        return {x: x, y: y};//, mouseXshifted: mouseXshifted, mouseYshifted: mouseYshifted };
    } // end getmousePosition
    function mouseDownListener(event){
        //console.log("mouseDown");
        if(touched) return;
        pressed = true;
        
        mousePosition = getmousePosition(undefined);
        pmousePosition = mousePosition;            
        
        window.addEventListener("mousemove", mouseMoveListener, false);
        
        gameobjects.pressed(mousePosition, pmousePosition);
        //particles.spawn({x: mousePosition.x, y: mousePosition.y}, {x: 0, y: 0});
        
        dragging = true;
        dragHoldX = mousePosition.x;
        dragHoldY = mousePosition.y;
            
        //canvas.removeEventListener("mousedown", mouseDownListener, false);
        //window.addEventListener("mouseup", mouseUpListener, false);
        
    } // end mouseDownListener
    function touchDownListener(event){
        //console.log("touched");
        event.preventDefault();
        touched = true;
        //console.log(event);
        var touchobj = event.changedTouches[0];     
        mousePosition = getmousePosition(touchobj);
        pmousePosition = mousePosition;
        
        //window.addEventListener("touchmove", touchMoveListener, false);
        //gameobjects.pressed(mousePosition, pmousePosition);
        touching = true;
        dragHoldX = mousePosition.x;
        dragHoldY = mousePosition.y;
            
        //canvas.removeEventListener("touchstart", touchDownListener, false);
        //window.addEventListener("touchend", touchEndListener, false);
        console.log("x: " + mousePosition.x + ", y: " + mousePosition.y);
        var ball = new Ball();
        ball.init(ctx, mousePosition.x, mousePosition.y);
        balls.push(ball);
    }

    
})(); // end main

