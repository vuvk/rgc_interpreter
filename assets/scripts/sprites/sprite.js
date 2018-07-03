
var spriteId;
var name;

var pos;

var health;
var destroyable;

var animSpeed, animDelay;
var frame, maxFrame;
var isAnimPlay;

/**
 *  Initialization of object
 */
this.onInit = function() {	
	spriteId = objectGetId();
	name = objectGetVar(spriteId, "name");
	
	pos = new Vector2f(objectGetPosition(spriteId));
	
	health = objectGetVar(spriteId, "health");
	destroyable = objectGetVar(spriteId, "destroyable");
	
	animSpeed = objectGetVar(spriteId, "animationSpeed");
	animDelay = 0.0;
	isAnimPlay = false;
	
	frame = 0;
	maxFrame = objectGetFramesCount(spriteId) - 1;
	objectSetFrame(spriteId, frame);	
}


/**
 *  Update event
 */
this.onUpdate = function() {	
	/* update animation */
	if (animSpeed == 0.0)
		return;
	
	if (destroyable) {
		health = objectGetVar(spriteId, "health");
		if (health <= 0.0)
			isAnimPlay = true;
	
		if (isAnimPlay && Level.deltaTime > 0.0) {
			if (animDelay < 1.0) 
				animDelay += Level.deltaTime * animSpeed;
			else {
				animDelay -= 1.0;
				++frame;

				/* stop animation. Now object is "destroyed" */
				if (frame >= maxFrame) {
					frame = maxFrame;
					destroyable = false;
					isAnimPlay = false;
					animSpeed = 0.0;
					animDelay = 0.0;
					
					objectSetVar(spriteId, "destroyable",    destroyable);
					objectSetVar(spriteId, "animationSpeed", animSpeed  );
					objectDisableCollision(spriteId);
				}
				
				objectSetFrame(spriteId, frame);
			}
		}
	}
	/* loop animation */
	else {
		if (Level.deltaTime > 0.0) {
			if (animDelay < 1.0)
				animDelay += Level.deltaTime * animSpeed;
			else {
				animDelay -= 1.0;
				++frame;

				if (frame > maxFrame) 
					frame = 0;
				
				objectSetFrame(spriteId, frame);
			}
		}
	}
}


/**
 *  Destroy
 */
this.onDestroy = function() {
}
