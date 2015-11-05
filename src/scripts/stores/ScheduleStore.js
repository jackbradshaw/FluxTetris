import {Store} from "flux/utils";
import TetrisDispatcher from "../dispatcher/TetrisDispatcher";
import TetrisActions from "../actions/TetrisActions";

class ScheduleStore extends Store {

	constructor(dispatcher) {
		super(dispatcher);
		this.tickInterval = 20;
		this.lockInterval = 20;
		this.__scheduleMoveDown();
	}

	__onDispatch(payload) {
		switch(payload.action.type) {
		case "move":
			this.__scheduleMoveDown();
			break;
		default:
			break;
		}
	}

	__scheduleMoveDown() {
		setInterval(this.tickInterval, TetrisActions.moveDown());
	}
}
export default new ScheduleStore(TetrisDispatcher);
