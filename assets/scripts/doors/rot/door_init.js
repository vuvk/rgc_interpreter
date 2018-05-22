var doorId = objectGetId();

/* get start position */
var pos = new Vector3f(objectGetPosition(doorId));

/* save start position */
objectAddVarVector(doorId, "start", pos.x, pos.y, pos.z);

/* save start angle */
objectAddVarNumber(doorId, "angle", 0.0);

objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

delete doorId, 
		pos;
		