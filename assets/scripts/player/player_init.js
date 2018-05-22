/* globals */
var g_PlayerId = objectGetId();
var g_PlayerPos = new Vector3f(0, 0, 0);
var g_PlayerHeight = 0.5;						// height of player
var g_PlayerSpeed  = 3.0;

print("player id is " + g_PlayerId);

/* WRAPPERS */

/* setters */
function playerSetPosition(x, y, z) {
	objectSetPosition(g_PlayerId, x, y, z);
}
function playerSetHealth(hp) {
	objectSetVar(g_PlayerId, "health", hp);
}

/* getters */
function playerGetPosition() {
	return objectGetPosition(g_PlayerId);
}
function playerGetPositionX() {
	return objectGetPositionX(g_PlayerId);
}
function playerGetPositionY() {
	return objectGetPositionY(g_PlayerId);
}
function playerGetPositionZ() {
	return objectGetPositionZ(g_PlayerId);
}
function playerGetHealth() {
	return objectGetVar(g_PlayerId, "health");
}