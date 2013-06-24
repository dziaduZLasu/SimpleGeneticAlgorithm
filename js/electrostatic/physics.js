function physics(){
	
	//single charge functions
	this.getForceFromCharge = physics_getForceFromCharge;
	this.getPotentialFromCharge = physics_getPotentialFromCharge;
	this.getFieldStrengthFromCharge=physics_getFieldStrengthFromCharge;
	
	//refference frame functions
	
	this.getForceFromCollection = physics_getForceFromCollection;
	this.getPotentialFromCollection = physics_getPotentialFromCollection;
	this.getFieldStrengthFromCollection = physics_getFieldStrengthFromCollection;
	this.getCollision = physics_getCollision;
	this.calculateParticleVelocity = physics_calculateParticleVelocity;
	
	// helper functions
	this.getDistance = physics_getDistance;
	
	this.e0=( 1/( 36 * Math.PI ) ) * Math.pow(10,-9);
	this.eR=1;
	this.electrostaticFactor = physics_electrostaticFactor;
	this.acumulator = physics_acumulator;
	this.chargeFactor=physics_chargeFactor;
}
var e0=( 1/( 36 * Math.PI ) ) * Math.pow(10,-9);
var eR=1;
var physics_chargeFactor=1;
var physics_electrostaticFactor = 1/(4 * Math.PI * this.e0 * this.eR);

function physics_acumulator(index,collection,functionName){
	var total = new Array(0,0);
	
	
	for (var x in collection){
		if (x==index) 
			continue;
		
		var result = functionName(collection[index],collection[x]);
		
		if (typeof result=='object'){
			
			for(var k=0;k<result.length;k++){
				
				
				total[k]+=result[k];
				
			}
		}else{
			total[0]+=result;
		}
		
	}
	
	return total;
	
}

function physics_getDistance(pointA,pointB){
	
	return Math.sqrt(Math.pow(pointA.x-pointB.x,2)+Math.pow(pointA.y-pointB.y,2));
}

function physics_getForceFromCharge(testCharge,charge){
	
	//var r= physics_getDistance(testCharge,charge);
	var rT=[
		testCharge.x,
		testCharge.y,
		
	];
	var rC=[
		charge.x,
		charge.y,
	];
	var vR=Vector.diff(rT,rC);
	var r=Math.sqrt(Vector.scalar(vR,vR));
	var forceFactor=physics_electrostaticFactor * ( (testCharge.charge * charge.charge)  / Math.pow(r,3) )
	
	return [vR[0]*forceFactor,vR[1]*forceFactor];
	
}

function physics_getPotentialFromCharge(point,charge){
	var r= physics_getDistance(point,charge);
	
	return physics_electrostaticFactor * ( charge.charge / r );
}

function physics_getFieldStrengthFromCharge(testCharge,charge){
	var forceVector=physics_getForceFromCharge(testCharge,charge);
	
	return  [forceVector[0]/testCharge.charge,forceVector[1]/testCharge.charge];
	
}

function physics_getForceFromCollection(chargeIndex,collection){
	return this.acumulator(chargeIndex,collection,physics.getForceFromCharge);
}

function physics_getPotentialFromCollection(chargeIndex,collection){
	return this.acumulator(chargeIndex,collection,this.getPotentialFromCharge);
	
}

function physics_getFieldStrengthFromCollection(chargeIndex,collection){
	return this.acumulator(chargeIndex,collection,this.getFieldStrengthFromCharge);
}

function physics_getCollision(point,collection){
	for (x in collection){
		if (this.getDistance(point,collection[x])<collection[x].r)
			return x;
	}
	return -1;
}

function physics_calculateParticleVelocity(particle,collection){
	
	
}



