var doorId = objectGetId();

/* get start position */
var pos = new Vector3f();
pos.x = objectGetPositionX(doorId);
pos.y = objectGetPositionY(doorId);
pos.z = objectGetPositionZ(doorId);

/* save start position */
objectAddVarNumber(doorId, "startX", pos.x);
objectAddVarNumber(doorId, "startY", pos.y);
objectAddVarNumber(doorId, "startZ", pos.z);

/* check direction */
var isVertical   = ((mapIsPlaceFree(pos.x - 1, -pos.z)) && (mapIsPlaceFree(pos.x + 1, -pos.z)));
var isHorizontal = ((mapIsPlaceFree(pos.x, -pos.z - 1)) && (mapIsPlaceFree(pos.x, -pos.z + 1)));

/* save direction for openning */
objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);
if (isHorizontal) {
	objectAddVarNumber(doorId, "endX", pos.x - 0.95);
	objectAddVarNumber(doorId, "endY", pos.y);
	objectAddVarNumber(doorId, "endZ", pos.z);
}
else
	if (isVertical) {
		objectAddVarNumber(doorId, "endX", pos.x);
		objectAddVarNumber(doorId, "endY", pos.y);
		objectAddVarNumber(doorId, "endZ", pos.z + 0.95);
	}

/* move direction */
objectAddVarNumber(doorId, "dirX", 0.0);
objectAddVarNumber(doorId, "dirY", 0.0);
objectAddVarNumber(doorId, "dirZ", 0.0);

/* time of stay on opened position */
objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

delete doorId, 
		pos,
		isHorizontal,
		isVertical;
		