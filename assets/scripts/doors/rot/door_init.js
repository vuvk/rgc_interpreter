var doorId = objectGetId();

/* get start position */
var pos = new Vector3f(objectGetPosition(doorId));

/* check direction */
var isVertical = ((mapIsPlaceFree(pos.x - 1, -pos.z)) && (mapIsPlaceFree(pos.x + 1, -pos.z)));

var defAngle = 0;
if (isVertical)
	defAngle = 90;
objectAddVarNumber(doorId, "defAngle", defAngle);

/* save start position */
objectAddVarVector(doorId, "start", pos.x, pos.y, pos.z);

/* save start angle */
objectAddVarNumber(doorId, "angle", 0.0);

objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

delete doorId, 
		pos,
		defAngle;
		

function setDoorOpeningDirection() {
	var defAngle = objectGetVar(doorId, "defAngle");
	var radian = Math.atan2(g_PlayerPos.x - pos.x, g_PlayerPos.z - pos.z);		
	openSpeed = Math.abs(openSpeed);				
	if ((defAngle == 90 && radian < 1) || (defAngle == 0 && radian > 1))
		openSpeed = -openSpeed;					
	objectSetVar(doorId, "openSpeed", openSpeed);
}

function startOpenDoor() {
	setDoorOpeningDirection();
	isMoving = true;
	print("NOW OPENING!");	
}
		