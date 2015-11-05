import React from "react";
import ReactDOM from "react-dom";
import grid from "./components/grid";
import ScheduleStore from "./stores/ScheduleStore";

ReactDOM.render(
	<div>
	<h1>Tetris</h1>
		<canvas id="canvas"></canvas>
	</div>,
  document.getElementById("app")
);
