var ids = [[3,'up'], [2,'right'], [4,'down'], [1,'left']];



function obj(){
	this.coords = whereIAm()
	this.arrows = aboutArrows();
	this.root = this;
	this.comefrom = 0;
	this.right = true;
	this.left = true;
	this.down = true;
	this.up = true;
}


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
	coords[0] = parseInt(x[1]);
	coords[1] = parseInt(y[1]);
	mapMas[x[1]][y[1]] = true;
	return coords;
};


function createMap(){
	n = 99, m = 99;
	mapMas = [];
for (var i = 0; i <= m; i++){
    mapMas[i] = [];
    for (var j = 0; j <= n; j++){
}}
//console.log(mapMas);
};
createMap();


function whereToGo(){
	var arrows = rabbit.arrows;
	var coords = rabbit.coords;
	var count=0;
	if (mapMas[coords[0]][coords[1]-1] === true) arrows[0] = false;
	if (mapMas[coords[0]+1][coords[1]] === true) arrows[1] = false;
	if (mapMas[coords[0]][coords[1]+1] === true) arrows[2] = false;
	if (mapMas[coords[0]-1][coords[1]] === true) arrows[3] = false;

	for (var i=0;i<4;i++){
		if(arrows[i] !== false) count++;
	}
	if (count>0) {console.log("Я думаю могу пойти сюда"+arrows);return arrows}
		else {
			return 'getback';
		};
}

function step(){
	var arrows = whereToGo();
	if (arrows === 'getback'){getBack()}
		else{
			posibilities = [];
			for (var i=0;i<4;i++){
				if (arrows[i]===true) posibilities.push(ids[i]);
			};
			console.log(posibilities);
		var rand = randomize(0,posibilities.length-1);
		parent.loc.frames[4].parent.game_ref.location.href="cgi/maze_move.php?dir="+posibilities[rand][0];
		t1 = setTimeout(forward, 1000,posibilities,rand);
		};
}
function pause(){
	pickUp();
}

function forward(posibilities,rand){
			rabbit[posibilities[rand][1]] = new obj();
			rabbit[posibilities[rand][1]].root = rabbit;
			rabbit = rabbit[posibilities[rand][1]];
			rabbit.comefrom = [posibilities[rand][0]];
			t2 = setTimeout(pause, 250);
};

s = new  obj();
rabbit = s;
rabbit.root = rabbit;

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



function reverse(numb){
	if (numb == 3) return 4;
	if (numb == 2) return 1;
	if (numb == 4) return 3;
	if (numb == 1) return 2;
}

function getBack(){
	setTimeout('console.log("ждем")', 1000)
	parent.loc.frames[4].parent.game_ref.location.href="cgi/maze_move.php?dir="+reverse(rabbit.comefrom);
	rabbit = rabbit.root;
}

function timeoutLoop(fn, delay) {
setTimeout(function() {
fn();
timeoutLoop(fn, randomize(1900,2100));
}, delay);
};

timeoutLoop(function() {try{
step();
} catch(ex){}
},randomize(2000,2500));

/*
function obj(left){
	this.left = left;
	this.root = this;
}

s = new  obj(true);
rabbit = s;
rabbit.root = rabbit;
rabbit.left = new obj(false);
rabbit.left.root = rabbit;
rabbit = rabbit.left;
rabbit.left = new obj(true);
rabbit.left.root = rabbit;
rabbit = rabbit.left;
*/