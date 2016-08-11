function timeoutLoop(fn, delay) {
setTimeout(function() {
fn();
timeoutLoop(fn, 2000);
}, delay);
}

function createMap(){
	n = 100, m = 100;
	mapMas = [];
for (var i = 0; i <= m; i++){
    mapMas[i] = [];
    for (var j = 0; j <= n; j++){
        mapMas[i][j] = 0;
}}
//console.log(mapMas);
};
createMap();

function protoCell(x,y,up,right,down,left){
	this.x = x;
	this.y = y;
	this.up = up;
	this.right = right;
	this.down = down;
	this.left = left;
};

function aboutArrows(){
	
	function check(id){
		var temp = parent.loc.frames[4].document.getElementById(id).innerHTML; 
		temp = temp.search(/javascript:goTo/i);
		return temp
	};
	
	var ids = ["d1", "d5", "d7", "d3"];
	var arrows = [];
	for (var i=0; i<4; i++){
		var t = check(ids[i]);
		if (t != -1){
			arrows[i] = true;
		}else {
			arrows[i] = false;
		};
	};
	return arrows;
};

function whereIAm(){
	var temp = parent.loc.frames[4].document.getElementById('title').innerHTML;
	var coords = [];
	var x = temp.match(/\((.*?)\,/);
	var y = temp.match(/\,\s(.*?)\)/);
	coords[0] = x[1];
	coords[1] = y[1];
	return coords;
};

function randomize(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};

function doIt(arrows){
	var randi;
	var keyst = ["up","right","down","left"];
	var idioticIndexest = ["3","2","4","1"];
	var keys = [];
	var idioticIndexes = [];
	for (var i=3 ;i>=0; i--){
		if (steps[mainCounter-1] === idioticIndexest[i]){
			arrows[keyst[i]] = false;
		};
			
		if (arrows[keyst[i]] === true){
			keys.unshift(keyst[i]);
			idioticIndexes.unshift(idioticIndexest[i]);
		};
	};
	randi = randomize(1,keys.length);
	if (keys.length == 0){randi=0};	
	switch (idioticIndexes[randi-1]) {
		case '3':
			steps[mainCounter] = "4"
			x = "Сходил вверх"+ " "+ steps[mainCounter];
			goForward(randi,x);
			
			break
		case '2':
			steps[mainCounter] = "1";
			x = "Сходил вправо" + " "+ steps[mainCounter];	
			goForward(randi,x);
			break
		case '4':
			steps[mainCounter] = "3";
			x = "сходил вниз" + " "+ steps[mainCounter];
			goForward(randi,x);
			break
		case '1':
			steps[mainCounter] = "2";	
			x = "Сходил влево"+ " "+ steps[mainCounter];
			goForward(randi,x);
			break
		default:
		goBack();	
	};
	
	function goForward(randi,x){
		parent.loc.frames[4].parent.game_ref.location.href="cgi/maze_move.php?dir="+idioticIndexes[randi-1];
		console.log(x);
		mainCounter++;
	};
	function goBack(){
		//steps[mainCounter]=0;
		mainCounter++;
		parent.loc.frames[4].parent.game_ref.location.href="cgi/maze_move.php?dir="+steps[mainCounter-1];
	};
};


function pickUp(){
	var t = parent.loc.frames[4].document.getElementById('picks').innerHTML;
	if (t) {
		var xx = t.match(/\((.*?)\,/);
		var pickOne = xx[1];
		tryPick(pickOne);
	};
	function tryPick (pickOne){
	parent.loc.frames[4].parent.game_ref.location.href="cgi/maze_pickup.php?item_id="+pickOne;
};
};

		
mainCounter = 0;
steps = [];
var coords = [], 
arrows = [];

timeoutLoop(function() {try{
	coords = whereIAm();
	arrows = aboutArrows();
	mapMas[coords[0]][coords[1]] = new protoCell(coords[0],coords[1], arrows[0],
									arrows[1],
									arrows[2],
									arrows[3]
									);
	doIt(mapMas[coords[0]][coords[1]]);
	pickUp();
	console.log("Main counter = "+mainCounter+"Previous steps "+ steps[mainCounter-1])
} catch(ex){}
},2500);
