var doorId = objectGetId();

/* get start position */
var pos = new Vector3f(objectGetPosition(doorId));

/* save start position */
objectAddVarVector(doorId, "start", pos.x, pos.y, pos.z);

/* check direction */
var isVertical   = ((mapIsPlaceFree(pos.x - 1, -pos.z)) && (mapIsPlaceFree(pos.x + 1, -pos.z)));
var isHorizontal = ((mapIsPlaceFree(pos.x, -pos.z - 1)) && (mapIsPlaceFree(pos.x, -pos.z + 1)));

objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

/* save direction for openning */
if (isHorizontal) {
	objectAddVarVector(doorId, "end", pos.x - 0.95, pos.y, pos.z);
}
else
	if (isVertical) {
		objectAddVarVector(doorId, "end", pos.x, pos.y, pos.z + 0.95);
	}

/* move direction */
objectAddVarVector(doorId, "dir", 0.0, 0.0, 0.0);

/* time of stay on opened position */
objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

var openSpeed = objectGetVar(doorId, "openSpeed");
print("openSpeed = " + openSpeed);

delete doorId, 
		pos,
		isHorizontal,
		isVertical;
		