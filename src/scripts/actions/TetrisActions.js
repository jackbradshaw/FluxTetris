import TetrisDispatcher from "../dispatcher/TetrisDispatcher";
import ActionNames from "./ActionNames";
import Directions from "../Stores/models/Directions";

class TetrisActions {

	tick() {
		TetrisDispatcher.handleViewAction({
			type : ActionNames.tetris.tick
		});
	}

	moveDown() {
		this.__move(Directions.down);
	}

	moveRight() {
		this.__move(Directions.right);
	}

	moveLeft() {
		this.__move(Directions.left);
	}

	__move(direction) {
		TetrisDispatcher.handleViewAction({
			type: ActionNames.tetris.move,
			direction: direction
		});
	}
}
export default new TetrisActions();
