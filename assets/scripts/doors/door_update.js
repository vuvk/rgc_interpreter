var doorId = objectGetId();

var start = new Vector3f(objectGetVar(doorId, "start"));

var distToPlayer;
var stayOpened = objectGetVar(doorId, "stayOpened");
var openSpeed  = objectGetVar(doorId, "openSpeed" );
var isOpened   = objectGetVar(doorId, "isOpened"  );
var isMoving   = objectGetVar(doorId, "isMoving"  );
var needKey    = objectGetVar(doorId, "needKey"   );

var angle = objectGetVar(doorId, "angle");

var delay  = objectGetVar(doorId, "delay");
var _delay = objectGetVar(doorId, "_delay");

var pos   = new Vector3f(objectGetPosition(doorId));

if (!isMoving) {
	distToPlayer = distanceBetweenPoints(start.x, start.z, g_PlayerPos.x, g_PlayerPos.z);
	
	if (!isOpened) {	
		if (distToPlayer <= 1.0 && objectIsInView(doorId))
			if (Keyboard.isEventAvailable() && Keyboard.isKeyHit(VK_SPACE)) {
				if (!needKey) {
					startOpenDoor();
				}
				else {
					var keyName = objectGetVar(doorId, "keyName");
					var keyExists = objectGetVar(g_PlayerId, keyName);
					
					if (keyExists == true) {	
						startOpenDoor();
					}
					else {
						var message = objectGetVar(doorId, "message");
						print("Message: '" + message + "'");
					}
				}
			}
	}
	else {	// is opened
		if (!stayOpened) {
			if (distToPlayer > 2.0) {   // wait when player is far
				if (_delay < delay)
					_delay += deltaTime();
				else {
					isMoving = true;
					_delay = 0;
					
					print("NOW CLOSING!");
				}
			}
			else
				_delay = 0;
		}
	}
}

if (isMoving) {
	if (!isOpened) {		
		if (angle < 89.0) {
			var rotSpeed = 50 * openSpeed * deltaTime();
			angle += Math.abs(rotSpeed);
			objectRotate(doorId, 0.0, rotSpeed, 0.0);
		}
		else {
			isOpened = true;
			isMoving = false;
		}
	}
	else {
		if (angle > 0.01) {
			var rotSpeed = 50 * openSpeed * deltaTime();
			angle -=  Math.abs(rotSpeed);
			objectRotate(doorId, 0.0, -rotSpeed, 0.0);
		}
		else {
			isOpened = false;
			isMoving = false;
		}		
	}	
}

objectSetVar(doorId, "angle",    angle);
objectSetVar(doorId, "isOpened", isOpened);
objectSetVar(doorId, "isMoving", isMoving);
objectSetVar(doorId, "_delay",   _delay);

delete doorId,
		angle,
		distToPlayer,
		stayOpened,
		openSpeed,
		isOpened,
		isMoving,
		delay,
		_delay,
		pos;