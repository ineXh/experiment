(function(){
    Renderer = new PIXI.WebGLRenderer(800, 200, {backgroundColor : 0x59b4ff, transparent : false, antialias: false});
    $( "#canvas" )[0].appendChild(Renderer.view);
    Stage0 = new PIXI.Container();

    var initialize = function(load, res){
        loader = load;
        resources = res;
        
        
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
    } // end animate

    
})(); // end main

