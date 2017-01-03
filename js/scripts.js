// create the empty robot object
var robot = {
	position:{x:"", y:""},
	orientation:""
};

// sets the robot position and orientation from 'place' button
function placeRobot() {
	var newPosition = {
		x: document.getElementById("x-pos").value,
		y: document.getElementById("y-pos").value
	}
	var newOrientation = document.getElementById("orientation");
	var positionValid = true; // flag
	var orientationValid; // flag

	// validate x and y
	Object.keys(newPosition).forEach(function (key) { // gets property key names (x or y)
		var tempKeyName;
		if(positionValid) {
			switch(key) { // check if x or y
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

	// if positions valid, validate orientation
	if (positionValid) orientationValid = validateOrientation(newOrientation.value);
	 
	// if position and orientation valid, place robot image in square & update robot object
	if (positionValid && orientationValid) {
		setRobotLocation(newPosition.x, newPosition.y, newOrientation.value);
		// moveRobotImage();
	}

	return false; // stop browser refresh
}

// input validation for x or y position
function validatePositionInput(keyName, key, posValue, curValue) {
	// check for invalid or empty numbers
	if (isNaN(posValue)) { // if it's not a number
		alert(keyName + " must be numeric and between 0-4");
		return false;
	}
	else if (curValue == "" && posValue == "") { // only if it's not initialised at all
		alert(keyName + " cannot be empty, please enter a number between 0-4");
	 	return false;
	}
	else return true; // must be valid
}

// input validation for orientation
function validateOrientation(chosenOrientation) {
	// check if orientation given or already set
	if (robot.orientation == "" && chosenOrientation == "") {
		orientationValid = false;
		alert("An orientation must be chosen for the robot to face, please fix.");
		return false; // not valid
	}
	else if (chosenOrientation != "") { 
		robot.orientation = chosenOrientation;
		return true; // valid
	}
	// *** CHECK IF NEED TO ADD THIRD OPTION IF ORIENTATION EMPTY, MIGHT BE BUG
}

// move robot and update properties with new position & orientation
function setRobotLocation(newX, newY, newOrient) {
	// update robot object position
	if (newX != "" && newX != robot.position.x) robot.position.x = newX;
	if (newY != "" && newY != robot.position.y) robot.position.y = newY;
	setRobotImage(newX, newY); // move the robot image
	setRobotOrientation(newOrient);
}

// update robot object orientation property
function setRobotOrientation(newOrient) {
	// update robot object orientation
	if (newOrient != "" && newOrient != robot.orientation) {
		robot.orientation = newOrient;
		updateEyeOrientation(newOrient);
	}
}

// move the robot image on table
function setRobotImage(x, y) {
	var imagePos = {
		newAttrX : "",
		newAttrY : ""
	}
	
	// calculate new position for robot image
	imagePos.newAttrX = calcPixelAttributesXY(x, "x");
	imagePos.newAttrY = calcPixelAttributesXY(y, "y");

	// set robot image x and y attributes with new position
	document.getElementById("robot").setAttribute('x', imagePos.newAttrX);
	document.getElementById("robot").setAttribute('y', imagePos.newAttrY);
}

// calculate x or y attribute (pixels) for robot image placement
function calcPixelAttributesXY(newSqPos, XY) {
	var newPixelAttr;
	const CENTERED_X = 20;
	const CENTERED_Y_FLIPPED = 410; // so bottom left corner is 0,0
	const MOVE_ONE_SQUARE = 100;
	
	XY == "x" ? newPixelAttr = newSqPos * MOVE_ONE_SQUARE + CENTERED_X 
		: newPixelAttr = CENTERED_Y_FLIPPED - (newSqPos * MOVE_ONE_SQUARE);

	return newPixelAttr;
}

// update robot orientation by moving eye direction
function updateEyeOrientation(orient) {
	var newOrientX;
	var newOrientY;
	
	switch(orient) {
		case "north":
			// put north attributes here (x and y for circle/eye)
			break;
		case "east":
			break;
		case "south":
			break;
		case "west":
			break;
	}

	// update circle attributes with new position
	// document.getElementById("eye").setAttribute('x', newOrientX);
	// document.getElementById("eye").setAttribute('y', newOrientY);
}

// move robot one square in direction of current orientation (move button)
function moveRobot() {

}

// turn robot left or right from current orientation (left/right button)
function turnRobot(turnDirection) {
	var orientation = ["north", "east", "south", "west", "north"];
	var newOrient;
	var index = orientation.indexOf(robot.orientation);
	
	if (turnDirection == "left" && robot.orientation == "north") {
		newOrient = "west";
	}
	else {
		turnDirection == "left" ? newOrient = orientation[index - 1] 
		: newOrient = orientation[index + 1];
	}

	setRobotOrientation(newOrient);
}

// report the current location of the robot
function reportRobot() {
	// return
}