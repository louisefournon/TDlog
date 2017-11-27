


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

    move: function(clavier) {}
    transform: function(){}
    getPosition: function(){}
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
 	move: function(){}
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

var grille = new Array();

for(var i=0; i<lab.h; i++)
   grille[i] = new Array();

for(var i=0; i<lab.h; i++)
   for(var j=0; j<lab.w; j++)
      grille[i][j] = 0;




