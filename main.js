var ghost1 = Object.create(Ghost);
ghost1.init(5,"red",10,1,1);

var ghost2 = Object.create(Ghost);
ghost2.init(5,"pink",10,1,1);

var ghost3 = Object.create(Ghost);
ghost3.init(5,"green",10,1,1);

var ghost4 = Object.create(Ghost);
ghost4.init(5,"yellow",10,1,1);

// Objet Labyrinthe
//var scale = 10;

// Création de la matrice des murs du labyrinthe 

// -1 pour une case "mur"
// 0 pour une case "vide"
// 1 pour une case "pilule normale"
// 10 pour une case "super pilule"

// Fonction qui renvoie un entier aléatoire entre min et max
function aleatoire(min, max) {
	return (Math.floor((max-min)*Math.random())+min);
}

// Echange avec l'utilisateur: keyCode 
//Pour récupérer keycode:
document.onkeydown = applyKey;

function applyKey (_event_){
    var intKeyCode = checkEventObj(_event_).keyCode;
	if (intKeyCode == KEY_RIGHT ){
			pacman.move("right");
	}
	else if(intKeyCode==KEY_UP){
		pacman.move("up");
	}
	else if(intKeyCode==Key_DOWN){
		pacman.move("down");
	}
	else if(intKeyCode==KEY_LEFT){
		pacman.move("left");
	}
}
var KEY_DOWN = 40;
var KEY_UP = 38;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
