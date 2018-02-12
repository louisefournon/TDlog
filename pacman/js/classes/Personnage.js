var DIRECTION = {
	"BAS"    : 1,
	"GAUCHE" : 2,
	"DROITE" : 0,
	"HAUT"   : 3
};
var DIRECTIONOPP = [2, 3, 0, 1];

var ETAT = {
    "Normal"  : 0,
    "Panique" : 1,
    "MDMA"    : 2,
    "Mort"    : 3,
    "Aware"   : 4
}

var DUREE_ANIMATION = 4;
/*var DUREE_DEPLACEMENT = 10;*/

var case_inaccessible = [4,5,6,7,8,9,10,14,15,16,17,24,25,26,27];
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Personnage(url, x, y, direction, vitesse, bool) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
    this.DUREE_DEPLACEMENT=vitesse;
    this.pac=bool;
    this.etat = ETAT.Normal;
    this.compteuretat=0;
    this.score = 0;
    this.vies = 3;
	this.etatAnimation = -1;
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function(){
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / 14;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
	this.image.src = "sprites/" + url;
}

//Fonction d'affichage
Personnage.prototype.dessinerPersonnage = function(context, i) {
	var frame = 0; // Numéro de l'image à prendre pour l'animation
	var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
	if(this.etatAnimation >= this.DUREE_DEPLACEMENT) {
		// Si le déplacement a atteint ou dépassé le temps nécéssaire pour s'effectuer, on le termine
		this.etatAnimation = -1;
	} else if(this.etatAnimation >= 0) {
		// On calcule l'image (frame) de l'animation à afficher
		frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		if(frame > 1) {
			frame %= 2;
		}
		
		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = 24 - (24 * (this.etatAnimation / this.DUREE_DEPLACEMENT));
		
		// À partir de ce nombre, on définit le décalage en x et y.
		if(this.direction == DIRECTION.HAUT) {
			decalageY = pixelsAParcourir;
		} else if(this.direction == DIRECTION.BAS) {
			decalageY = -pixelsAParcourir;
		} else if(this.direction == DIRECTION.GAUCHE) {
			decalageX = pixelsAParcourir;
		} else if(this.direction == DIRECTION.DROITE) {
			decalageX = -pixelsAParcourir;
		}
		
		// On incrémente d'une frame
		this.etatAnimation++;
	}
	/*
	 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
	 * donc il nous suffit de garder les valeurs 0 pour les variables 
	 * frame, decalageX et decalageY
	 */
	if (this.etat==0 || this.etat == 2 || this.etat == 4){
        context.drawImage(
		this.image, 
		this.largeur * (2*i+frame), this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
		// Point de destination (dépend de la taille du personnage)
		(this.x * 24) - (this.largeur / 3) + 16 + decalageX, (this.y * 24) - 2*this.hauteur/3 + 24 + decalageY,
		this.largeur*2/3, this.hauteur*2/3 // Taille du rectangle destination (c'est la taille du personnage)
        );
    }
	//Dessin des fantômes dans l'état de panique
    if (this.etat==1){
        context.drawImage(
		this.image, 
		this.largeur * (12+frame), frame*this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
		// Point de destination (dépend de la taille du personnage)
		(this.x * 24) - (this.largeur / 3) + 16 + decalageX, (this.y * 24) - this.hauteur*2/3 + 24 + decalageY,
		this.largeur*2/3, this.hauteur*2/3 // Taille du rectangle destination (c'est la taille du personnage)
        );
    }
	//Dessin des personnages lorsque morts
    if (this.etat == 3){
        context.drawImage(
		this.image, 
		this.largeur * (12+frame),2* this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
		// Point de destination (dépend de la taille du personnage)
		(this.x * 24) - (this.largeur / 3) + 16 + decalageX, (this.y * 24) - this.hauteur*2/3 + 24 + decalageY,
		this.largeur*2/3, this.hauteur*2/3 // Taille du rectangle destination (c'est la taille du personnage)
        );
    }
	
}

Personnage.prototype.getCoordonneesAdjacentes = function(direction) {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.BAS : 
			coord.y++;
			break;
		case DIRECTION.GAUCHE : 
			coord.x--;
			break;
		case DIRECTION.DROITE : 
			coord.x++;
			break;
		case DIRECTION.HAUT : 
			coord.y--;
			break;
	}
	return coord;
}

//Déplacement de pacman
Personnage.prototype.deplacer = function(direction, map) {
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}

	// On change la direction du personnage
	this.direction = direction;
    
	// On vérifie que la case demandée est bien située dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);
    var prochaineTile = map.terrain[prochaineCase.y][prochaineCase.x];
    for (var i=0; i<case_inaccessible.length;i++){
        if (prochaineTile == case_inaccessible[i]){
            return false;
        }
    }
     if(prochaineCase.x<0 && prochaineCase.y == 12 ){
        prochaineCase.x=map.getLargeur()-1;
    }
    if(prochaineCase.x>=map.getLargeur()&& prochaineCase.y ==12){
        prochaineCase.x=0;
    }
	for(var i = 0, l = map.personnages.length ; i < l ; i++) {
		if (this.collision(map.personnages[i])){
            return false;
        }
	}
	// On commence l'animation
	this.etatAnimation = 1;
		
	// On effectue le déplacement
    this.mdma(map);
	this.x = prochaineCase.x;
	this.y = prochaineCase.y;
	
    
	return true;
}

//Déplacement des fantômes
Personnage.prototype.deplacerauto = function(map) {
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}
    
    if (this.etat==ETAT.Aware){
        this.direction = this.getTarget(map.personnages[map.personnages.length-1],map.terrain_accessible);
        var prochaineCase = this.getCoordonneesAdjacentes(direction);
        this.etatAnimation = 1;
        this.x = prochaineCase.x;
        this.y = prochaineCase.y;
        return true;
    }
    
    
    var bool = true;
    
    if(this.x>=10 && this.x <= 16 && this.y >= 10 && this.y <= 13){
        var direction = DIRECTION.HAUT;
        var prochaineCase = this.getCoordonneesAdjacentes(direction);
        bool=false;
    }
    while(bool){
        var direction = entierAleatoire(0,3);
        var prochaineCase = this.getCoordonneesAdjacentes(direction);
        var prochaineTile = map.terrain[prochaineCase.y][prochaineCase.x];
        if(direction != DIRECTIONOPP[this.direction]){
            bool = false;
        }   
        if (!bool){
            for (var i=0; i<case_inaccessible.length;i++){
                if (prochaineTile == case_inaccessible[i]){
                    return false;
                }
            }
        }
    }
	// On change la direction du personnage
	this.direction = direction;
	// On vérifie que la case demandée est bien située dans la carte
    if(prochaineCase.x<0 && prochaineCase.y == 12){
        prochaineCase.x=map.getLargeur()-1;
    }
    if(prochaineCase.x>=map.getLargeur()&& prochaineCase.y ==12){
        prochaineCase.x=0;
    }
    
	if (this.collision(map.personnages[map.personnages.length-1])){
        return false;
    }
	// On commence l'animation
	this.etatAnimation = 1;
		
	// On effectue le déplacement
	this.x = prochaineCase.x;
	this.y = prochaineCase.y
    
	return true;
}

//Gestion des collisions entre pacman et les fantomes
Personnage.prototype.collision = function(perso1){
    var prochaineCase = this.getCoordonneesAdjacentes(this.direction);
    if (this.image.referenceDuPerso != perso1.image.referenceDuPerso && prochaineCase.x==perso1.x && prochaineCase.y==perso1.y){
        if(this.etat==ETAT.MDMA){
            perso1.etat=ETAT.Mort;
            this.score +=200;
        }     
        if(this.etat==ETAT.Panique){
            this.etat=ETAT.Mort;
            perso1.score +=200;
        }     
        if(this.pac && this.etat==ETAT.Normal){
            this.etat=ETAT.Mort;
            this.vies -=1;
        }
        if(perso1.pac && perso1.etat==ETAT.Normal){
            perso1.etat=ETAT.Mort;
            perso1.vies -=1;
        }
        if(perso1.etat==ETAT.Mort || this.etat==ETAT.Mort){
            return false;
        }
        return true;
    }
    return false;
}

//Gestion des pilules
Personnage.prototype.mdma = function(map){
 /*   var prochaineCase=this.getCoordonneesAdjacentes(this.direction);*/
    if (map.terrain[this.y][this.x]==30 && (this.etat==0 || this.etat==2)){
        map.terrain[this.y][this.x] = 19;
        this.score += 10;
        map.nbpilules-=1;
    }
    if (map.terrain[this.y][this.x]== 28 && (this.etat==0 || this.etat==2)){
        map.terrain[this.y][this.x] = 19;
        this.score += 50;
        map.nbpilules-=1;
        this.etat= ETAT.MDMA;
        map.personnages[0].etat=ETAT.Panique;
        map.personnages[1].etat=ETAT.Panique;
        map.personnages[2].etat=ETAT.Panique;
        map.personnages[3].etat=ETAT.Panique;
        map.personnages[4].etat=ETAT.Panique;
    }
}

Personnage.prototype.retour_normal=function(){
    if(this.etat!=0){
        this.compteuretat++;
        if(this.compteuretat>300){
            this.etat=ETAT.Normal;
            this.compteuretat = 0;
        }
    }
}

//Indicateur de game over
Personnage.prototype.verifMort = function(){
    return (this.etat == ETAT.Mort && this.vies==0);
}

//Fonction qui active l'état aware des fantomes. On considère qu'il  est activé si le fantome voit pacman; ie bonne ligne et bonne direction; et qu'on est epsilon proche
/*Personnage.prototype.awareness = function(pacman,epsilon){
    if(this.x==pacman.x && Math.abs(this.y-pacman.y)<epsilon){
        this.etat=ETAT.Aware;
    }
    if(this.y==pacman.y && Math.abs(this.x-pacman.x)<epsilon){
        this.etat=ETAT.Aware;
    }
    if (this.etat==ETAT.Aware && (Math.abs(this.x-pacman.x)>epsilon || Math.abs(this.y-pacman.y)>epsilon)){
        this.etat=ETAT.Normal;
    }
    return true;
}*/

//Distance, en norme 1, entre un fantôme et pacman
Personnage.prototype.distance = function(target, direction){
    var prochaineCase=this.getCoordonneesAdjacentes(direction);
    return Math.abs(prochaineCase.x - target.x) + Math.abs(prochaineCase.y - target.y);
}

/*Personnage.prototype.getTarget = function(target,terrain_accessible){
    var min = 100000;
    var x;
    var direction;
    if (terrain_accessible[this.x+1][this.y]==1){
        x = this.distance(target,DIRECTION.DROITE);
        if (x<min){
            min = x;
            direction = DIRECTION.DROITE;
        }
    }
    if (terrain_accessible[this.x][this.y+1]==1){
        x = this.distance(target,DIRECTION.BAS);
        if (x<min){
            min = x;
            direction = DIRECTION.BAS;
        }
    }
    if (terrain_accessible[this.x-1][this.y]==1){
        x = this.distance(target,DIRECTION.GAUCHE);
        if (x<min){
            min = x;
            direction = DIRECTION.GAUCHE;            
        }
    }
    if (terrain_accessible[this.x][this.y-1]==1){
        x = this.distance(target,DIRECTION.HAUT);
        if (x<min){
            min = x;
            direction = DIRECTION.HAUT;
        }
    }
    return direction;
}*/
