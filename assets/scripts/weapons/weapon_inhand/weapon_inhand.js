
var weaponId;
var name;

var accuracy;
var damage;
var distanceOfAttack;
var maxAmmo, infiniteAmmo;

var pos;
var start, end, dir;

var animSpeed, animDelay;
var frame, maxFrame, fireFrame;
var isAnimPlay;

var onUp;

/**
 *  Initialization of object
 */
this.onInit = function() {
	weaponId = objectGetId();
	name = objectGetVar(weaponId, "name");
	
	damage   = objectGetVar(weaponId, "damage"  );
	accuracy = objectGetVar(weaponId, "accuracy");
	accuracy /= 100.0;			/* in percents */
	accuracy = 1.0 - accuracy;	/* if 0 then it is very accuracy weapon */
	maxAmmo  = objectGetVar(weaponId, "maxAmmo" );
	infiniteAmmo = objectGetVar(weaponId, "infiniteAmmo");
	distanceOfAttack = objectGetVar(weaponId, "distance");

	/**
	 * align by screen 
	 * 0 - down-right
	 * 1 - down-center
	 * 2 - down-left
	 * 3 - up-right
	 * 4 - up-center
	 * 5 - up-left
	 */
	var align = objectGetVar(weaponId, "align");

	var screenWidth  = windowGetWidth();
	var screenHeight = windowGetHeight();

	var imageWidth  = objectGetSizeX(weaponId);
	var imageHeight = objectGetSizeY(weaponId);

	var min = (screenHeight < screenWidth) ? screenHeight : screenWidth;
	min /= 2;
	var scale = min / imageHeight;
	objectSetScale(weaponId, scale, scale);
	//print ('scale = ' + scale + ' min = ' + min + ' min/2 = ' + (min / 2.0) + ' imageHeight = ' + imageHeight);

	imageWidth  *= scale;
	imageHeight *= scale;

	var x, y;
	if (typeof align != 'undefined') {
		switch (align) {
			// down-right
			default:
			case 0 : 
				x = screenWidth  - imageWidth;
				y = screenHeight - imageHeight;
				objectSetPosition(weaponId, x, y);
				break;
				
			// down-center
			case 1 : 
				x = (screenWidth / 2) - (imageWidth / 2);
				y = screenHeight - imageHeight;
				objectSetPosition(weaponId, x, y);
				break;
				
			// down-left
			case 2 : 
				x = 0;
				y = screenHeight - imageHeight;
				objectSetPosition(weaponId, x, y);
				break;
				
			// up-right
			case 3 : 
				x = screenWidth  - imageWidth;
				y = 0;
				objectSetPosition(weaponId, x, y);
				break;
				
			// up-center
			case 4 : 
				x = (screenWidth / 2) - (imageWidth / 2);
				y = 0;
				objectSetPosition(weaponId, x, y);
				break;
				
			// up-left
			case 5 : 
				x = 0;
				y = 0;
				objectSetPosition(weaponId, x, y);
				break;
		}
	}
	
	start = new Vector2f(x, y);
	end = new Vector2f(start.x + 25, start.y + 50);
	dir = (end.sub(start)).normalize();
	
	animSpeed = objectGetVar(weaponId, "animationSpeed");
	animDelay = 0.0;
	isAnimPlay = false;
	
	frame = 0;
	fireFrame = objectGetVar(weaponId, "fireFrame");
	maxFrame = objectGetFramesCount(weaponId) - 1;
	objectSetFrame(weaponId, frame);
	
	onUp = true;
}


/**
 *  Update event
 */
this.onUpdate = function() {
	/* movement */
	pos = new Vector2f(objectGetPosition(weaponId));
	if (Player.isMoving) {
		if (Level.deltaTime > 0.0) {
			var moveSpeed = Level.deltaTime * 100.0;
			var moveDir = dir.mul(moveSpeed);

			if (onUp) {
				if (distanceBetweenVectors(pos, end) >= moveSpeed)
					pos = pos.add(moveDir);
				else 
					onUp = false;
			}
			else {
				if (distanceBetweenVectors(pos, start) >= moveSpeed) 
					pos = pos.sub(moveDir);
				else
					onUp = true;
			}
		}
	}
	else
		pos = start;
	objectSetPosition(weaponId, pos.x, pos.y);
	
	/* shooting */
	if (Mouse.isEventAvailable()) {
		if (!isAnimPlay && Mouse.isButtonPressed(VK_LBUTTON)) {
			isAnimPlay = true;
		}
	}
	
	/* update animation */
	if (isAnimPlay && Level.deltaTime > 0.0) {
		if (animDelay < 1.0)
			animDelay += animSpeed * Level.deltaTime;
		else {
			animDelay -= 1.0;
			frame++;
			
			/* when it shoots */
			if (frame == fireFrame) {
				print('BOOM!');
				
				var camera_pos = new Vector3f(objectGetPosition(Camera.id));
				/* start point of ray */
				var ray_s = new Vector3f(cameraGetTarget());
				/* direction of ray */
				var ray_d = new Vector3f(ray_s.x - camera_pos.x, ray_s.y - camera_pos.y, ray_s.z - camera_pos.z);
				ray_d = ray_d.normalize();
					
				/* end point of ray */
				var ray_e = new Vector3f(ray_d.x * distanceOfAttack, ray_d.y * distanceOfAttack, ray_d.z * distanceOfAttack);
				ray_e = ray_e.add(camera_pos);

				/* offset for start point of shoot */
				ray_s = ray_s.sub(ray_d.mul(0.6));
				
				var objectId = objectGetByRay(ray_s.x, ray_s.y, ray_s.z, ray_e.x, ray_e.y, ray_e.z);
				if (objectId != 0) {
					var health = objectGetVar(objectId, "health");
					if (health > 0) {
						health -= damage;
						objectSetVar(objectId, "health", health);
					}
				}
			}
			
			/* stop animation */
			if (frame > maxFrame) {
				frame = 0;
				animDelay = 0.0;
				isAnimPlay = false;
			}
			
			objectSetFrame(weaponId, frame);
		}
	}
}


/**
 *  Destroy
 */
this.onDestroy = function() {
}
