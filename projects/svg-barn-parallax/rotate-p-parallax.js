"use strict";

function setupSceneAnimation(svgDocument) {

	var rotor = svgDocument.getElementById("layer6-86");
	var rotorTimeFunc = function(seconds) {
		rotor.setAttribute("transform", "rotate(" + seconds * 10 + ")");
	};
	var rotorAnimator = function(miliseconds) {
		rotorTimeFunc(miliseconds / 1000);
		requestAnimationFrame(rotorAnimator);
	};
	requestAnimationFrame(rotorAnimator);


	var layersParallaxAmount = [
		{
			id: "layer5",//sky
			amount: 0
		},
		{
			id: "layer6",//far mountains
			amount: 0
		},
		{
			id: "layer4",//side hills
			amount: 0.1
		},
		{
			id: "layer8",//pump
			amount: 0.3
		},
		{
			id: "layer3",//barn hill
			amount: 0.3
		},
		{
			id: "layer2",//fence path
			amount: 0.6
		},
		{
			id: "layer1",//close post
			amount: 0.9
		}
	];
	layersParallaxAmount.forEach(function(elem){
		elem.layer = svgDocument.getElementById(elem.id);
	});

	var width = 1280,
		height = 720;
	var applyParallax = function(layerParallaxAmount, centerDeviation) {
		function translate(x,y){
			return "translate("+x+","+y+")";
		}
		var parallaxDelta = {x: centerDeviation.x*layerParallaxAmount.amount, y: centerDeviation.y*layerParallaxAmount.amount};
		layerParallaxAmount.layer.setAttribute("transform", translate(parallaxDelta.x, parallaxDelta.y));
	};

	var onMove = function(moveEvt) {
		var center = {x: width*0.5, y: height*0.5};
		var centerDeviation = {x: moveEvt.x-center.x, y: moveEvt.y-center.y};
		layersParallaxAmount.forEach(function(elem){
			applyParallax(elem, centerDeviation);
		});
	};

	svgDocument.addEventListener("mousemove", onMove);


}