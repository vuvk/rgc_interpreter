var doorId = objectGetId();

var pos = new Vector3f();
/* get start position */
pos.x = objectGetPositionX(doorId);
pos.y = objectGetPositionY(doorId);
pos.z = objectGetPositionZ(doorId);

/* save start position */
objectAddVarNumber(doorId, "startX", pos.x);
objectAddVarNumber(doorId, "startY", pos.y);
objectAddVarNumber(doorId, "startZ", pos.z);

/* save start angle */
objectAddVarNumber(doorId, "angle", 0.0);

objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

delete doorId, 
		pos;
		