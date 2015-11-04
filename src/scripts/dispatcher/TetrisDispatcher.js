import {Dispatcher}  from "flux";

class TetrisDispatcher extends Dispatcher {
  constructor() {
    super();
    console.log(this);
  }
}

export default TetrisDispatcher;
