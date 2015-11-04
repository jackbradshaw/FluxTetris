import React from 'react';
import ReactDOM from 'react-dom';
import TetrisDispatcher from "./dispatcher/TetrisDispatcher";

console.log(TetrisDispatcher);
new TetrisDispatcher();

ReactDOM.render(
  <div>Hello, world!</div>,
  document.getElementById("app")
);
