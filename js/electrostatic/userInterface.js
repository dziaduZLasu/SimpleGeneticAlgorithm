function userInterface() {
	this.buildCharge = userInterface_buildChargeOnForm;
	this.init = userInterface_init;
	this.clickView = userInterface_clickView;
	this.currentMode = "chargeManipulator";
	this.selfRefferer = userInterface_selfRefferer;
	this.mapFieldStrengthFromCollection = userInterface_mapFieldStrengthFromCollection;
	this.mapPotentialFromCollection = userInterface_mapPotentialFromCollection;
	this.currentForceStrength=userInterface_currentForceStrength;
	this.snapshot=userInterface_snapshot;
	/*this.getMousePosition = userInterface_getMousePosition;
	 this.getFormData = userInterface_getFormData;
	 this.setCurrentMode = userInterface_setCurrentMode;
	 this.dataStorage = userInterface_dataStorage;
	 this.updateStorage = userInterface_updateStorage;*/
}



function userInterface_buildChargeOnForm(e) {

}

function userInterface_selfRefferer() {
	return this;
}


function openChargeForm() {
}


function userInterface_init(canvasPointer) {
	this.module = new electrostatic();
	this.module.initModule("canvas");
	var selfPointer = this;
	var testCharge = this.module.controller.initCharge();
	testCharge.x = 1;
	testCharge.y = 1;
	testCharge.r = 0;
	testCharge.charge = 1;
	this.module.controller.addChargeToCollection(testCharge);
	

	document.getElementById(this.module.view.selectorId).addEventListener('click',
			function(e, p) {
				selfPointer.clickView(e, selfPointer);
			}
	, 1);

	document.getElementById("mapForce").addEventListener('click',
			function(e, p) {
				selfPointer.mapFieldStrengthFromCollection();

			}, 1);
	document.getElementById("mapPotential").addEventListener('click',
			function(e, p) {
				selfPointer.mapPotentialFromCollection();

			}, 1);
			
	document.getElementById("canvas").addEventListener('mousemove',
			function(e, p) {
				selfPointer.currentForceStrength(e);

			}, 1);
			
	document.getElementById("download").addEventListener('click',
			function(e, p) {
				e.preventDefault();
				selfPointer.snapshot(e);

			}, 1);
			
			
			


}

function userInterface_clickView(e, interfaceInstance) {

	if (interfaceInstance.currentMode != "chargeManipulator")
		return;

	var charge = interfaceInstance.module.controller.initCharge();
	charge.x = e.offsetX;
	charge.y = e.offsetY;
	charge.charge = document.getElementById("charge").value*Math.pow(10,document.getElementById('exp').value);
	charge.r = interfaceInstance.module.chargeRadius;
	interfaceInstance.module.controller.addChargeToCollection(charge);
	interfaceInstance.module.view.putCharge(charge);
	/*
	 * @TODO: add condition if charge should be removed
	 */





}

function userInterface_mapFieldStrengthFromCollection() {

	var imageData = this.module.view.context.getImageData(0, 0, this.module.view.htmlCanvas.width, this.module.view.htmlCanvas.height);
	var i = 0;
	for (var y = 0; y < this.module.view.htmlCanvas.height; y++) {
		for (var x = 0; x < this.module.view.htmlCanvas.width; x++) {



			var fieldStrength = this.module.physics.getFieldStrengthFromCollection(0, this.module.controller.collection);
			
			var color = this.module.view.translateToRgb(Math.sqrt(Vector.scalar(fieldStrength,fieldStrength)));
			
			imageData.data[i + 0] = parseInt(color[0]);
			imageData.data[i + 1] = parseInt(color[1]);
			imageData.data[i + 2] = parseInt(color[2]);
			imageData.data[i + 3] = 255;
			i += 4;
			this.module.controller.collection[0].x = x;
			this.module.controller.collection[0].y = y;
		}
	}
	this.module.view.context.putImageData(imageData, 0, 0);
}

function userInterface_mapPotentialFromCollection() {
	
	var imageData = this.module.view.context.getImageData(0, 0, this.module.view.htmlCanvas.width, this.module.view.htmlCanvas.height);
	var i = 0;
	for (var y = 0; y < this.module.view.htmlCanvas.height; y++) {
		for (var x = 0; x < this.module.view.htmlCanvas.width; x++) {
			
		

			var fieldPotential = this.module.physics.getPotentialFromCollection(0, this.module.controller.collection);
			var color = this.module.view.translateToRgb(fieldPotential[0] );
			
			imageData.data[i + 0] = parseInt(color[0]);
			imageData.data[i + 1] = parseInt(color[1]);
			imageData.data[i + 2] = parseInt(color[2]);
			imageData.data[i + 3] = 255;
			i += 4;
			this.module.controller.collection[0].x = x;
			this.module.controller.collection[0].y = y;
		}
	}
	this.module.view.context.putImageData(imageData, 0, 0);
}



function userInterface_currentForceStrength(e){
	//console.log(this.module.controller.collection.length);
	
	if (this.module.controller.collection.length==0)
		return true;
	
	this.module.controller.collection[0].x=e.offsetX;
	this.module.controller.collection[0].y=e.offsetY;
	var fieldStrength = this.module.physics.getFieldStrengthFromCollection(0, this.module.controller.collection);
	this.module.view.drawFieldVector(fieldStrength,[e.offsetX,e.offsetY]);
	
	$("#forceStrength").html(parseInt(Math.sqrt(Vector.scalar(fieldStrength,fieldStrength))));
}


function userInterface_snapshot(e){
	e.preventDefault();
	this.module.view.snapshot();
}