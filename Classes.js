

// Objet Pacman

var pacman = {

    // Propriétés
	dimension: 10,
	score: 0,
	position: [0, 0],
	speed: 10,
	lives: 3,
	state: 0,

// Méthodes

    movePacman: function(direction){
	    if (direction == "right" and grille[pacman.position[0]+1][pacman.position[1]] != -1)
		    pacman.position[0] += 1; 
	    if (direction == "left" and grille[pacman.position[0]-1][pacman.position[1]] != -1)
		    pacman.position[0] += -1;
	    if (direction == "up" and grille[pacman.position[0]][pacman.position[1]-1] != -1)
		    pacman.position[1] += -1;
	    if (direction == "down" and grille[pacman.position[0]][pacman.position[1]+1] != -1)
		    pacman.position[1] += 1;    
    }
	
    transform: function(){}
    drawPacman: fonction(){}
    getPosition: function(){
    	return pacman.position;
    }
    eatGhost: function(){}
    getEaten: function(){}

};


/ On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (exclue).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

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
 	moveGhost: function(){
	
	}
 	getEatable: function(){}
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
	pillGetEaten: function(){}

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
var KEY_DOWN	= 40;
var KEY_UP	= 38;
var KEY_LEFT	= 37;
var KEY_RIGHT	= 39;

document.onkeydown = applyKey;

function applyKey (_event_){
	var intKeyCode = checkEventObj(_event_).keyCode;
	if ( intKeyCode == KEY_RIGHT ){
			pacman.movePacman("right")
	}
	else if(intKeyCode==KEY_UP){
		pacman.movePacman("up")
	}
	else if(intKeyCode==Key_DOWN){
		pacman.movePacman("down")
	}
	else if(intKeyCode==KEY_LEFT){
		pacman.movePacman("left")
	}
}


