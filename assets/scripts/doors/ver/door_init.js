var doorId = objectGetId();

/* get start position */
var pos = new Vector3f(objectGetPosition(doorId));

/* save start position */
objectAddVarVector(doorId, "start", pos.x, pos.y, pos.z);

objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

/* save position for open state */
objectAddVarVector(doorId, "end", pos.x, pos.y - 0.95, pos.z);// move down
//objectAddVarVector(doorId, "end", pos.x, pos.y + 0.95, pos.z);// move up

/* move direction */
objectAddVarVector(doorId, "dir", 0.0, 0.0, 0.0);

/* time of stay on opened position */
objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

delete doorId, pos;
