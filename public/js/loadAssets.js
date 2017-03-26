var loadAssets = function(cb){
	PIXI.loader
	    .add('assets/misc.json')
		.add('assets/carsprites.json')
		.add('arrow', 'assets/arrow.png')
		.add('bunny', 'assets/bunny.png')
		.add('circle', 'assets/circle.png')
		.add('line', 'assets/line.png')
		.add('square', 'assets/square.png')
		
		.add('carBody', 'assets/car_body.png')
		.add('wheelBack0', 'assets/wheel_back_0.png')
		.add('wheelBack1', 'assets/wheel_back_1.png')
		.add('wheelBack2', 'assets/wheel_back_2.png')
		.add('wheelBack3', 'assets/wheel_back_3.png')
		.add('wheelBack4', 'assets/wheel_back_4.png')
		.add('wheelBack5', 'assets/wheel_back_5.png')

		.add('wheelFront0', 'assets/wheel_front_0.png')
		.add('wheelFront1', 'assets/wheel_front_1.png')
		.add('wheelFront2', 'assets/wheel_front_2.png')
		.add('wheelFront3', 'assets/wheel_front_3.png')
		.add('wheelFront4', 'assets/wheel_front_4.png')
		.add('wheelFront5', 'assets/wheel_front_5.png')

		.load(cb.bind(this));

} // end loadAssets

var loadTextures = function(){
	arrowLineTexture = PIXI.Texture.fromFrame("arrow_line.png");
    arrowHeadTexture = PIXI.Texture.fromFrame("arrow_head.png");

    carBodyTexture = PIXI.Texture.fromFrame("carBody");
    wheelBackTexture = [];
    for(var i = 0; i <= 5; i++){
        wheelBackTexture.push(PIXI.Texture.fromFrame('wheelBack' + i));
    }
    wheelFrontTexture = [];
    for(var i = 0; i <= 5; i++){
        wheelFrontTexture.push(PIXI.Texture.fromFrame('wheelFront' + i));
    }
} // end loadTextures