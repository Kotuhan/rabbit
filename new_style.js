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

function protoCell(x,y,up,right,down,left,was){
	this.x = x;
	this.y = y;
	this.up = up;
	this.right = right;
	this.down = down;
	this.left = left;
	this.was = was;
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
	coords[0] = x[1]; coords[0] = parseInt(coords[0]);
	coords[1] = y[1]; coords[1] = parseInt(coords[1]);
	return coords;
};

function randomize(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
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

function doIt(cell){
	var randi;
	var keyst = ["up","right","down","left"];
	var plusminx = [0, 1, 0, -1];
	var plusminy = [-1, 0, 1, 0];
	var idioticIndexest = ["3","2","4","1"];
	var keys = [];
	var idioticIndexes = [];
	
	for (var i = 0;i<4;i++){
		if (cell[keyst[i]] == true){
		//	console.log("Я посмотрел на стрелочку "+keyst[i]+" и она есть");
			if (mapMas[cell.x+plusminx[i]][cell.y+plusminy[i]].was){
				cell[keyst[i]] = false;
			//	console.log("Я заменил значение перехода " + keyst[i] + " потому что" + " я там был и это " + mapMas[cell.x+plusminx[i]][cell.y+plusminy[i]].was);
			};
		};
	};
	for (var i=3 ;i>=0; i--){
		if (steps[mainCounter-1] === idioticIndexest[i]){
			cell[keyst[i]] = false;
		};
			if (cell[keyst[i]] === true){
				keys.unshift(keyst[i]);
				idioticIndexes.unshift(idioticIndexest[i]);
			};
	};
	randi = randomize(1,keys.length);
	if (keys.length == 0){randi=0};	
		switch (idioticIndexes[randi-1]) {
			case '3':
				steps[mainCounter] = "4"
				mapMas[cell.x][cell.y].up_w = false;
				goForward(randi);
				break
			case '2':
				steps[mainCounter] = "1";
				mapMas[cell.x][cell.y].right_w = false;
				goForward(randi);
				break
			case '4':
				steps[mainCounter] = "3";
				mapMas[cell.x][cell.y].down_w = false;
				goForward(randi);
				break
			case '1':
				steps[mainCounter] = "2";	
				mapMas[cell.x][cell.y].left_w = false;
				goForward(randi);
				break
			default:
			goBack();	
		};
	
	function goForward(randi,x){
		parent.loc.frames[4].parent.game_ref.location.href="cgi/maze_move.php?dir="+idioticIndexes[randi-1];
		mainCounter++;
	};
	function goBack(){
		parent.loc.frames[4].parent.game_ref.location.href="cgi/maze_move.php?dir="+steps[mainCounter];
		steps.splice[mainCounter,1];
		mainCounter--;
	};
};


		
mainCounter = 0;
steps = [];
var coords = [], 
arrows = [];

timeoutLoop(function() {try{
	coords = whereIAm();
	arrows = aboutArrows();
//	console.log("arrrows = " + arrows)
	mapMas[coords[0]][coords[1]] = new protoCell(coords[0],coords[1], arrows[0],
									arrows[1],
									arrows[2],
									arrows[3],
									true
									);
	doIt(mapMas[coords[0]][coords[1]]);
	pickUp();
//	console.log("Main counter = "+mainCounter+"Previous steps "+ steps[mainCounter-1])
} catch(ex){}
},2500);
