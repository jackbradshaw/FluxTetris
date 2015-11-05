import TetrominoFactory from "./TetrominoFactory";
import Tile from "./Tile";

class Grid {
	constructor(width, height, updated) {
		this.width = width;
		this.height = height;
		this.updated = updated;

		this.dropInterval = 200;
		this.lockInterval = 400;

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

	scheduleMoveDown() {
		this.scheduledMoveDown = setTimeout(this.moveDown.bind(this), this.dropInterval);
	}

	moveDown() {
		if(!this.tetromino.move({x: 0, y: 1})){
			this.scheduleLock();
		} else {
			this.updated();
			this.scheduleMoveDown();
		}
	}

	scheduleLock() {
		this.scheduledLock = setTimeout(() => {
			this.lockTetromino.call(this);
			this.scheduledLock = undefined;
		}, this.lockInterval);
	}

	resetScheduledLock() {
		let reset = false;
		if(this.scheduledLock) {
			clearTimeout(this.scheduledLock);
			this.scheduleLock();
			reset = true;
		}
		return reset;
	}

	lockTetromino() {
		this.getTetrominoTiles().forEach((tile) => this.rows[tile.y][tile.x] = tile.colour);
		this.removeCompleteRows();
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
			clearTimeout(this.scheduledMoveDown);
			this.updated();
		} else {
			this.scheduleMoveDown();
		}
	}

	moveTetromino(direction) {
		if(this.tetromino.move(direction)) {
			if(this.resetScheduledLock()) {
				while(this.tetromino.move({x: 0, y: 1}));
			}
		}
		this.updated();
	}

	dropTetromino() {
		this.tetromino.drop();
		this.updated();
	}

	rotateTetromino(direction) {
		if(this.tetromino.rotate(direction)) {
			if(this.resetScheduledLock()) {
				while(this.tetromino.move({x: 0, y: 1}));
			}
		}
		this.updated();
	}

	contains(coordinate) {
		return 0 <= coordinate.x && coordinate.x < this.width && 0 <= coordinate.y && coordinate.y < this.height;
	}

	isTileAvailable(coordinate) {
		return this.contains(coordinate) && !this.rows[coordinate.y][coordinate.x];
	}
}
export default Grid;
