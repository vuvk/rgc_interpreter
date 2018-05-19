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

/* save direction for openning */
objectAddVarBool(doorId, "isOpened", false);
objectAddVarBool(doorId, "isMoving", false);

objectAddVarNumber(doorId, "endX", pos.x);
objectAddVarNumber(doorId, "endY", pos.y + 1);
objectAddVarNumber(doorId, "endZ", pos.z);

objectAddVarNumber(doorId, "delay", 1);
objectAddVarNumber(doorId, "_delay", 0);

delete doorId, pos;
