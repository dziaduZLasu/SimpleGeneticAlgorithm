function controller() {
	this.addChargeToCollection = controller_addChargeToCollection;
	this.removeChargeFromCollection = controller_removeChargeFromCollection;
	this.initCharge = controller_initCharge;
	this.collection = Array();
	
}


function controller_addChargeToCollection(charge) {
	var index =this.collection.push(charge);
	this.collection[index-1].index=index-1;
	return index;
}

function controller_removeChargeFromCollection(index) {
	return this.collection.splice(index, 1);

}

function controller_initCharge() {
	var charge = {
		"x": 0,
		"y": 0,
		"charge": 0,
		"force": 0,
		"r": 0,
		"index": 0,
		"vx": 0,
		"vy": 0,
		"ovx": 0,
		"ovy": 0,
		"isNucleus":false
	}
	return charge;
}




