// Objet Pacman

var pacman = {

    //Initialisation
    init: function (dimension, score, x, y, speed) {
        //Taille du PacMan
        this.dimension = dimension;
        // Score accumulé au fur et à mesure du jeu
        this.score = score;
        //Coordonnées cartésiennes de base de PacMan
        this.x = x;
        this.y = y;
        //Vitesse (unité arbitraire pour l'instant) de déplacement
        this.speed = speed;
        //nombre de vies de base
        this.lives = 3;
        // état 0 on est mangé, état 1 on mange (normalement pacman est mangé)
        this.state = 0;
    },
    // Méthodes
    
    //Vérifie que PacMan peut avancer sur une case qui n'est pas prise par la grille de jeu
    move: function (direction, grille) {
        if (direction === "right" && grille[pacman.x + 1][pacman.y] !== -1) {pacman.x += 1; }
        if (direction === "left" && grille[pacman.x - 1][pacman.y] !== -1) {pacman.x += -1; }
        if (direction === "up" && grille[pacman.x][pacman.y - 1] !== -1) {pacman.y += -1; }
        if (direction === "down" && grille[pacman.x][pacman.y + 1] !== -1) {pacman.y += 1; }
    },
	
    interract: function (grille, ghost1, ghost2, ghost3, ghost4) {
        //Mange une pilule 
		if (grille[pacman.x][pacman.y] === 1) {
			pacman.score += 1;
			grille[pacman.x][pacman.y] = 0;
		}
        //Mange une super pilule, change son état
        else if (grille[pacman.x][pacman.y] === 10) { 
			pacman.score += 1;
			pacman.state = 1;
			ghost1.getEatable();
			ghost2.getEatable();
			ghost3.getEatable();
			ghost4.getEatable();
			grille[pacman.x][pacman.y] = 0;
		}
    },
    transform: function(){},

	drawPacman: function(){},
	getPosition: function(){
        return pacman.position;
    },
	eatGhost: function(){},
	getEaten: function(){}

};

// Objets Fantômes

// Fonction qui renvoie un entier aléatoire entre min et max
function aleatoire(min, max) {
	return (Math.floor((max-min)*Math.random())+min);
}

var Ghost = {
	
    //Initialisation
    init: function (dimension, couleur, speed, x, y) {
        //Taille du fantome
        this.dimensions = dimension;
        //Couleur du fantome
        this.couleur = couleur;
        //Vitesse (en unité arbitraire) de déplacement
        this.speed = speed;
        //Coordonnées cartésiennes du fantome
        this.x = x;
        this.y = y;
        //état de base égale à 1 (poursuit PacMan); égal à 0 quand PacMan mange une super pilule
        this.state = 1;
        this.target = [0,0];
    },

    //Méthodes
    
    //Déplacement autonome du fantome, poursuit ou fuit PacMan selon son état
    //Déplacement autonome du fantome, poursuit ou fuit PacMan selon son état
    moveghost: function (){
        var d = [];
        if (grille[Ghost.x + 1][Ghost.y] !== -1){
            d.push([Ghost.x + 1, Ghost.y]);
        }
        if (grille[Ghost.x - 1][Ghost.y] !== -1){
            d.push([Ghost.x - 1, Ghost.y]);
        }
        if (grille[Ghost.x][Ghost.y + 1] !== -1){
            d.push([Ghost.x, Ghost.y + 1]);
        }
        if (grille[Ghost.x][Ghost.y - 1] !== -1){
            d.push([Ghost.x, Ghost.y - 1]);
        }
        var c = aleatoire(0, d.length);
        Ghost.x = d[c][0];
        Ghost.y = d[c][1];
    },
    //Changement d'état quand PacMan mange une pilule
    getEatable: function () {
		Ghost.state = 0;
		Ghost.color = "white"; 
	},
    getEaten: function(){},
    actualizeTarget: function(){}

};

var lab = {
    //Initialise le labyrinthe
	init: function(length,width,height,map){
        	this.length = length;
        	this.width = width;
        	this.height = height;
        	this.map = map;
    },
    //Affiche le labyrinthe
	show: function(){}
};
