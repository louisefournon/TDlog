/*Fichier abandonné pour l'instant*/

function trouveMin(){
    var mini = "infini";
    var indice;
    for (var i=0;i<Reste.length;i++){
        if (d[Reste[i]]<mini){
            mini = d[Reste[i]];
            indice = i;
        }
        
    }
    return Reste.splice(i,1);
}

function maj_distances(s1,s2){
    if (d[s2] > d[s1] + 1){
        d[s2] = d[s1] + 1;
        predecesseurs[s2] = s1;
    }
}

function Dijsktra(graphe,beginning,end){
    /*Initialisation*/
    var d = [];
    var Reste = [];
    var Predecesseurs = new Array(graphe.length);
    for (var i=0;i<graphe.length;i++){
        d.push(i);
        Reste.push(i);
    }
    d[beginning] = 0;
    /*Corps*/
    var s1;
    while(Reste!=[]){
        s1 = trouveMin(Reste);
        for(var s2=0;s2<graphe[s1].length;s2++){
            maj_distances(s1,s2);
        }
    }
}



function create_graphe(terrain,case_inaccessible){
    var graphe = [];
    var b;
    for(var i=0;i<terrain.length;i++){
        for (var j=0;j<terrain[0].length;j++){
            b = true;
            for (var k=0;k<case_inaccessible.length;k++){
                if (terrain[i][j] == case_inaccessible[k]){
                    b = false;
                }
            }
            if (b){
                graphe.push([]);
            }
        }
    }
}
