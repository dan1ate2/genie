// create the empty robot object
var robot = {
	position:{x:"", y:""},
	orientation:"",
	placed:false
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
		if(positionValid) {
			switch(key) { // check if x or y
				case "x": // validate x position
					tempKeyName = "X Position";
					positionValid = validatePositionInput(tempKeyName, newPosition.x, robot.position.x);
					break;
				case "y": // validate y position
					tempKeyName = "Y Position";
					positionValid = validatePositionInput(tempKeyName, newPosition.y, robot.position.y);
					break;
				default:
					tempKeyName = ""; // avoids undefined error
			}
		}
	});

	// if positions valid, validate orientation
	if (positionValid) orientationValid = validateOrientation(newOrientation.value);
	 
	// if position & orientation valid, place robot image & update robot object
	if (positionValid && orientationValid) {
		setRobotLocation(newPosition.x, newPosition.y, newOrientation.value);
		if (robot.placed == false) {
			showRobot(); // display the robot
			displayCommands(); // initialise game commands
		}
	}

	return false; // stop browser refresh
}

// input validation for x or y position
function validatePositionInput(keyName, posValue, curValue) {
	// check for invalid or empty numbers
	if (isNaN(posValue)) { // if it's not a number
		alert(keyName + " must be numeric and between 0-4");
		return false;
	}
	else if (curValue == "" && posValue == "") { // only if it's not initialised at all
		alert(keyName + " cannot be empty, please enter a number between 0-4");
	 	return false;
	}
	else if (!validateMoveRobot(posValue)) { // not within range of squares
		alert(keyName + " invalid, please enter a number between 0-4");
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
	else if (chosenOrientation != "") return true; // valid
}

// enable/show the game commands
function displayCommands() {
	document.getElementById("move-button").disabled = false;
	document.getElementById("left-button").disabled = false;
	document.getElementById("right-button").disabled = false;
	document.getElementById("report-button").disabled = false;
}

// show robot image
function showRobot() {
	document.getElementById("wholeRobot").setAttribute("visibility", "visible");
	robot.placed = true;
}

// move robot and update properties with new x & y position & orientation
function setRobotLocation(newX, newY, newOrient) {
	if (newX !== "" && newX != robot.position.x) robot.position.x = Number(newX);
	if (newY !== "" && newY != robot.position.y) robot.position.y = Number(newY);
	setRobotImage();
	setRobotOrientation(newOrient);
}

// update robot object orientation property
function setRobotOrientation(newOrient) {
	if (newOrient != "" && newOrient != robot.orientation) robot.orientation = newOrient;
	if (newOrient != "") updateEyeOrientation(newOrient);
}

// move the robot image on table
function setRobotImage() {
	var imagePos = {
		newAttrX : "",
		newAttrY : ""
	}
	
	// calculate new position for robot image
	imagePos.newAttrX = calcPixelAttributesXY(robot.position.x, "x");
	imagePos.newAttrY = calcPixelAttributesXY(robot.position.y, "y");

	// set robot image x and y attributes with new position
	document.getElementById("robot").setAttribute('x', imagePos.newAttrX);
	document.getElementById("robot").setAttribute('y', imagePos.newAttrY);
}

// calculate x or y attribute (pixels) for robot image placement
function calcPixelAttributesXY(newSqPos, XY) {
	var newPixelAttr;
	const CENTERED_X = 20;
	const CENTERED_Y_FLIPPED = 410; // so bottom left corner is 0,0 (y)
	
	XY == "x" ? newPixelAttr = newSqPos * MOVE_ONE_SQUARE + CENTERED_X 
		: newPixelAttr = CENTERED_Y_FLIPPED - (newSqPos * MOVE_ONE_SQUARE);

	return newPixelAttr;
}

// turn robot left or right from current orientation (left/right button)
function turnRobot(turnDirection) {
	var orientation = ["north", "east", "south", "west", "north"];
	var newOrient;
	var index = orientation.indexOf(robot.orientation);
	
	if (turnDirection == "left" && robot.orientation == "north") newOrient = "west";
	else turnDirection == "left" ? newOrient = orientation[index - 1] 
		: newOrient = orientation[index + 1];

	setRobotOrientation(newOrient);
}

// report the current position of the robot
function reportRobotPosition() {
	alert("Robot position: "+robot.position.x+","+robot.position.y+","
		+robot.orientation.toUpperCase());
}

// update robot orientation by moving eye direction
function updateEyeOrientation(orient) {
	var newOrientX;
	var newOrientY;
	var xEyePos = {
		north:51,
		east:56,
		south:51,
		west:46
	}
	var yEyePos = {
		north:424,
		east:430,
		south:435,
		west:430
	};
	
	// x & y attributes/position for eye orientation
	switch(orient) {
		case "north":
			newOrientX = MOVE_ONE_SQUARE * robot.position.x + xEyePos.north;
			newOrientY = yEyePos.north - MOVE_ONE_SQUARE * robot.position.y;
			break;
		case "east":
			newOrientX = MOVE_ONE_SQUARE * robot.position.x + xEyePos.east;
			newOrientY = yEyePos.east - (MOVE_ONE_SQUARE * robot.position.y);
			break;
		case "south":
			newOrientX = MOVE_ONE_SQUARE * robot.position.x + xEyePos.south;
			newOrientY = yEyePos.south - (MOVE_ONE_SQUARE * robot.position.y);
			break;
		case "west":
			newOrientX = MOVE_ONE_SQUARE * robot.position.x + xEyePos.west;
			newOrientY = yEyePos.west - (MOVE_ONE_SQUARE * robot.position.y);
			break;
	}

	// update circle attributes with new position
	document.getElementById("eye").setAttribute('cx', newOrientX);
	document.getElementById("eye").setAttribute('cy', newOrientY);
}

// move robot one square in direction of current orientation (move button)
function moveRobot() {
	var squarePos;
	var axis;
	
	// determine movement direction and axis (x or y) & update robot
	switch(robot.orientation) {
		case "north":
			squarePos = robot.position.y + 1, axis = "y";
			break;
		case "east":
			squarePos = robot.position.x + 1, axis = "x";
			break;
		case "south":
			squarePos = robot.position.y - 1, axis = "y";
			break;
		case "west":
			squarePos = robot.position.x - 1, axis = "x";
			break;
	}

	// if valid square on table, update robot object and move
	if (validateMoveRobot(squarePos)) {
		switch(axis) {
			case "x":
				setRobotLocation(squarePos, "", "");
				break;
			case "y":
				setRobotLocation("", squarePos, "");
				break;
		}
		updateEyeOrientation(robot.orientation);
	}
}

// validate robot movement (prevent robot falling off table)
function validateMoveRobot(squarePosition) {
	var lowestSquare = 0;
	var highestSquare = 4;
	return (squarePosition < lowestSquare || squarePosition > highestSquare) ? 
		false : true;
}

// * for testing inputs only
function testInputs() {

}

// test for not falling off table