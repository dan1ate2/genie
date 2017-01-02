// ititialise the robot object
var robot = {
	position:{x:"", y:""},
	orientation:""
};

// sets the robot position and orientation from 'place' button
function setRobotPosition() {
	var x = document.getElementById("x-pos").value;
	var y = document.getElementById("y-pos").value;
	var orientation = document.getElementById("orientation");

	// validation for x and y
	if (isNaN(x)) { // if x is not a number
		alert("x must be numeric and between 0-4")
	}
	else if ((robot.position.x == "") && (x == "")) { // if x not initialised
		alert("x cannot be empty, please enter a number between 0-4");
	}
	else {
		robot.position.x = x;
	}

	//test iterate over position keys (property names)
	Object.keys(robot.position).forEach(function (key) {
		console.log(key);
	});

	// [debug]
	// console.log(orientation.value);
	// console.log(y);
	// console.log(x);
}