import {Dispatcher}  from "flux";

class TetrisDispatcher extends Dispatcher {
	constructor() {
		super();
		this.VIEW_ACTION_KEY = "VIEW_ACTION";
	}

	handleViewAction(action) {
		this.dispatch({
			source: this.VIEW_ACTION_KEY,
			action: action
		});
	}
}
export default new TetrisDispatcher();
