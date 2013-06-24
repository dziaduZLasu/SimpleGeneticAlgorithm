/**
 * this is main class of controller - it wraps aiProcessor and does some basic actions
 */
/*
 [[0,0],
[1,1],
[2,4],
[3,9],
[4,16],
[5,25],
[6,36],
[7,49],
[8,64],
[9,81],
[10,100]
]
 x^2
 
 
 
 */

function aiController(processor,runningFlag,chiSeries,iterationCount,inputDataSet){
	
	//Declaration part --------------------------------------------------------
	// pointer for current instance
	this.owner=owner;
	this.chiSeries=chiSeries;
	this.processor=processor;
	this.runnigFlag=runningFlag;
	this.buildProcessor=buildProcessor;
	this.startProcessor=startProcessor;
	this.getChiSeries=getChiSeries;
	this.process=process;
	this.iterationCount=iterationCount;
	this.inputDataSet = inputDataSet;
	
	
	// Implementation part -----------------------------------------------------
	var owner=this;
	
	function buildProcessor(){
		this.processor= new aiProcessor();
		this.processor.period = new Array();
		
		this.processor.period[0]=this.inputDataSet[0][0];
		this.processor.period[1]=this.inputDataSet[this.inputDataSet.length-1][0];
		
		
		this.processor.getReffrencePiontsFromInput(this.inputDataSet);
		//this.processor.buildInitialPopulation();
	}

	function startProcessor(){
		//this.buildProcessor();
		return this.process();
	}
	
	function process(){
		var lastResult={};
		for(var k=0;k<this.iterationCount;k++){
			var dS=this.processor.generateNthPopulation();
			var chiPoint={
				"x":k,
				"y":dS.fit
			}
			
			
			this.chiSeries.push(chiPoint);
			lastResult=dS;
			
		}
		return lastResult;
		
	}
	
	
	
	function getChiSeries(){
		return this.chiSeries;
	}
		
	// "constructor"
	function __init(){
		//owner.buildProcessor();
		owner.chiSeries=new Array();
		owner.iterationCount=100;
	}
	__init();
	
	
}