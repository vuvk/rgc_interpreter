g_PlayerPos = new Vector3f(playerGetPosition());

var pitch = cameraGetPitch();
var yaw   = cameraGetYaw();
var moveSpeed = g_PlayerSpeed * deltaTime();
var dX, dY, dZ;

if (Keyboard.isEventAvailable()) {	
	if (Keyboard.isKeyPressed(VK_KEY_W)) { // forward
		var rad = degToRad(yaw);
		dX = Math.sin(rad) * moveSpeed;
		dZ = Math.cos(rad) * moveSpeed;

		g_PlayerPos.x -= dX;
		g_PlayerPos.z -= dZ;
	}
	
	if (Keyboard.isKeyPressed(VK_KEY_S)) { // backward
		var rad = degToRad(yaw);
		dX = Math.sin(rad) * moveSpeed;
		dZ = Math.cos(rad) * moveSpeed;
			
		g_PlayerPos.x += dX;
		g_PlayerPos.z += dZ;
	}
	
	if (Keyboard.isKeyPressed(VK_KEY_D)) { //right
		var rad = degToRad(yaw - 90.0);
		dX = Math.sin(rad) * moveSpeed;
		dZ = Math.cos(rad) * moveSpeed;
			
		g_PlayerPos.x += dX;
		g_PlayerPos.z += dZ;
	}
	
	if (Keyboard.isKeyPressed(VK_KEY_A)) { //left
		var rad = degToRad(yaw + 90.0);
		dX = Math.sin(rad) * moveSpeed;
		dZ = Math.cos(rad) * moveSpeed;
			
		g_PlayerPos.x += dX;
		g_PlayerPos.z += dZ;
	}
	
	if (Keyboard.isKeyReleased(VK_KEY_C)) { //pause
		var vec = new Vector3f(cameraGetTarget());
		print("vec = [" + vec.x + " " + vec.y + " " + vec.z + "]");
	}
	
	if (Keyboard.isKeyReleased(VK_KEY_P)) { //pause
		g_PauseState = !g_PauseState;
		print("g_PauseState = " + g_PauseState);
		Mouse.setCursorVisible(g_PauseState);
	}
	
	if (!g_PauseState) {
		playerSetPosition(g_PlayerPos.x, g_PlayerPos.y, g_PlayerPos.z);
		cameraUpdate();
	}
}
/*
delete moveSpeed;
delete dX, dY, dZ;
delete yaw, pitch;
*/