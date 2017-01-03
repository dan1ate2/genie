// create the empty robot object
var robot = {
	position:{x:"", y:""},
	orientation:""
};
const MOVE_ONE_SQUARE = 100;

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

	// if positions valid, check if orientation valid
	if (positionValid) orientationValid = validateOrientation(newOrientation.value);
	
	// if position and orientation valid, update robot object and place in position
	if (positionValid && orientationValid) {
		setRobotLocation(newPosition.x, newPosition.y, newOrientation.value);
		moveRobotImage();
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
	else if (!chosenOrientation == "") { 
		robot.orientation = chosenOrientation;
		return true; // valid
	}
}

// update robot object with new x & y position, and orientation
function setRobotLocation(newX, newY, newOrient) {
	if (!newX == "") robot.position.x = newX;
	if (!newY == "") robot.position.y = newY;
	if (!newOrient == "") robot.orientation = newOrient;
}

// move the robot image on table
function moveRobotImage() {
	const CENTERED_X = 20;
	const CENTERED_Y = 10;
	var oldNewPosition = {
		currentX : document.getElementById("robot").x.baseVal.value,
		currentY : document.getElementById("robot").y.baseVal.value,
		newX : "",
		newY : ""
	}
	var robotImage = document.getElementById("robot");
	
	// newX = 

	// testing !!!!!!!!!!!!!!!!!!!!
	robotImage.setAttribute('x', "120"); // set x with calculation from currentx and newx
	robotImage.setAttribute('y', "210"); // set x with calculation from currentx and newx


}

// calculate number of squares to move robot (x and y)
function calcNumSquares(oldPos, newPos){
  	return (oldPos > newPos)? oldPos-newPos : newPos-oldPos;
}

// calculate x or y attribute (pixels) for robot image placement
function calcPixelAttributesXY() {

}