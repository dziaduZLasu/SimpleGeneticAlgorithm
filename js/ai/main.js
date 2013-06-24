
window.onload = function() {

    //	var controller = new aiController();
    //	controller.startProcessor();

    document.getElementById("startButton").onclick = function(e) {
	try{
	    var reffrenceData = $.parseJSON($("#dataSet").val());
	}catch(e){
	    alert("Input dataSet empty or invalid");
	    
	}
	
	
        document.getElementById("fitdiv").innerHTML = "";
        document.getElementById("resultDiv").innerHTML = "";

	var controller = new aiController();
	controller.inputDataSet = reffrenceData;
        
        controller.buildProcessor();
        var myData = new Array();
        controller.processor.mutationPropability = document.getElementById("mutationPropability").value;
        controller.processor.crossPropability = document.getElementById("crossPropability").value;
        controller.processor.populationLength = document.getElementById("populationLength").value;
        controller.iterationCount = document.getElementById("iterationsCount").value;
	
        controller.processor.buildInitialPopulation();
        var bestLastResult = controller.startProcessor();
        //controller.processor.calculateFitFactor();

        //draw best in population chart
        var myData = new Array();
        var chiSet = controller.getChiSeries()
        for (var x = 0; x < controller.iterationCount; x++) {

            myData.push([chiSet[x].x, chiSet[x].y]);

        }
        var bestInPopulationSeries = new Array();
        bestInPopulationSeries[0] = myData;

        $.jqplot('fitdiv', bestInPopulationSeries, {
            title: "Best chromosomes for each generation",
            axes: {
                xaxis: {label: "Generation"},
                yaxis: {label: "Fit function Result"

                }
            }
        });

        //draw effect chart
        var resultPoints = controller.processor.getResultFunctionByChromosome(bestLastResult.chromosome);
        
	var reffPoints = new Array();
	var l=0;
	var resP=new Array();
	//console.log(controller.processor.refferencePoints);
	for (x in controller.processor.refferencePoints){
	    
	    reffPoints[controller.processor.refferencePoints[x][0]]=(controller.processor.refferencePoints[x][1]);
	}
	var str="";
	for (x in bestLastResult.chromosome ){
	    str+=" "+x+":"+Math.round(bestLastResult.chromosome[x]);
	}
        $.jqplot('resultDiv', [resultPoints, controller.processor.refferencePoints], {
            title: "Last generation best chromosome result",
            axes: {
                xaxis: {label: "Polinomial level:"+Math.floor(bestLastResult.chromosome[8])+" Fit factor: "+bestLastResult.fit+" Best chromosome:"+str},
                yaxis: {label: "Y"}
            },
            series: [
                {show: true, label: "Result data", showLabel: true},
                {show: true, label: "Refference points", showLabel: true}
            ],
            legend: {show: true}
        });

    }
}