function bohr(){
	this.initModule = bohr_initModule();
	this.main = bohr_main;
	this.getNewPositions = bohr_getNewPositions;
	this.addProton = bohr_addProton;
	this.removeProton = bohr_removeProton;
	this.initNucleus	= bohr_initNucleus;
	
	
}

function module_initModule(canvasId){
	this.view = new view();
	this.view.initGraphics(canvasId);
	this.physics = new physics();
	this.controller  =new controller();
	this.initNucleus();
	
	
}


function bohr_initNucleus(){
	var nucleus = {
		"x":Math.round(this.view.htmlCanvas.width/2),
		"y":Math.round(this.view.htmlCanvas.width/2),
		"charge":5,
		"vx":0,
		"vy":0,
		"ovx":0,
		"ovy":0,
		"isNucleus":true,
		"index":0,
	}
	if (typeof this.controller.collection[0].index =='undefined'){
		this.controller.collection.addCharge(nucleus);
	}else{
		this.controller.collection[0]=nucleus;
	}
}

function bohr_addProton(){
	return this.controller.collection[0].charge++;
	
}

function bohr_removeProton(){
	if (this.controller.collection[0].charge>2){
		return this.controller.collection[0].charge--;
	}
	return false;
}




