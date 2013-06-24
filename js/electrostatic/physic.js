


(function(global) {
	"use strict";
	global.physic = {
		/**
		 * Calculates force beetween two charges
		 * @param {object} testCharge
		 * @param {object} charge
		 * @returns {Array}
		 */
		getForceFromCharge: function(testCharge, charge) {
			var rT = [
				testCharge.x,
				testCharge.y,
			];
			var rC = [
				charge.x,
				charge.y,
			];
			var vR = Vector.diff(rT, rC);
			var r = Math.sqrt(Vector.scalar(vR, vR));
			
			var forceFactor = physic.electrostaticFactor * ((testCharge.charge * charge.charge) / Math.pow(r, 3))
			console.log(forceFactor,testCharge,charge);
			return [vR[0] * forceFactor, vR[1] * forceFactor];
		},
		/**
		 * 
		 * @param {type} point
		 * @param {type} charge
		 * @returns {r|@exp;charge@pro;charge@this.electrostaticFactor}
		 */
		getPotentialFromCharge: function(point, charge) {
			var r = this.getDistance(point, charge);

			return this.electrostaticFactor * (charge.charge / r);
		},
		/**
		 * 
		 * @param {type} testCharge
		 * @param {type} charge
		 * @returns {Array}
		 */
		getFieldStrengthFromCharge: function(testCharge, charge) {
			var forceVector = this.getForceFromCharge(testCharge, charge);
			return  [forceVector[0] / testCharge.charge, forceVector[1] / testCharge.charge];

		}
		,
		/**
		 * 
		 * @param {type} chargeIndex
		 * @param {type} collection
		 * @returns {unresolved}
		 */
		physics_getForceFromCollection: function(chargeIndex, collection) {
			return this.acumulator(chargeIndex, collection, physics.getForceFromCharge);
		},
		/**
		 * 
		 * @param {type} chargeIndex
		 * @param {type} collection
		 * @returns {float}
		 */
		getPotentialFromCollection: function(chargeIndex, collection) {
			return this.acumulator(chargeIndex, collection, this.getPotentialFromCharge);

		},
		/**
		 * 
		 * @param {type} chargeIndex
		 * @param {type} collection
		 * @returns {unresolved}
		 */
		getFieldStrengthFromCollection: function(chargeIndex, collection) {
			return this.acumulator(chargeIndex, collection, this.getFieldStrengthFromCharge);
		},
		/**
		 * 
		 * @param {type} point
		 * @param {type} collection
		 * @returns {Number|x}
		 */
		getCollision: function(point, collection) {
			for (x in collection) {
				if (this.getDistance(point, collection[x]) < collection[x].r)
					return x;
			}
			return -1;
		},
		/**
		 * 
		 * @param {type} particle
		 * @param {type} collection
		 * @param {type} dt
		 * @returns {particle}
		 */	
		calculateParticleVelocity: function(particle, collection, dt) {
			if (particle.isNucleus)
				return particle;
			var forceVector = this.acumulator(particle.index, collection, this.getForceFromCharge);

			particle.x = particle.x0 + (forceVector[0] / mE) * Math.pow(dt, 2) * Math.pow(eC, 2) * 0.5 + particle.ovx * dt;
			particle.y = particle.y0 + (forceVector[0] / mE) * Math.pow(dt, 2) * Math.pow(eC, 2) * 0.5 + particle.ovy * dt;
			particle.vx = (particle.x - particle.x0) / dt;
			particle.vy = (particle.x - particle.x0) / dt;

			particle.x0 = particle.x;
			particle.y0 = particle.y;

			particle.ovx = particle.vx;
			particle.ovy = particle.vy;

			return particle;

		},
				
		//physical constants and helper variables
		
		//helper functions
		getDistance: function(pointA, pointB) {
			return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
		},
		acumulator: function(index, collection, functionName) {
			var total = new Array(0, 0);
			for (var x in collection) {
				if (x == index)
					continue;
				var result = functionName(collection[index], collection[x]);

				if (typeof result == 'object') {
					for (var k = 0; k < result.length; k++) {
						total[k] += result[k];
					}
				} else {
					total[0] += result;
				}
			}
			return total;

		},
		__init:function(){
			this.e0= (1 / (36 * Math.PI)) * Math.pow(10, -9);
		this.eR= 1;
		this.electrostaticFactor= 1 / (4 * Math.PI * this.e0 * this.eR);
		this.chargeFactor= 1;
		this.mE= 9.1 * Math.pow(10, -31);
		this.eC= 1.6 * Math.pow(10, -19);
			
		}
	};
	global.physic.__init();
})
		(this);


