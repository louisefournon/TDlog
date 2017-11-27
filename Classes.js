

// Objet Pacman

var pacman = {

    // Propriétés
	dimension: 10,
	score: 0,
	x: 0,
	y: 0,
	speed: 10,
	lives: 3,
	state: 0, // état 0 on est mangé, état 1 on mange (normalement pacman est mangé)

// Méthodes
	move: function(direction){
	    if (direction == "right" and grille[pacman.x+1][pacman.y] != -1)
		    pacman.x += 1; 
	    if (direction == "left" and grille[pacman.x-1][pacman.y] != -1)
		    pacman.x += -1;
	    if (direction == "up" and grille[pacman.x][pacman.y-1] != -1)
		    pacman.y += -1;
	    if (direction == "down" and grille[pacman.x][pacman.y+1] != -1)
		    pacman.y += 1;    
   	}
	
   	interract: fonction(){
		if (grille[pacman.x][pacman.y] == 1){ // i.e. pilule normale
			pacman.score += 1;
			grille[pacman.x][pacman.y] = 0;
		}
		else if (grille[pacman.x][pacman.y] == 10){ // i.e. super pilule
			pacman.score += 1;
			pacman.state = 1;
			ghost1.getEatable();
			ghost2.getEatable();
			ghost2.getEatable();
			ghost2.getEatable();
			grille[pacman.x][pacman.y] = 0;
		}
    	}
    	transform: function(){}

    	drawPacman: fonction(){}
    	getPosition: function(){
    		return pacman.position;
    	}
    	eatGhost: function(){}
    	getEaten: function(){}

};

// Objets Fantômes

var Ghost = {
	
	// Propriétés
	dimensions: 10,
	couleur: blue,
	speed: 10,
	position: [0,0],
	state: 1,
	target: [0,0],
 
 	//Méthodes
 	moveghost: function(){} // Différent selon l'état du fantôme (fuit pacman ou le suit)
 	getEatable: function(){
		Ghost.state = 0;
		Ghost.color = white;
	}
 	getEaten: function(){}
 	actualizeTarget: function(){}

}


var ghost1 = Object.create(Ghost);
ghost1.color = blue;
ghost1.position = [1,1]

var ghost1 = Object.create(Ghost);
ghost1.color = red;
ghost1.position = [lab.w - 1,1]

var ghost1 = Object.create(Ghost);
ghost1.color = yellow;
ghost1.position = [lab.w-1,lab.h-1]

var ghost1 = Object.create(Ghost);
ghost1.color = green;
ghost1.position = [1,lab.h-1]

// Objet Labyrinthe

var scale = 10;

var lab = {

	//Propriétés
	l: 500,
	w: 500,
	h: 12,
	map: 

	//Méthodes
	show: function(){}

}


// Création de la matrice des murs du labyrinthe 

// -1 pour une case "mur"
// 0 pour une case "vide"
// 1 pour une case "pilule normale"
// 10 pour une case "super pilule"

var grille = new Array();

for(var i=0; i<lab.h; i++)
   grille[i] = new Array();

for(var i=0; i<lab.h; i++)
   for(var j=0; j<lab.w; j++)
      grille[i][j] = 0;

// Echange avec l'utilisateur: keyCode 
//Pour récupérer keycode:
document.onkeydown = applyKey;

function applyKey (_event_){
	var intKeyCode = checkEventObj(_event_).keyCode;
	if ( intKeyCode == KEY_RIGHT ){
			pacman.move("right")
	}
	else if(intKeyCode==KEY_UP){
		pacman.move("up")
	}
	else if(intKeyCode==Key_DOWN){
		pacman.move("down")
	}
	else if(intKeyCode==KEY_LEFT){
		pacman.move("left")
	}
}
var KEY_DOWN	= 40;
var KEY_UP	= 38;
var KEY_LEFT	= 37;
var KEY_RIGHT	= 39;

