import {FluxStore} from "flux";
import TetrisDispatcher from "../dispatcher/TetrisDispatcher";

class TetrisStore extends FluxStore {
	__onDispatch(action) {
		switch(action.type) {
		case "test":
			break;
		default:
			break;
		}
	}
}
export default new TetrisStore(TetrisDispatcher);
