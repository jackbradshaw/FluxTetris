import TetrisDispatcher from "../dispatcher/TetrisDispatcher";

class TetrisActions {
	moveDown() {
		TetrisDispatcher.handleViewAction({
			type: "move",
			direction: "down"
		});
	}
}
export default new TetrisActions();
