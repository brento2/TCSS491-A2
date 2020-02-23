
// GameBoard code below


var BOARD = [];
var COLUMNS = 50;
var ROWS  = 45;
var SIZE = 20;


function Cell(game, cellX, cellY) {
	//console.log(cellX + " " + cellY)
	this.hCoord = cellX;
	this.vCoord = cellY;
	this.value = Math.random();
	
	//this.alive = this.value > 0.5 ? true : false;
	this.alive = false;
	this.color = this.alive ? "Black" : "White";
	Entity.call(this, game, cellX * SIZE, cellY * SIZE);
	
}

Cell.prototype = new Entity();
Cell.prototype.constructor = Cell;

Cell.prototype.update = function() {
	
	var livingNeighbors = 0;
	for (var i = 0; i < this.neighbors.length; i++) {
		if (this.neighbors[i].alive) {
			livingNeighbors++;
		}
	}
	if (this.alive && livingNeighbors !== 3 && livingNeighbors !== 2) {
		this.nextState = false;
	} else if (!this.alive && livingNeighbors === 3) {
		this.nextState = true;
	} else {
		this.nextState = this.alive;
	}
	//this.color = this.alive ? "Black" : "White";
	//console.log(this)
	//console.log(" (" + this.hCoord + ", " + this.vCoord + ") " + this.alive);
}

Cell.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	//console.log(this.color);
	ctx.fillRect(this.x, this.y, SIZE, SIZE);
}

Cell.prototype.getNeighbors = function() {
	var n = BOARD[this.hCoord][Math.max(0, this.vCoord - 1)]
	var s = BOARD[this.hCoord][Math.min(44, this.vCoord + 1)]
	var e = BOARD[Math.min(49, this.hCoord + 1)][this.vCoord]
	var w = BOARD[Math.max(0, this.hCoord - 1)][this.vCoord]
	var nw = BOARD[Math.max(0, this.hCoord - 1)][Math.max(0, this.vCoord - 1)]
	var ne = BOARD[Math.min(49, this.hCoord + 1)][Math.max(0, this.vCoord - 1)]
	var sw = BOARD[Math.max(0, this.hCoord - 1)][Math.min(44, this.vCoord + 1)]
	var se = BOARD[Math.min(49, this.hCoord + 1)][Math.min(44, this.vCoord + 1)]
	var allDirs = [n, s, e, w, nw, ne, sw, se];
	var neighbors = [];
	for (var i = 0; i < allDirs.length; i++) {
		if (!neighbors.includes(allDirs[i]) && allDirs[i] !== this) {
			neighbors.push(allDirs[i]);
		}
	}
	this.neighbors = neighbors;
}

Cell.prototype.setStatus = function(state) {
	this.alive = state;
	this.color = this.alive ? "Black" : "White";
	
}
// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();

	gameEngine.init(ctx);
	for (var i = 0; i < 50; i++) {
		BOARD.push([]);
		for (var j = 0; j < 45; j++) {
		//	console.log(i + " " + j);
			BOARD[i][j] = new Cell(gameEngine, i, j, false);
			//console.log(BOARD[i][j]); 
		} 
	}

	for (var i = 0; i < 50; i++) {
		for (var j = 0; j < 45; j++) {
			//console.log(i + " " + j);
			BOARD[i][j].getNeighbors();
			gameEngine.addEntity(BOARD[i][j])
		}
	}

	/**
	  The following code builds the structures for the game of life.
	*/ 
	// Building a Gosper Gun
	BOARD[3][5].setStatus(true)
	BOARD[3][6].setStatus(true)
	BOARD[4][5].setStatus(true)
	BOARD[4][6].setStatus(true)
	
	BOARD[37][3].setStatus(true)
	BOARD[37][4].setStatus(true)
	BOARD[38][3].setStatus(true)
	BOARD[38][4].setStatus(true)
	
	BOARD[13][5].setStatus(true)
	BOARD[13][6].setStatus(true)
	BOARD[13][7].setStatus(true)
	
	BOARD[14][4].setStatus(true)
	BOARD[14][8].setStatus(true)

	BOARD[15][3].setStatus(true)
	BOARD[16][3].setStatus(true)
	
	BOARD[15][9].setStatus(true)
	BOARD[16][9].setStatus(true)
	
	BOARD[17][6].setStatus(true)
	
	BOARD[18][4].setStatus(true)
	BOARD[18][8].setStatus(true)
	
	BOARD[19][5].setStatus(true)
	BOARD[19][6].setStatus(true)
	BOARD[19][7].setStatus(true)
	
	BOARD[20][6].setStatus(true)
	
	BOARD[23][3].setStatus(true)
	BOARD[23][4].setStatus(true)
	BOARD[23][5].setStatus(true)
	BOARD[24][3].setStatus(true)
	BOARD[24][4].setStatus(true)
	BOARD[24][5].setStatus(true)
	
	BOARD[25][2].setStatus(true)
	BOARD[25][6].setStatus(true)
	
	BOARD[27][1].setStatus(true)
	BOARD[27][2].setStatus(true)
	BOARD[27][6].setStatus(true)
	BOARD[27][7].setStatus(true)
	
	// BUILDING A PULSATOR
	BOARD[5][43].setStatus(true)
	BOARD[5][42].setStatus(true)
	BOARD[5][41].setStatus(true)
	BOARD[6][41].setStatus(true)
	
	
	BOARD[1][39].setStatus(true)
	BOARD[2][39].setStatus(true)
	BOARD[3][39].setStatus(true)
	BOARD[3][38].setStatus(true)
	
	
	BOARD[1][33].setStatus(true)
	BOARD[2][33].setStatus(true)
	BOARD[3][33].setStatus(true)
	BOARD[3][34].setStatus(true)
	
	
	BOARD[5][29].setStatus(true)
	BOARD[5][30].setStatus(true)
	BOARD[5][31].setStatus(true)
	BOARD[6][31].setStatus(true)
	
	
	BOARD[11][29].setStatus(true)
	BOARD[11][30].setStatus(true)
	BOARD[11][31].setStatus(true)
	BOARD[10][31].setStatus(true)
	
	
	BOARD[15][33].setStatus(true)
	BOARD[14][33].setStatus(true)
	BOARD[13][33].setStatus(true)
	BOARD[13][34].setStatus(true)
	
	
	BOARD[15][39].setStatus(true)
	BOARD[14][39].setStatus(true)
	BOARD[13][39].setStatus(true)
	BOARD[13][38].setStatus(true)
	
	BOARD[11][43].setStatus(true)
	BOARD[11][42].setStatus(true)
	BOARD[11][41].setStatus(true)
	BOARD[10][41].setStatus(true)
	
	
	BOARD[5][34].setStatus(true)
	BOARD[5][35].setStatus(true)
	BOARD[6][33].setStatus(true)
	BOARD[6][35].setStatus(true)
	BOARD[7][33].setStatus(true)
	BOARD[7][34].setStatus(true)
	
	
	BOARD[5][37].setStatus(true)
	BOARD[5][38].setStatus(true)
	BOARD[6][37].setStatus(true)
	BOARD[6][39].setStatus(true)
	BOARD[7][38].setStatus(true)
	BOARD[7][39].setStatus(true)
	
	
	BOARD[9][38].setStatus(true)
	BOARD[9][39].setStatus(true)
	BOARD[10][37].setStatus(true)
	BOARD[10][39].setStatus(true)
	BOARD[11][37].setStatus(true)
	BOARD[11][38].setStatus(true)
	
	
	BOARD[9][33].setStatus(true)
	BOARD[9][34].setStatus(true)
	BOARD[10][33].setStatus(true)
	BOARD[10][35].setStatus(true)
	BOARD[11][34].setStatus(true)
	BOARD[11][35].setStatus(true)
	
	// BUILDING PENTAHEDRON
	BOARD[4][20].setStatus(true)
	BOARD[4][21].setStatus(true)
	BOARD[4][22].setStatus(true)
	
	BOARD[5][19].setStatus(true)
	BOARD[5][23].setStatus(true)
	BOARD[6][18].setStatus(true)
	BOARD[6][24].setStatus(true)
	
	BOARD[8][25].setStatus(true)
	BOARD[9][25].setStatus(true)
	BOARD[8][17].setStatus(true)
	BOARD[9][17].setStatus(true)
	
	BOARD[13][20].setStatus(true)
	BOARD[13][21].setStatus(true)
	BOARD[13][22].setStatus(true)
	
	BOARD[12][19].setStatus(true)
	BOARD[12][23].setStatus(true)
	BOARD[11][18].setStatus(true)
	BOARD[11][24].setStatus(true)
	
	// BLINKERS
	BOARD[1][12].setStatus(true)
	BOARD[2][12].setStatus(true)
	BOARD[3][12].setStatus(true)
	
	BOARD[46][25].setStatus(true)
	BOARD[47][25].setStatus(true)
	BOARD[48][25].setStatus(true)
	
	// KOK'S GALAXY
	BOARD[23][32].setStatus(true)
	BOARD[24][32].setStatus(true)
	BOARD[25][32].setStatus(true)
	BOARD[26][32].setStatus(true)
	BOARD[27][32].setStatus(true)
	BOARD[28][32].setStatus(true)
	BOARD[23][33].setStatus(true)
	BOARD[24][33].setStatus(true)
	BOARD[25][33].setStatus(true)
	BOARD[26][33].setStatus(true)
	BOARD[27][33].setStatus(true)
	BOARD[28][33].setStatus(true)

	BOARD[27][35].setStatus(true)
	BOARD[27][36].setStatus(true)
	BOARD[27][37].setStatus(true)
	BOARD[27][38].setStatus(true)
	BOARD[27][39].setStatus(true)
	BOARD[27][40].setStatus(true)
	BOARD[28][35].setStatus(true)
	BOARD[28][36].setStatus(true)
	BOARD[28][37].setStatus(true)
	BOARD[28][38].setStatus(true)
	BOARD[28][39].setStatus(true)
	BOARD[28][40].setStatus(true)

	BOARD[20][39].setStatus(true)
	BOARD[21][39].setStatus(true)
	BOARD[22][39].setStatus(true)
	BOARD[23][39].setStatus(true)
	BOARD[24][39].setStatus(true)
	BOARD[25][39].setStatus(true)
	BOARD[20][40].setStatus(true)
	BOARD[21][40].setStatus(true)
	BOARD[22][40].setStatus(true)
	BOARD[23][40].setStatus(true)
	BOARD[24][40].setStatus(true)
	BOARD[25][40].setStatus(true)
	
	BOARD[20][32].setStatus(true)
	BOARD[20][33].setStatus(true)
	BOARD[20][34].setStatus(true)
	BOARD[20][35].setStatus(true)
	BOARD[20][36].setStatus(true)
	BOARD[20][37].setStatus(true)
	BOARD[21][32].setStatus(true)
	BOARD[21][33].setStatus(true)
	BOARD[21][34].setStatus(true)
	BOARD[21][35].setStatus(true)
	BOARD[21][36].setStatus(true)
	BOARD[21][37].setStatus(true)
	
	//BOX
	BOARD[1][27].setStatus(true)	
	BOARD[1][28].setStatus(true)	
	BOARD[2][27].setStatus(true)	
	BOARD[2][28].setStatus(true)

	// CLOCK
	BOARD[23][26].setStatus(true);
	BOARD[23][27].setStatus(true);
	BOARD[24][26].setStatus(true);
	BOARD[24][27].setStatus(true);
	
	BOARD[19][20].setStatus(true);
	BOARD[19][21].setStatus(true);
	BOARD[20][20].setStatus(true);
	BOARD[20][21].setStatus(true);
	
	BOARD[25][16].setStatus(true);
	BOARD[25][17].setStatus(true);
	BOARD[26][16].setStatus(true);
	BOARD[26][17].setStatus(true);
	
	BOARD[29][22].setStatus(true);
	BOARD[29][23].setStatus(true);
	BOARD[30][22].setStatus(true);
	BOARD[30][23].setStatus(true);
	
	BOARD[27][20].setStatus(true);
	BOARD[27][21].setStatus(true);
	BOARD[27][22].setStatus(true);
	BOARD[27][23].setStatus(true);
	
	BOARD[23][19].setStatus(true);
	BOARD[24][19].setStatus(true);
	BOARD[25][19].setStatus(true);
	BOARD[26][19].setStatus(true);
	
	BOARD[22][20].setStatus(true);
	BOARD[22][21].setStatus(true);
	BOARD[22][22].setStatus(true);
	BOARD[22][23].setStatus(true);
	
	BOARD[23][24].setStatus(true);
	BOARD[24][24].setStatus(true);
	BOARD[25][24].setStatus(true);
	BOARD[26][24].setStatus(true);
	
	BOARD[23][21].setStatus(true);
	BOARD[24][22].setStatus(true);
	BOARD[25][22].setStatus(true);
	
	// TOAD
	BOARD[13][13].setStatus(true);
	BOARD[14][13].setStatus(true);
	BOARD[15][13].setStatus(true);
	BOARD[14][14].setStatus(true);
	BOARD[15][14].setStatus(true);
	BOARD[16][14].setStatus(true);
	
	// BEACON
	BOARD[9][15].setStatus(true);
	BOARD[9][14].setStatus(true);
	BOARD[8][15].setStatus(true);
	BOARD[6][13].setStatus(true);
	BOARD[6][12].setStatus(true);
	BOARD[7][12].setStatus(true);

	// BEACON 2
	BOARD[19][29].setStatus(true)
	BOARD[19][28].setStatus(true)
	BOARD[18][29].setStatus(true)
	BOARD[16][27].setStatus(true)
	BOARD[16][26].setStatus(true)
	BOARD[17][26].setStatus(true)
	
	// FUMAROLE
	BOARD[41][20].setStatus(true)
	BOARD[42][20].setStatus(true)
	BOARD[41][19].setStatus(true)
	BOARD[43][19].setStatus(true)
	BOARD[43][18].setStatus(true)
	BOARD[42][17].setStatus(true)
	BOARD[42][16].setStatus(true)
	BOARD[43][16].setStatus(true)
	BOARD[44][15].setStatus(true)
	BOARD[45][15].setStatus(true)
	BOARD[46][16].setStatus(true)
	BOARD[47][16].setStatus(true)
	BOARD[47][17].setStatus(true)
	BOARD[46][18].setStatus(true)
	BOARD[46][19].setStatus(true)
	BOARD[47][20].setStatus(true)
	BOARD[48][20].setStatus(true)
	BOARD[48][19].setStatus(true)
	
	// CROSS
	BOARD[35][29].setStatus(true);
	BOARD[36][29].setStatus(true);
	BOARD[37][29].setStatus(true);
	BOARD[38][29].setStatus(true);
	BOARD[38][30].setStatus(true);
	BOARD[38][31].setStatus(true);
	BOARD[39][31].setStatus(true);
	BOARD[40][31].setStatus(true);
	BOARD[40][32].setStatus(true);
	BOARD[40][33].setStatus(true);
	BOARD[40][34].setStatus(true);
	BOARD[39][34].setStatus(true);
	BOARD[38][34].setStatus(true);
	BOARD[38][35].setStatus(true);
	BOARD[38][36].setStatus(true);
	BOARD[37][36].setStatus(true);
	BOARD[36][36].setStatus(true);
	BOARD[35][36].setStatus(true);
	BOARD[35][35].setStatus(true);
	BOARD[35][34].setStatus(true);
	BOARD[34][34].setStatus(true);
	BOARD[33][34].setStatus(true);
	BOARD[33][33].setStatus(true);
	BOARD[33][32].setStatus(true);
	BOARD[33][31].setStatus(true);
	BOARD[34][31].setStatus(true);
	BOARD[35][31].setStatus(true);
	BOARD[35][30].setStatus(true);
	

    gameEngine.start();
});
