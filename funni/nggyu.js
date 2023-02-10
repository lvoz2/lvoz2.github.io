// The following variable can be edited
var fps = 10; // The frame rate of the animation, in fps

// DO NOT EDIT THE STUFF BELOW THIS POINT
var frameNumber = -1;
var id = 0;
var divs = document.getElementsByTagName("div");
function start() {
	for (var i = 0; i < divs.length; i++) {
		divs[i].className = "hidden";
	}
	id = setInterval(animate, (1000/fps));
	animate()
}
function animate() {
	frameNumber++;
	if (frameNumber < divs.length) {
		for (var i = 0; i < divs.length; i++) {
			divs[i].className = "hidden";
		}
		divs[frameNumber].className = "visible";
	} else {
		clearInterval(id);
		location.reload();
	}
}
