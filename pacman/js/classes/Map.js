var case_inaccessible = [4,5,6,7,8,9,10,14,15,16,17,24,25,26,27];

function Map(nom) {
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();
		
	// Chargement du fichier
	xhr.open("GET", './maps/' + nom + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	// Analyse des données
	var mapData = JSON.parse(mapJsonData);
    this.nbpilules=0;
	this.tileset = new Tileset(mapData.tileset);
	this.terrain = mapData.terrain;
	this.terrain_accessible=new Array();
    for (var i = 0, l = this.terrain.length ; i < l ; i++){
        this.terrain_accessible.push([]);
        for (var j = 0, k = this.terrain[0].length ; j < k ; j++){
            if (this.terrain[i][j]==30 || this.terrain[i][j]==28){
                this.nbpilules+=1;
            }
            for (l = 0; l<case_inaccessible.length;l++){
                if (this.terrain[i][j]==case_inaccessible[l]) {
                    this.terrain_accessible[i].push(1);
                }   
                else {
                    this.terrain_accessible[i].push(0);
                }
            }
        }
    }


	// Liste des personnages présents sur le terrain.
	this.personnages = new Array();
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
	return this.terrain.length;
}
Map.prototype.getLargeur = function() {
	return this.terrain[0].length;
}

// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
	this.personnages.push(perso);
}

Map.prototype.dessinerMap = function(context) {
	for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * 32;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * 32, y);
		}
	}
	
	// Dessin des personnages
	for(var i = 0, l = this.personnages.length ; i < l ; i++) {
		this.personnages[i].dessinerPersonnage(context,i);
	}
}















