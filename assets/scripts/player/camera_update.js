cameraSetPosition(g_PlayerPos.x, g_PlayerPos.y + g_PlayerHeight, g_PlayerPos.z);

if (Mouse.isEventAvailable()) {
	var halfWidth  = windowGetWidth()  / 2;
	var halfHeight = windowGetHeight() / 2;
	var dX, dY, dZ;
	var pitch = cameraGetPitch();
	var yaw   = cameraGetYaw();
	
	dX = (Mouse.getX() - halfWidth ) * g_RotSpeed;
	dY = (Mouse.getY() - halfHeight) * g_RotSpeed;	
	
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
/*
	delete dX, dY, dZ;
	delete yaw, pitch;
*/
}
