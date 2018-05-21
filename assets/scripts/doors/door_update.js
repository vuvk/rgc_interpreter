var doorId = objectGetId();

var pos = new Vector3f();
pos.x = objectGetPositionX(doorId);
pos.y = objectGetPositionY(doorId);
pos.z = objectGetPositionZ(doorId);

var start = new Vector3f();
start.x = objectGetVar(doorId, "startX");
start.y = objectGetVar(doorId, "startY");
start.z = objectGetVar(doorId, "startZ");
		
var end = new Vector3f();
end.x = objectGetVar(doorId, "endX");
end.y = objectGetVar(doorId, "endY");
end.z = objectGetVar(doorId, "endZ");

var moveVector = new Vector3f();
moveVector.x = objectGetVar(doorId, "dirX");
moveVector.y = objectGetVar(doorId, "dirY");
moveVector.z = objectGetVar(doorId, "dirZ");

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
					isMoving = true;
					print("NOW OPENNING!");
					
					/* calculate new move direction */
					moveVector = (end.sub(start)).normalize();
					objectSetVar(doorId, "dirX", moveVector.x);
					objectSetVar(doorId, "dirY", moveVector.y);
					objectSetVar(doorId, "dirZ", moveVector.z);
				}
				else {
					var message = objectGetVar(doorId, "message");
					print("Message: '" + message + "'");
				}
			}
	}
	else {	// is opened
		if (!stayOpened) {
			if (distToPlayer > 1.0) {   // wait when player is far
				if (_delay < delay)
					_delay += deltaTime();
				else {
					isMoving = true;
					_delay = 0;					
					print("NOW CLOSING!");
					
					/* calculate new move direction */
					moveVector = (start.sub(end)).normalize();
					objectSetVar(doorId, "dirX", moveVector.x);
					objectSetVar(doorId, "dirY", moveVector.y);
					objectSetVar(doorId, "dirZ", moveVector.z);
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
		if (distToEnd > moveStep) {
			var dir = moveVector.mul(moveStep);
			
			pos.x += dir.x;
			pos.y += dir.y;
			pos.z += dir.z;
			
			objectSetPosition(doorId, pos.x, pos.y, pos.z);
		}
		else {
			isOpened = true;
			isMoving = false;
			
			objectSetPosition(doorId, end.x, end.y, end.z);
		}
	}
	else {
		var distToStart = distanceBetweenVectors(pos, start);
		if (distToStart > moveStep) {
			var dir = moveVector.mul(moveStep);
			
			pos.x += dir.x;
			pos.y += dir.y;
			pos.z += dir.z;
			
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