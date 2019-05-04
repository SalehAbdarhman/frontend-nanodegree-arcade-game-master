//intial information for the canvas
let numColums = 5 ;
let Start = 1 ;
let End =3 ;
let NumberOfEnemy = 4;
function getRows(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandoms(min, max) {
  return Math.random() * (max - min) + min;
}

// Enemies our player must avoid
let Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.setStartPositions();
};

Enemy.prototype.setStartPositions = function() {
    this.x = -1;
    this.y = getRows(Start,
    End)
    this.speed = getRandoms(1, 2);
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < numColums) {
        this.x += dt * this.speed;
    }
    else {
        this.setStartPositions();
    }

// when player tocuch the enemy 
	if(this.y == player.y && player.x == Math.floor(this.x)) {
		player.x = 2;
        player.y = 5;

	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(
		Resources.get(this.sprite),
		this.x * 101,
		this.y * 83 + (-18)
	);
};

let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2;
    this.y = 5;
    this.location = {x: 0, y: 0};

};

Player.prototype.moveLeft = function() {
    if (this.x > 0) {
        this.location.x = -1;
        this.location.y = 0;
    }
};

Player.prototype.moveRight = function() {
    if (this.x < 4) {
        this.location.x = 1;
        this.location.y = 0;
    }
};

Player.prototype.moveUp = function() {
    if (this.y > 0) {
        this.location.y = -1;
        this.location.x = 0;
    }
};

Player.prototype.moveDown = function() {
    if (this.y < 5) {
        this.location.y = 1;
        this.location.x = 0;
    }
};

Player.prototype.update = function() {
 
   this.x += this.location.x;
    this.y += this.location.y;
    this.location.x = 0;
    this.location.y = 0;
    if (this.y === 0) {
        
        this.x = 2;
        this.y = 5;

    }
	
	
	
};
// draws Player on canvas and prints/deletes You Win as needed
Player.prototype.render = function() {
   
    ctx.drawImage(Resources.get(this.sprite), this.x * 101,
    this.y * 83 + (-30));
    
};

Player.prototype.handleInput = function(direction) {
    

		
	if (direction == 'left') {
 
		this.moveLeft();
    }
     if (direction == 'right') {

		this.moveRight();
    }
     if (direction == 'up') {

		this.moveUp();
    }
    if (direction == 'down'){
		this.moveDown();
		
    }
	
	
	//console.log("("+this.x+" , "+this.y+")");
};

// Place all enemy objects in an array called allEnemies
let allEnemies = [];

let pushEnemies = function() {

	for  (i=0 ; i < NumberOfEnemy ; i++) {
		allEnemies.push(new Enemy());
	
	};
}

pushEnemies();

// Place the player object in a letiable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
