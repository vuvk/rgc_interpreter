var doorId;

var pos, start, end, dir;
var moveVector;

var isOpened = false;
var isMoving = false;

var distToPlayer;

var openSpeed;
var stayOpened;
var needKey;

/* time of stay on opened position */
var  delay = 1.0;
var _delay = 0.0;

function startOpenDoor() {
	isMoving = true;
	print("NOW OPENING!");
	
	/* calculate new move direction */
	moveVector = (end.sub(start)).normalize();
}

this.onInit = function() {
	doorId = objectGetId();

	/* get start position */
	pos = new Vector3f(objectGetPosition(doorId));

	/* save start position */
	start = new Vector3f(pos.x, pos.y, pos.z);

	/* check direction */
	var isVertical   = ((mapIsPlaceFree(pos.x - 1, -pos.z)) && (mapIsPlaceFree(pos.x + 1, -pos.z)));
	var isHorizontal = ((mapIsPlaceFree(pos.x, -pos.z - 1)) && (mapIsPlaceFree(pos.x, -pos.z + 1)));

	openSpeed  = objectGetVar(doorId, "openSpeed" );
	stayOpened = objectGetVar(doorId, "stayOpened");
	needKey    = objectGetVar(doorId, "needKey"   );
	
	var moveTo = 0.95;
	if (openSpeed < 0) 
		moveTo = -moveTo;

	/* save direction for openning */
	if (isHorizontal) {
		end = new Vector3f(pos.x - moveTo, pos.y, pos.z);
	}
	else
		if (isVertical) {
			end = new Vector3f(pos.x, pos.y, pos.z + moveTo);
		}

	/* move direction */
	dir = new Vector3f();
}

this.onUpdate = function() {
	if (!isMoving) {
		distToPlayer = distanceBetweenPoints(start.x, start.z, Player.pos.x, Player.pos.z);
		
		if (!isOpened) {	
			if (distToPlayer <= 1.0 && objectIsInView(doorId))
				if (Keyboard.isEventAvailable() && Keyboard.isKeyHit(VK_SPACE)) {
					if (!needKey) {		
						startOpenDoor();
					}
					else {
						var keyName = objectGetVar(doorId, "keyName");
						var keyExists = objectGetVar(Player.id, keyName);
						
						if (keyExists == true) {
							needKey = false;
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
						_delay += Level.deltaTime;
					else {
						isMoving = true;
						_delay = 0;					
						print("NOW CLOSING!");
						
						/* calculate new move direction */	
						moveVector = (start.sub(end)).normalize();
					}
				}
				else
					_delay = 0;
			}
		}
	}

	if (isMoving && Level.deltaTime > 0.0) {
		var moveStep = openSpeed * Level.deltaTime;
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
			distToPlayer = distanceBetweenPoints(start.x, start.z, Player.pos.x, Player.pos.z);
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
}