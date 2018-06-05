/* globals */
var g_CameraId = objectGetId();
var g_CameraPos = new Vector3f(g_PlayerPos.x, g_PlayerPos.y, g_PlayerPos.z);
var g_RotSpeed  = 0.5;

print("camera id is " + g_CameraId);

/* set unvisible cursor */
Mouse.setCursorVisible(false);

/* WRAPPERS */

/* setters */
function cameraSetPosition(x, y, z) {
	objectSetPosition(g_CameraId, x, y, z);
}

/* getters */
function cameraGetPosition() {
	return objectGetPosition(g_CameraId);
}
function cameraGetPositionX() {
	return objectGetPositionX(g_CameraId);
}
function cameraGetPositionY() {
	return objectGetPositionY(g_CameraId);
}
function cameraGetPositionZ() {
	return objectGetPositionZ(g_CameraId);
}
