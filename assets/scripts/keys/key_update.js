var keyId = objectGetId();
var pos = new Vector3f(objectGetPosition(keyId));

if (distanceBetweenPoints(pos.x, pos.z, g_PlayerPos.x, g_PlayerPos.z) <= 0.2) {
	var keyName = objectGetVar(keyId, "name");
	print("Now I have a '" + keyName + "'!");
	objectAddVarBool(g_PlayerId, keyName, true);
	//objectSetEnable(keyId, false);
	objectDestroy(keyId);
}

delete keyId, pos;