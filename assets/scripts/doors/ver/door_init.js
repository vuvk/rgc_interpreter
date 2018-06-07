var doorId = objectGetId();

/* get start position */
var pos = new Vector3f(objectGetPosition(doorId));

/* save start position */
objectAddVarVector(doorId, "start", pos.x, pos.y, pos.z);

objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

var openSpeed = objectGetVar(doorId, "openSpeed");
var moveTo = 0.95;
if (openSpeed < 0) 
	moveTo = -moveTo;

/* save position for open state */
objectAddVarVector(doorId, "end", pos.x, pos.y + moveTo, pos.z);

/* move direction */
objectAddVarVector(doorId, "dir", 0.0, 0.0, 0.0);

/* time of stay on opened position */
objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

function startOpenDoor() {
	isMoving = true;
	print("NOW OPENING!");
	
	/* calculate new move direction */
	moveVector = (end.sub(start)).normalize();
	objectSetVar(doorId, "dir", moveVector.x, moveVector.y, moveVector.z);
}
/*
delete doorId, pos;
*/