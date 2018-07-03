/* globals */
this.id;
this.pos;
var moveL = false, 
    moveR = false, 
	moveF = false, 
	moveB = false;
this.isMoving = false;
this.height;
this.speed;


/**
 *  Initialization of object
 */
this.onInit = function() {
	this.id = objectGetId();
	this.pos = new Vector3f(objectGetPosition(this.id));
	this.height = 0.5;
	this.speed  = 3.0;
}


/**
 *  Update event
 */
this.onUpdate = function() {
	this.pos = new Vector3f(objectGetPosition(this.id));

	var pitch = cameraGetPitch();
	var yaw   = cameraGetYaw();
	var moveSpeed = this.speed * Level.deltaTime;
	var dX, dY, dZ;

	if (Keyboard.isEventAvailable()) {
		
		if (Keyboard.isKeyPressed(VK_KEY_W)) { // forward
			if (moveSpeed > 0.0) {
				var rad = degToRad(yaw);
				dX = Math.sin(rad) * moveSpeed;
				dZ = Math.cos(rad) * moveSpeed;

				this.pos.x -= dX;
				this.pos.z -= dZ;
			}
			
			moveF = true;
		}
		
		if (Keyboard.isKeyPressed(VK_KEY_S)) { // backward
			if (moveSpeed > 0.0) {
				var rad = degToRad(yaw);
				dX = Math.sin(rad) * moveSpeed;
				dZ = Math.cos(rad) * moveSpeed;
					
				this.pos.x += dX;
				this.pos.z += dZ;
			}
			
			moveB = true;
		}
		
		if (Keyboard.isKeyPressed(VK_KEY_D)) { //right
			if (moveSpeed > 0.0) {
				var rad = degToRad(yaw - 90.0);
				dX = Math.sin(rad) * moveSpeed;
				dZ = Math.cos(rad) * moveSpeed;
					
				this.pos.x += dX;
				this.pos.z += dZ;
			}
			
			moveR = true;
		}
		
		if (Keyboard.isKeyPressed(VK_KEY_A)) { //left
			if (moveSpeed > 0.0) {
				var rad = degToRad(yaw + 90.0);
				dX = Math.sin(rad) * moveSpeed;
				dZ = Math.cos(rad) * moveSpeed;
					
				this.pos.x += dX;
				this.pos.z += dZ;
			}
			
			moveL = true;
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
		
		/* change weapons */
		if (Keyboard.isKeyHit(VK_KEY_1) && weaponIsAvailable(1)) {
			weaponSetActive(1);
		}		
		if (Keyboard.isKeyHit(VK_KEY_2) && weaponIsAvailable(2)) {
			weaponSetActive(2);
		}		
		if (Keyboard.isKeyHit(VK_KEY_3) && weaponIsAvailable(3)) {
			weaponSetActive(3);
		}		
		
		if (!g_PauseState) {
			objectSetPosition(this.id, this.pos.x, this.pos.y, this.pos.z);
			cameraUpdate();
		}
		
		/* stop moving? */
		if (Keyboard.isKeyReleased(VK_KEY_W)) {
			moveF = false;
		}
		if (Keyboard.isKeyReleased(VK_KEY_S)) {
			moveB = false;
		}
		if (Keyboard.isKeyReleased(VK_KEY_A)) {
			moveL = false;
		}
		if (Keyboard.isKeyReleased(VK_KEY_D)) {
			moveR = false;
		}
	}
		
	this.isMoving = moveF || moveB || moveL || moveR;
}