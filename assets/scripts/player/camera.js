/* globals */
this.id;
this.pos;
this.rotSpeed;


/**
 *  Initialization of object
 */
this.onInit = function() {
	this.id = objectGetId();
	this.pos = new Vector3f();
	this.rotSpeed  = 0.5;

	/* set unvisible cursor */
	Mouse.setCursorVisible(false);
}


/**
 *  Update event
 */
this.onUpdate = function() {
	objectSetPosition(this.id, Player.pos.x, Player.pos.y + Player.height, Player.pos.z);

	if (Mouse.isEventAvailable()) {
		var halfWidth  = windowGetWidth()  / 2;
		var halfHeight = windowGetHeight() / 2;
		var dX, dY, dZ;
		var pitch = cameraGetPitch();
		var yaw   = cameraGetYaw();
		
		dX = (Mouse.getX() - halfWidth ) * this.rotSpeed;
		dY = (Mouse.getY() - halfHeight) * this.rotSpeed;	
		
		if (dX >  10.0) dX =  10.0;
		if (dX < -10.0) dX = -10.0;
		if (dY >  10.0) dY =  10.0;
		if (dY < -10.0) dY = -10.0;	

		yaw   += dX;
		pitch -= dY;
		if ((pitch > 45.0 ) && (pitch < 180.0)) pitch = 45.0;
		if ((pitch < 315.0) && (pitch > 180.0)) pitch = 315.0;

		if (!g_PauseState) {
			Mouse.setPosition(halfWidth, halfHeight);

			cameraSetPitch(pitch);
			cameraSetYaw  (yaw);
			cameraUpdate();
		}
	}
}