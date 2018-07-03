var weaponId, weaponName, weaponNumber;
var pos;


/**
 *  Initialization of object
 */
this.onInit = function() {
	weaponId = objectGetId();
	weaponName = objectGetVar(weaponId, "name");
	weaponNumber = objectGetVar(weaponId, "weaponNumber");
	pos = new Vector3f(objectGetPosition(weaponId));
}


/**
 *  Update event
 */
this.onUpdate = function() {
	if (distanceBetweenPoints(pos.x, pos.z, Player.pos.x, Player.pos.z) <= 0.2) {		
		print("Now I have a '" + weaponName + "' - " + weaponNumber + " weapon!");
		
		if (!weaponIsAvailable(weaponNumber)) {
			weaponSetAvailable(weaponNumber, true);
			weaponSetActive(weaponNumber);
		}
		
		objectDestroy(weaponId);
	}
}


/**
 *  Destroy
 */
this.onDestroy = function() {
}