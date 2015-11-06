import TetrominoFactory from "./TetrominoFactory";
import Tile from "./Tile";
import Directions from "./Directions";

class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.locking = false;

		this.tetrominoFactory = new TetrominoFactory({
			x: width / 2,
			y: 1
		},
    this.isTileAvailable.bind(this));

		this.rows = [];
		for(var y = 0; y < height ; y++) {
			this.rows[y] = this.newRow();
		}

		this.dropNewTetromino();
	}

	newRow() {
		var newRow = [];
		for(var x = 0; x < this.width; x++) {
			newRow[x] = undefined;
		}
		return newRow;
	}

	removeCompleteRows() {
		var completeRows = this.rows.filter((row) => row.every((tile) => !!tile));
		this.removeAndReplaceRows(completeRows);
	}

	removeAndReplaceRows(rows) {
		rows.forEach((row) => {
			this.rows.splice(this.rows.indexOf(row), 1);
			this.rows.unshift(this.newRow());
		});
	}

	tick() {
		if(this.locking) {
			this.lockTetromino();
		} else {
			this.moveTetromino(Directions.down);
		}
	}

	lockTetromino() {
		this.getTetrominoTiles().forEach((tile) => this.rows[tile.y][tile.x] = tile.colour);
		this.removeCompleteRows();
		this.locking = false;
		this.dropNewTetromino();
	}

	getTetrominoTiles() {
		return !this.tetromino ? [] : this.tetromino.getOffsetCoordinates().map((coordinate) => {
			return new Tile(coordinate, this.tetromino.colour);
		});
	}

	getGhostTiles() {
		return !this.tetromino ? [] : this.tetromino.getDroppedCoordinates().map((coordinate) => {
			return new Tile(coordinate, this.tetromino.colour);
		});
	}

	dropNewTetromino() {
		this.tetromino = this.tetrominoFactory.makeTetromino();
		if(!this.tetromino.getOffsetCoordinates().every(this.isTileAvailable.bind(this))) {
			alert("Game Over!");
		}
	}

	moveTetromino(direction) {
		if(this.tetromino.move(direction)) {
			this.settleTetromino();
		} else if(Directions.down.equals(direction)) {
			console.log("set locking");
			this.locking = true;
		}
	}

	dropTetromino() {
		this.tetromino.drop();
	}

	rotateTetromino(direction) {
		if(this.tetromino.rotate(direction)) {
			this.settleTetromino();
		}
	}

	settleTetromino() {
		if(this.locking) {
			while(this.tetromino.move(Directions.down));
		}
	}

	contains(coordinate) {
		return 0 <= coordinate.x && coordinate.x < this.width && 0 <= coordinate.y && coordinate.y < this.height;
	}

	isTileAvailable(coordinate) {
		return this.contains(coordinate) && !this.rows[coordinate.y][coordinate.x];
	}
}
export default Grid;
