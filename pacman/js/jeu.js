var map = new Map("deuxieme");
var map_mort = new Map("premiere");

var ghost = new Personnage("fantome&pacman.png", 12, 12, DIRECTION.HAUT, 11, false);
var ghost1 = new Personnage("fantome&pacman.png", 13, 12 , DIRECTION.HAUT, 15, false);
var ghost2 = new Personnage("fantome&pacman.png", 14, 12, DIRECTION.HAUT, 14, false);
var ghost3 = new Personnage("fantome&pacman.png", 12 ,13 , DIRECTION.HAUT, 14, false);
var ghost4 = new Personnage("fantome&pacman.png", 14, 13, DIRECTION.HAUT, 14, false);
var pacman = new Personnage("fantome&pacman.png", 13, 19, DIRECTION.HAUT, 10, true);
map.addPersonnage(ghost);
map.addPersonnage(ghost1);
map.addPersonnage(ghost2);
map.addPersonnage(ghost3);
map.addPersonnage(ghost4);
map.addPersonnage(pacman);


window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur() * 24;
	canvas.height = map.getHauteur() * 24;
    
    
    /*Ecran du score*/
    var score = document.getElementById('score');
	var ctx2 = score.getContext('2d');
    function IncreaseScore(){
        ctx2.fillStyle = "black";
        ctx2.fillRect(0,0,score.width,score.height);
        ctx2.font = "bold 30px Comics";
        ctx2.fillStyle = "yellow";
        ctx2.fillText("SCORE",score.width/5,score.height/2);
        ctx2.fillText("VIES", score.width/5, score.height/3);
        ctx2.font = "bold 25px Comics";
        ctx2.fillText(pacman.score,score.width/3,score.height/2 + 60);
        ctx2.fillText(pacman.vies, score.width/3, score.height/3+60);       
    }
    IncreaseScore();
    
    /*Ecran de démarrage*/
	
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "bold 50px Comics";
    ctx.fillStyle = "yellow";
    ctx.fillText("Pac-Man",canvas.width/3 - 15,canvas.height/2);
    ctx.font = "30px Comics";
    ctx.fillText("Press a key to start the game",canvas.width/5,canvas.height/2 +80);
    
    var deb=0;
    /*Jeu Principal*/
    window.onkeypress = function(){
    var game = setInterval(function(){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        map.dessinerMap(ctx);
        ghost.deplacerauto(map);
        ghost.retour_normal();
        //ghost.awareness(pacman,5);
        if(deb>75){
            ghost1.deplacerauto(map);
            ghost1.retour_normal();
            //ghost1.awareness(pacman,5);
        }
        if(deb>150){
            ghost2.deplacerauto(map);
            ghost2.retour_normal();
            //ghost2.awareness(pacman,5);
        }
        if(deb>225){
            ghost3.deplacerauto(map);
            ghost3.retour_normal();
            //ghost3.awareness(pacman,5);
        }
        if(deb>300){
            ghost4.deplacerauto(map);
            ghost4.retour_normal();
            //ghost4.awareness(pacman,5);
        }
        pacman.retour_normal();
        IncreaseScore();
        stop();
        deb+=1;
    },30);
    
    function stop(){
        if(pacman.verifMort()){
            clearInterval(game);
            ctx.fillRect(0,0,canvas.width,canvas.height);
            map_mort.dessinerMap(ctx);
            pacman.dessinerPersonnage(ctx,5);
            ctx.fillStyle = "red";
            ctx.font = "bold 60px Comics";
            ctx.fillText("GAME OVER",canvas.width/4 - 15,canvas.height/2 + 20);
        }
        if(map.nbpilules==0){
            clearInterval(game);
            ctx.fillRect(0,0,canvas.width,canvas.height);
            map_mort.dessinerMap(ctx);
            pacman.dessinerPersonnage(ctx,5);
            ctx.fillStyle = "green";
            ctx.font = "bold 60px Comics";
            ctx.fillText("Congrats !! You win !",30,canvas.height/2 + 20);
        }
    }
	
	// Gestion du clavier
	window.onkeydown = function(event) {
		// On récupère le code de la touche
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				pacman.deplacer(DIRECTION.HAUT, map);
				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				pacman.deplacer(DIRECTION.BAS, map);
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				pacman.deplacer(DIRECTION.GAUCHE, map);
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				pacman.deplacer(DIRECTION.DROITE, map);
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		return false;
	}
    }
}
