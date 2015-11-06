import {Store} from "flux/utils";
import TetrisDispatcher from "../dispatcher/TetrisDispatcher";
import Grid from "./models/Grid";
import Tile from "./models/Tile";
import ActionNames from "../actions/ActionNames";

let TetrisStore = function() {
	let _grid;

	class TetrisStore extends Store {
		constructor(dispatcher) {
			super(dispatcher);
			this.gridHeight = 20;
			this.gridWidth = 10;
			_grid = new Grid(this.gridWidth, this.gridHeight);
		}
		__onDispatch(payload) {
			switch(payload.action.type) {
			case ActionNames.tetris.move:
				_grid.moveTetromino(payload.action.direction);
				this.__emitChange();
				break;
			case ActionNames.tetris.rotate:
				_grid.rotateTetromino(payload.action.direction);
				this.__emitChange();
				break;
			case ActionNames.tetris.hardDrop:
				_grid.dropTetromino();
				this.__emitChange();
				break;
			case ActionNames.tetris.tick:
				_grid.tick();
				this.__emitChange();
				break;
			default:
				break;
			}
		}

		getTiles() {
			return Array.prototype.concat.apply(_grid.getTetrominoTiles(),
			_grid.rows.map((row, y) => {
				return row.map((colour, x) => {
					return colour ? new Tile({x: x, y: y}, colour) : undefined;
				}).filter((tile) => !!tile);
			}));
		}

		getGhostTiles() {
			return _grid.getGhostTiles();
		}

		isLocking() {
			return _grid.locking;
		}
	}

	return TetrisStore;
}();
export default new TetrisStore(TetrisDispatcher);
