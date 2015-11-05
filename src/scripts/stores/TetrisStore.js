import {Store} from "flux/utils";
import TetrisDispatcher from "../dispatcher/TetrisDispatcher";
import Grid from "./models/Grid";
import Tile from "./models/Tile";

let TetrisStore = function() {
	let _grid;

	class TetrisStore extends Store {
		constructor(dispatcher) {
			super(dispatcher);
			this.gridHeight = 20;
			this.gridWidth = 10;
			_grid = new Grid(this.gridWidth, this.gridHeight, () => {
				TetrisDispatcher.handleViewAction({
					type: "change"
				});
			});
		}
		__onDispatch(payload) {
			switch(payload.action.type) {
			case "change":
				this.__emitChange();
				break;
			case "move":
				console.log("move");
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
	}

	return TetrisStore;
}();
export default new TetrisStore(TetrisDispatcher);
