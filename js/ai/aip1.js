/**
 * main class of our generic algorithm - used for calculations
 */
function aiProcessor(crossPropability,mutationPropability,refferencePoints,refferenceFunction,period,setRefferenceFuntion,population,populationLength,runFlag,bestInPopulation,worseInPopulation){

	// class declaration part - here we declare all properties and methods
	//properties
	this.crossPropability=crossPropability;
	this.mutationPropability = mutationPropability;
	this.refferencePoints=refferencePoints;
	this.refferenceFunction=refferenceFunction;
	// range where the refference function is defined - than bigger than better results we get
	this.period=period;
	this.population=population;
	this.populationLength=populationLength;
	this.runFlag=runFlag;
	this.bestInPopulation=bestInPopulation;
	this.worseInPopulation=worseInPopulation;
	
	
	
	// pointer to current instance;
	this.owner=owner;
	
	//methods
	this.calculateFitFactor=calculateFitFactor;
	this.buildInitialPopulation=buildInitialPopulation;
	this.setRefferenceFunction=setRefferenceFunction;
	this.generateRefferencePoints=generateRefferencePoints;
	this.setPeriod=setPeriod;
	this.rouletteGenerationRandomizeParents=rouletteGenerationRandomizeParents;
	this.generateNthPopulation=generateNthPopulation;
	this.getResultForChromosome=getResultForChromosome;
	this.getResultFunctionByChromosome=getResultFunctionByChromosome;
	this.getReffrencePiontsFromInput=getReffrencePiontsFromInput;
	this.calculatePolynomialInPoint=calculatePolynomialInPoint;
	this.__init=__init;

	//	Implementation Part -------------------------------------------------------

	var owner = this;
	//class "constructor"
	var __init = function(){
		
		owner.refferenceFunction=function(x){
			return 4*Math.pow(x,2)-3*x+8;
		}
		owner.population = new Array();
		owner.bestInPopulation={
			"fit":0,
			"chromosome":[null,null,null]
		};
		owner.worseInPopulation=1;
		
		owner.populationLength=600; //this is zero indexed - so we have 100 chromosomes per population if set to 99
		owner.mutationPropability=0.01;
		owner.crossPropability=0.5;
		owner.generateRefferencePoints();
		
		owner.runFlag=false;
		
	}
	
	function buildInitialPopulation(){
		// let's say that coeficient is not bigger than 10 - a little cheat - this should be calculated from refference points
		var maxAbs=10;
		
		for (k=0;k<this.populationLength;k++){
			var chromosome= new Array();
			for (i=0;i<9;i++){
				// let's randomize the sing of coeficient 
				var sign = Math.pow(-1,Math.round(Math.random()));
				var coeficient=sign*maxAbs*Math.random();
				chromosome.push(coeficient);
			}
			this.population.push(chromosome);
		}
		
		
	}
	
	
	function getReffrencePiontsFromInput(inputRefference){
	    this.refferencePoints=inputRefference;
	}
	

	function setRefferenceFunction(f){
		this.refferenceFunction=f;
	}
	
	function generateRefferencePoints(){
		return true;
		var periodLength=this.period.length;
		this.refferencePoints = new Array();
		
		for (var i=0;i<periodLength;i++){
			
			var tmp = new Array();
			tmp[0]=i;
			tmp[1]=this.refferenceFunction(i);
			this.refferencePoints[i]=tmp;
		}
		
		
	}
	
	function setPeriod(period){
		this.period=period;
	}
	
	/**
	 * this function calculates the fit factor
	 * fit factor says how good is choromosome, it's based on chi anali
	 */
	function calculateFitFactor(chromosome,getBest){
		
		var chi=0;
		var chiTmp=0;
		var refTotal=0;
		for(var x in this.refferencePoints){
			var k=this.getResultForChromosome(chromosome, this.refferencePoints[x][0]);
			var ref=this.refferencePoints[x][1];
			//
			//chiTmp=x*x*Math.pow(ref-k,2);
			chiTmp=Math.abs(ref-k,2)*Math.abs(ref-k,2);
			chi+=chiTmp;
			refTotal+=ref;
			
			
			
			
		}
		
		//chi = Math.sqrt(chi);
		//chi=chi/refTotal;
		var fitFactor=(0.1+10000000000000000*Math.exp(-chi*0.000000000000001))/10000000000000000;
		
		if (this.bestInPopulation.fit<fitFactor && typeof getBest!='undefined'){
			this.bestInPopulation={
				"fit":fitFactor,
				"chromosome":chromosome
			}
			
			
		}	
		//,this.getResultForChromosome(chromosome, x));
		//console.log(fitFactor);
		return fitFactor;
	}
	/**
	 * gets results of searched equation for particular chromosome in point x
	 * we use this function to calculate chromosomes fit factor
	 */
	function getResultForChromosome(chromosome,x){
	    return this.calculatePolynomialInPoint(9,chromosome,x);
		//return (chromosome[0]*Math.pow(x,2))+(chromosome[1]*x)+chromosome[2];
	}
	
	/**
	 * here we use the roulette method to generate preeliminary parents population
	 */
	function rouletteGenerationRandomizeParents(){
		//1. we build roulette wheel
		
		var rouletteSlot = new Array();
		var slotStart=0;
		var preeliminatedParents = new Array();
		// randomNormalizer is to normalize the roulette pointer indication
		var randomNormalizer = 0;
		var slotSum=0;
		for(var x=0; x<this.populationLength;x++){
		    
			var fitFactor=this.calculateFitFactor(this.population[x],true);
			
			var slot={
				"index":x,
				"slotStart":slotStart,
				"slotEnd":slotStart+fitFactor
			}
			
				
			slotSum+=fitFactor;
			slotStart=slot.slotEnd;
			rouletteSlot.push(slot);
			
		}
		
		// after iterating the loop we have last slot, which slot.slotEnd points to 100%
		randomNormalizer=slotSum;
		
		//2.we randomize parents population
		//console.log(randomNormalizer);
		for(x=0; x<this.populationLength;x++){
		
			var roulettePointer=randomNormalizer*Math.random();
			
			for(var k in rouletteSlot){
				
				if (rouletteSlot[k].slotStart<=roulettePointer && rouletteSlot[k].slotEnd>roulettePointer ){
					preeliminatedParents.push(this.population[rouletteSlot[k].index]);
				
					break;
				}
					
			}
		}
		
		return preeliminatedParents;
		
	}
	
	function generateNthPopulation(){
		
		var preeliminaryPopulation=this.rouletteGenerationRandomizeParents();
		
		var populationPool=preeliminaryPopulation;
		var pairs = new Array();
		var newPopulation=new Array();
		
		
		//1. we make pairs of parents
		//2. we mix genes of each pair producing two brand new children for each pair
		//3. we mutate children 
			
		//make pairs
		
		do{
			var pair= new Array();
			for(var i=0;i<=1;i++){
				var index = Math.floor(preeliminaryPopulation.length*Math.random());
				if (typeof preeliminaryPopulation[index] =='undefined'){
					break;
					
				}
					
				pair[i]=preeliminaryPopulation[index];
				preeliminaryPopulation.splice(index,1);
			}
			
			pairs.push(pair);
			
		}while(preeliminaryPopulation.length>1);
		
		while(pairs.length<0.5*this.population.length){
			for( i=0;i<=1;i++){
				index = Math.floor(populationPool.length*Math.random());
				pair[i] = populationPool[index];
			}
			
			pairs.push(pair);
		
		}
		//mix genes
		
		for (x in pairs){
			var newChromosome1= new Array();
			var newChromosome2= new Array();
			// if shall not be crossed
			if (Math.random()>=this.crossPropability){
				newChromosome1=pairs[x][0];
				newChromosome2=pairs[x][1];
			}else{
				
				
				// let the better specimen genes have better propability to reproduce
				var p1=this.calculateFitFactor(pairs[x][0]);
				var p2=this.calculateFitFactor(pairs[x][1]);
				var pFactor = p1+p2;
			
				for (var c=0;c<9;c++ ){
				
					// first child
					var pointer=pFactor*Math.random();
					if (pointer>0 && pointer<p1){
					
						newChromosome1[c]=pairs[x][0][c];
					}else{
						newChromosome1[c]=pairs[x][1][c];
					}
					// second child
					pointer=pFactor*Math.random();
					if (pointer>0 && pointer<p1){
						newChromosome2[c]=pairs[x][0][c];
					}else{
						newChromosome2[c]=pairs[x][1][c];
					}
				
				
				
				}
			}
			for(c=0;c<9;c++){
			
				if (this.mutationPropability>Math.random()){
					newChromosome1[c]=10*Math.random()*Math.pow(-1,Math.round(Math.random()));
				}
				if (this.mutationPropability>Math.random()){
					newChromosome2[c]=10*Math.random()*Math.pow(-1,Math.round(Math.random()));
				}
			}
			if (this.mutationPropability>Math.random()){
				newChromosome1[9]+=Math.round(Math.random())*Math.pow(-1,Math.round(Math.random()));
				newChromosome2[9]+=Math.round(Math.random())*Math.pow(-1,Math.round(Math.random()));
			
			}
			
			
			newPopulation.push(newChromosome1);
			newPopulation.push(newChromosome2);
			
		}
		
		
		this.population = newPopulation;
		var ret = this.bestInPopulation;
		this.bestInPopulation={
			"fit":0,
			"chromosome":[null,null,null]
		}
		// replace population
		return ret;
		
	}
	
	function getResultFunctionByChromosome(chromosome){
		var ret = new Array();
		//console.log(this.period[0],this.period[1]);
		for (var x=this.period[0];x<=this.period[1];x++){
		    //console.log(x);
		    ret.push([x,this.calculatePolynomialInPoint(9,chromosome,x)]);
			//ret[x]=chromosome[0]*Math.pow(x,2)+chromosome[1]*x+chromosome[2];
		}
		
		return ret;
	}
	
	
	function calculatePolynomialInPoint(level,data,x){
	    var ret=0;
	    //console.log(data);
	    for (var i=0;i<level;i++){
		ret+=data[i]*Math.pow(x,i);
	    }
	    
	    return ret;
	    
	}
	
	//here we call a constructor
	__init();
}
