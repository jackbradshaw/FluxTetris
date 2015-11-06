import {Store} from "flux/utils";
import TetrisDispatcher from "../dispatcher/TetrisDispatcher";
import TetrisActions from "../actions/TetrisActions";
import ActionNames from "../actions/ActionNames";
import TetrisStore from "./TetrisStore";
import Directions from "./models/Directions";

class ScheduleStore extends Store {

	constructor(dispatcher) {
		super(dispatcher);
		this.__tickInterval = 200;
		this.__lockInterval = 400;
		this.__scheduleTick();
	}

	__onDispatch(payload) {
		switch(payload.action.type) {
		case ActionNames.tetris.move:
			this.getDispatcher().waitFor([TetrisStore.dispatchToken]);
			this.__moved(payload.action.direction);
			break;
		case ActionNames.tetris.tick:
			this.__scheduleTick(this.__tickInterval);
			break;
		default:
			break;
		}
	}

	__moved(direction) {
		if(TetrisStore.isLocking()) {
			if(Directions.down.equals(direction)) {
				this.__scheduleTick();
			} else {
				this.__scheduleTick(this.__lockInterval);
			}
		}
	}

	__scheduleTick(interval) {
		clearTimeout(this.scheduledTick);
		this.scheduledTick = setTimeout(TetrisActions.tick, interval || 0);
	}
}
export default new ScheduleStore(TetrisDispatcher);
