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

objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

/* save position for open state */
objectAddVarNumber(doorId, "endX", pos.x);
objectAddVarNumber(doorId, "endY", pos.y - 0.95);
objectAddVarNumber(doorId, "endZ", pos.z);

/* move direction */
objectAddVarNumber(doorId, "dirX", 0.0);
objectAddVarNumber(doorId, "dirY", 0.0);
objectAddVarNumber(doorId, "dirZ", 0.0);

/* time of stay on opened position */
objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

delete doorId, pos;
