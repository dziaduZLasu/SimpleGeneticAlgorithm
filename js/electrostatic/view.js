function view(){
	this.putCharge = view_putCharge;
	this.flushCanvas = view_flushCanvas;
	this.initGraphics  = view_initGraphics;
	this.getColorHex = view_getColorHex;
	this.context = null;
	this.htmlCanvas = null;
	this.helperCanvas = null;
	this.helperContext = null;
	this.selectorId ="";
	this.translateToRgb = view_translateToRgb;
	this.drawFieldVector = view_drawFieldVector;
	this.snapshot=view_snapshot;
}
function view_initGraphics(contextId){
	this.selectorId  = contextId;
	this.htmlCanvas = document.getElementById(contextId);
	this.htmlCanvas.width=$(this.htmlCanvas).width();
	this.htmlCanvas.height=523;
	this.htmlCanvas.style.padding=0;
	this.context = this.htmlCanvas.getContext("2d");
	
	this.helperCanvas = document.getElementById("pointerVector");
	this.helperCanvas.width=100;
	this.helperCanvas.height=100;
	this.helperContext = this.helperCanvas.getContext("2d");
	
	
	
	
	
}

function view_putCharge(charge){
	var chargeColor=charge.charge>0?"#aa0000":"000077";
	
	this.context.beginPath();
	this.context.moveTo(charge.x,charge.y);
	this.context.fillStyle=chargeColor;
	this.context.arc(charge.x,charge.y,charge.r,0,Math.PI*2,true);
	this.context.closePath();
	this.context.fill();

	
	
}
function view_flushCanvas(){}



function view_getColorHex( decimal ){
	var roundValue=Math.round(decimal);
	return "#"+roundValue.toString(16);
}

var view_translateToRgb = function(color){
	var ret = Math.abs(color);
	
	
	var r=ret/255;
	var g=ret/512;
	var b=ret/768;
	if (color<0)
		return [b,g,r];
	
	
	return [r,g,b];
	
	
	
	
}




/**
 * this one is form 
 * http://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
 * @param {type} context
 * @param {type} fromx
 * @param {type} fromy
 * @param {type} tox
 * @param {type} toy
 * @returns {undefined}
 */
 function view_drawFieldVector(v,p){
	var p=center =[50,50];
    var headlen = 10;   // length of head in pixels
	var vL=Math.sqrt(Vector.scalar(v,v));
	var L=[v[0]*30/vL,v[1]*30/vL];
	var to=[L[0]+p[0],L[1]+p[1]];
	var angle = Math.atan2(to[1]-p[1],to[0]-p[0]);
	this.helperContext.clearRect(0,0,this.helperCanvas.width,this.helperCanvas.height);
	this.helperContext.beginPath();
    this.helperContext.moveTo(p[0],p[1]);
    this.helperContext.lineTo(to[0],to[1]);
    this.helperContext.lineTo(to[0]-headlen*Math.cos(angle-Math.PI/6),to[1]-headlen*Math.sin(angle-Math.PI/6));
    this.helperContext.moveTo(to[0], to[1]);
    this.helperContext.lineTo(to[0]-headlen*Math.cos(angle+Math.PI/6),to[1]-headlen*Math.sin(angle+Math.PI/6));
	this.helperContext.stroke();
	
	
}

function view_snapshot(e){
	
	var im=this.htmlCanvas.toDataURL('image/png');
	window.open(im);
	
	//document.location.href=im;
	
	
}

