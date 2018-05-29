var doorId = objectGetId();

var pos   = new Vector3f(objectGetPosition(doorId));
var start = new Vector3f(objectGetVar(doorId, "start"));
var end   = new Vector3f(objectGetVar(doorId, "end"));
var moveVector = new Vector3f(objectGetVar(doorId, "dir"));

var distToPlayer;
var stayOpened = objectGetVar(doorId, "stayOpened");
var openSpeed  = objectGetVar(doorId, "openSpeed" );
var isOpened   = objectGetVar(doorId, "isOpened"  );
var isMoving   = objectGetVar(doorId, "isMoving"  );
var needKey    = objectGetVar(doorId, "needKey"   );

var delay  = objectGetVar(doorId, "delay");
var _delay = objectGetVar(doorId, "_delay");


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
						objectSetVar(doorId, "needKey", false);
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
					
					/* calculate new move direction */
					moveVector = (start.sub(end)).normalize();
					objectSetVar(doorId, "dir", moveVector.x, moveVector.y, moveVector.z);	
				}
			}
			else
				_delay = 0;
		}
	}
}

if (isMoving) {
	var moveStep = openSpeed * deltaTime();
	if (!isOpened) {		
		var distToEnd = distanceBetweenVectors(pos, end);
		if (distToEnd > Math.abs(moveStep)) {
			var dir = moveVector.mul(moveStep);
			if (openSpeed > 0)
				pos = pos.add(dir);
			else
				pos = pos.sub(dir);
			objectSetPosition(doorId, pos.x, pos.y, pos.z);
		}
		else {
			isOpened = true;
			isMoving = false;
			
			objectSetPosition(doorId, end.x, end.y, end.z);
		}
	}
	else {
		distToPlayer = distanceBetweenPoints(start.x, start.z, g_PlayerPos.x, g_PlayerPos.z);
		if (distToPlayer <= 2.0) {// open the closing door as the player approaches
			isOpened = false;
			startOpenDoor();
		}
		var distToStart = distanceBetweenVectors(pos, start);
		if (distToStart > Math.abs(moveStep)) {
			var dir = moveVector.mul(moveStep);
			if (openSpeed > 0)
				pos = pos.add(dir);
			else
				pos = pos.sub(dir);
			objectSetPosition(doorId, pos.x, pos.y, pos.z);
		}
		else {
			isOpened = false;
			isMoving = false;
			
			objectSetPosition(doorId, start.x, start.y, start.z);
		}		
	}	
}

objectSetVar(doorId, "isOpened", isOpened);
objectSetVar(doorId, "isMoving", isMoving);
objectSetVar(doorId, "_delay",   _delay);

delete doorId,
		pos,
		start,
		end,
		moveVector,
		distToPlayer,
		stayOpened,
		openSpeed,
		isOpened,
		isMoving,
		delay,
		_delay;