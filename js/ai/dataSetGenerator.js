$(function() {


    function plotFromDataSet() {
	var dataSet = $.parseJSON($("#dataSet").val());
	console.log(dataSet);
	$("#datasetPlotter").empty();
	$.jqplot('datasetPlotter', [dataSet], {
	    title: "Wykres dla zadanej funkcji",
	    axes: {
		xaxis: {label: "X"},
		yaxis: {label: "Y"}
	    },
	    series: [
		{show: true, label: "punkty pomiarowe", showLabel: false}
	    ],
	    legend: {show: true}
	});



    }

    function runGenerator() {
	if (typeof script == "object")
	    document.removeNode(script);
	else {
	    var fn = document.createElement('script');
	    fn.appendChild(document.createTextNode('var refference = function(x){ return ' + $("#referenceFunction").val() + ';}'));
	    (document.body || document.head || document.documentElement).appendChild(fn);
	}





	var rangeFrom = $("#rangeFrom").val();
	var rangeTo = $("#rangeTo").val();
	var ret = "[";

	var x = 0;
	console.log(rangeFrom, rangeTo, refference(3));
	for (x = rangeFrom; x <= rangeTo; x++) {
	    if (x == rangeTo) {
		ret += "[" + x + "," + refference(x) + "]\n";
	    } else {
		ret += "[" + x + "," + refference(x) + "],\n";
	    }


	}
	ret += "]";
	$("#dataSet").html(ret);

    }
    $("#generatorForm").submit(function(e) {
	e.preventDefault();

	runGenerator();
	return false;
    });

    $('#drawFromDataset').click(function(e) {
	e.preventDefault();
	plotFromDataSet();

    });

});