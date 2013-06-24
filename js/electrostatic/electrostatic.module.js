function electrostatic(){
	
	/**
	 * 
	 * @type module_initModule
	 */
	this.initModule = module_initModule;
	this.drawPotentialMap = module_drawPotentialMap;
	this.calculateChargeAtPoint = module_calculateChargeAtPoint;
	this.drawFieldStrengthMap = module_drawFieldStrengthMap;
	this.chargeRadius = 7;
}

/**
 * 
 * @param {string} canvasId
 * @returns {undefined}
 */
function module_initModule(canvasId){
	this.view = new view();
	this.view.initGraphics(canvasId);
	this.physics = new physics();
	this.controller  =new controller();
	
}


function module_drawPotentialMap(){}
function module_calculateChargeAtPoint(){}
function module_drawFieldStrengthMap(){}

