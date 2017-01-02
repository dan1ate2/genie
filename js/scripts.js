// create the empty robot object
var robot = {
	position:{x:"", y:""},
	orientation:""
};

// sets the robot position and orientation from 'place' button
function placeRobot() {
	// var x = document.getElementById("x-pos").value;
	// var y = document.getElementById("y-pos").value;
	var newPosition = {
		x: document.getElementById("x-pos").value,
		y: document.getElementById("y-pos").value
	}
	var newOrientation = document.getElementById("orientation");
	var positionValid = true; // flag
	var orientationValid = true; // flag

	// place x and y in new position
	Object.keys(newPosition).forEach(function (key) {
		var tempKeyName;
		
		// check if x or y
		if(positionValid) {
			switch(key) {
				case "x": // validate x position
					tempKeyName = "X Position";
					positionValid = validatePositionInput(tempKeyName, key, newPosition.x, robot.position.x);
					break;
				case "y": // validate y position
					tempKeyName = "Y Position";
					positionValid = validatePositionInput(tempKeyName, key, newPosition.y, robot.position.y);
					break;
				default:
					tempKeyName = ""; // avoids undefined error
			}
		}
	});

	// check if orientation given or already set
	if (robot.orientation == "" && newOrientation.value == "") {
		orientationValid = false;
		alert("An orientation must be chosen for the robot to face, please fix.")
	}
	else if (!newOrientation == "") {
		robot.orientation = newOrientation.value;
	}

	if (positionValid && orientationValid) {
		setRobotLocation(newPosition.x, newPosition.y, newOrientation.value)
	}

	return false; // stop browser refresh
}

// input validation for x or y position
function validatePositionInput(keyName, key, posValue, curValue) {
	// check for invalid or empty numbers
	if (isNaN(posValue)) { // if it's not a number
		alert(keyName + " must be numeric and between 0-4")
		return false;
	}
	else if (curValue == "" && posValue == "") { // if it's not initialised at all
		alert(keyName + " cannot be empty, please enter a number between 0-4");
	 	return false;
	}
	else {
		return true; // must be valid
	}
}

// update robot object with new x & y position, and orientation
function setRobotLocation(newX, newY, newOrient) {
	if (!newX == "") {
		robot.position.x = newX;
	}
	if (!newY == "") {
		robot.position.y = newY;
	}
	if (!newOrient == "") {
		robot.orientation = newOrient;
	}
}