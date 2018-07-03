function Vector2f(x, y) {
	this.x = 0;
	this.y = 0;
	
	switch (arguments.length)
	{
		case 1 : 			// create from array
			if (typeof x != 'undefined' && x.length >= 2) {
				this.x = x[0];
				this.y = x[1];
			}
			break;
			
		case 2 : 			// create from coords
			this.x = x;
			this.y = y;
			break;
	}
		
	this.add = function(vec2) {
		return new Vector2f(this.x + vec2.x, 
		                    this.y + vec2.y);
	}
	
	this.sub = function(vec2) {
		return new Vector2f(this.x - vec2.x, 
		                    this.y - vec2.y);
	}
	
	this.mul = function(value) {
		return new Vector2f(this.x * value, 
		                    this.y * value);
	}
	
	this.div = function(value) {
		var inv = 1.0 / value;
		return new Vector2f(this.x * inv, 
		                    this.y * inv);
	}
	
	this.length = function() {
		return Math.sqrt(this.x * this.x + 
		                 this.y * this.y);
	}
	
	this.normalize = function() {
		var len = this.length();
		return this.div(len);
	}
	
	this.dot = function(vec2) {
		return (this.x * vec2.x + 
		        this.y * vec2.y);
	}
}


function Vector3f(x, y, z) {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	switch (arguments.length)
	{
		case 1 : 			// create from array
			if (typeof x != 'undefined' && x.length >= 3) {
				this.x = x[0];
				this.y = x[1];
				this.z = x[2];
			}
			break;
			
		case 3 : 
			this.z = z;
		case 2 : 			// create from coords
			this.x = x;
			this.y = y;
			break;
	}
	
	this.add = function(vec3) {
		return new Vector3f(this.x + vec3.x, 
		                    this.y + vec3.y,
				    this.z + vec3.z);
	}
	
	this.sub = function(vec3) {
		return new Vector3f(this.x - vec3.x, 
		                    this.y - vec3.y, 
				    this.z - vec3.z);
	}
	
	this.mul = function(value) {
		return new Vector3f(this.x * value, 
		                    this.y * value, 
							this.z * value);
	}
	
	this.div = function(value) {
		var inv = 1.0 / value;
		return new Vector3f(this.x * inv, 
		                    this.y * inv, 
							this.z * inv);
	}
	
	this.length = function() {
		return Math.sqrt(this.x * this.x + 
		                 this.y * this.y + 
						 this.z * this.z);
	}
	
	this.normalize = function() {
		var len = this.length();
		return this.div(len);
	}
	
	this.dot = function(vec3) {
		return (this.x * vec3.x + 
		        this.y * vec3.y + 
				this.z * vec3.z);
	}
	
	this.cross = function(vec3) {
		return new Vector3f(this.y * vec3.z - this.z * vec3.y,
				    this.z * vec3.x - this.x * vec3.z, 
				    this.x * vec3.y - this.y * vec3.x);
	}
}


function distanceBetweenVectors(vec1, vec2) {	
	if ((vec1 instanceof(Vector2f)) && (vec2 instanceof(Vector2f)))
		return distanceBetweenPoints(vec1.x, vec1.y, vec2.x, vec2.y);
	else
		if ((vec1 instanceof(Vector3f)) && (vec2 instanceof(Vector3f)))
			return distanceBetweenPoints(vec1.x, vec1.y, vec1.z, vec2.x, vec2.y, vec2.z);
		else {
			if (typeof(vec1) == 'undefined' || typeof(vec2) == 'undefined')
				print('undefined value!');
			
			return Number.MAX_VALUE;
		}
}