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

	hardDrop() {
		TetrisDispatcher.handleViewAction({
			type : ActionNames.tetris.hardDrop
		});
	}

	rotateRight() {
		this.__rotate(Directions.clockwise);
	}

	rotateLeft() {
		this.__rotate(Directions.anitclockwise);
	}

	__move(direction) {
		TetrisDispatcher.handleViewAction({
			type: ActionNames.tetris.move,
			direction: direction
		});
	}

	__rotate(direction) {
		TetrisDispatcher.handleViewAction({
			type: ActionNames.tetris.rotate,
			direction: direction
		});
	}
}
export default new TetrisActions();
