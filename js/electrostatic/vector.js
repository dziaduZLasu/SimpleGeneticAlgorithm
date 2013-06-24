(function(self){
	self.Vector = {
		/**
		 * Gets sum
		 * @param {array} v1
		 * @param {array} v2
		 * @returns {array}
		 */
		add: function(v1,v2){
			if (v1.length!=v2.length){
				throw new Exception("You provided invalid vectors");
			}
			var vOut=[];
			for (x in v1){
				vOut[x]=v1[x]+v2[x];
			}
			return vOut;
		},
		/**
		 * Gets difference
		 * @param {array} v1
		 * @param {array} v2
		 * @returns {array}
		 */		
		diff:function(v1,v2){
			if (v1.length!=v2.length){
				throw new Exception("You provided invalid vectors");
			}
			var vOut=[];
			for (x in v1){
				vOut[x]=v1[x]-v2[x];
			}
			return vOut;
		},
		/**
		 * Gets Scalar product
		 * @param {array} v1
		 * @param {array} v2
		 */		
		scalar:function(v1,v2){
			if (v1.length!=v2.length){
				throw new Exception("You provided invalid vectors");
			}
			var vOut=0;
			for (var x in v1){
				
				vOut+=v1[x]*v2[x];
			}
			return vOut;
		
		},
			
		
	}
	
})(this);
