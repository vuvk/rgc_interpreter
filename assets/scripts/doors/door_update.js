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

var distToPlayer;
var stayOpened = objectGetVar(doorId, "stayOpened");
var openSpeed  = objectGetVar(doorId, "openSpeed" );
var isOpened   = objectGetVar(doorId, "isOpened"  );
var isMoving   = objectGetVar(doorId, "isMoving"  );
var needKey    = objectGetVar(doorId, "needKey"   );

var delay  = objectGetVar(doorId, "delay");
var _delay = objectGetVar(doorId, "_delay");


if (!isMoving) {
	//distToPlayer = (start.sub(g_PlayerPos)).length();
	distToPlayer = distanceBetweenPoints2d(start.x, start.z, g_PlayerPos.x, g_PlayerPos.z);
	
	if (!isOpened) {	
		if (distToPlayer <= 1.0 && objectIsInView(doorId))
			if (Keyboard.isEventAvailable() && Keyboard.isKeyHit(VK_SPACE)) {
				if (!needKey) {
					isMoving = true;
					print("NOW OPENNING!");
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
		//var distToEnd = (pos.sub(end)).length();
		var distToEnd = distanceBetweenPoints3d(pos.x, pos.y, pos.z, end.x, end.y, end.z);
		if (distToEnd > moveStep) {
			var dirVector = (end.sub(start)).normalize();
			dirVector = dirVector.mul(moveStep);
			
			pos.x += dirVector.x;
			pos.y += dirVector.y;
			pos.z += dirVector.z;
			
			objectSetPosition(doorId, pos.x, pos.y, pos.z);
		}
		else {
			isOpened = true;
			isMoving = false;
			
			objectSetPosition(doorId, end.x, end.y, end.z);
		}
	}
	else {
		//var distToStart = (pos.sub(start)).length();
		var distToStart = distanceBetweenPoints3d(pos.x, pos.y, pos.z, start.x, start.y, start.z);
		if (distToStart > moveStep) {
			var dirVector = (start.sub(end)).normalize();
			dirVector = dirVector.mul(moveStep);
			
			pos.x += dirVector.x;
			pos.y += dirVector.y;
			pos.z += dirVector.z;
			
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
		distToPlayer,
		stayOpened,
		openSpeed,
		isOpened,
		isMoving,
		delay,
		_delay;