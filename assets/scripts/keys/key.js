var keyId, keyName;
var pos;

this.onInit = function() {
	keyId = objectGetId();
	keyName = objectGetVar(keyId, "name");
	pos = new Vector3f(objectGetPosition(keyId));
}

this.onUpdate = function() {
	if (distanceBetweenPoints(pos.x, pos.z, Player.pos.x, Player.pos.z) <= 0.2) {
		print("Now I have a '" + keyName + "'!");
		objectAddVarBool(Player.id, keyName, true);
		objectDestroy(keyId);
	}
}