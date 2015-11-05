import TetrisStore from "../Stores/TetrisStore";

let blockSize = 20;
TetrisStore.addListener(() => {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	canvas.width = TetrisStore.gridWidth * blockSize;
	canvas.height = (TetrisStore.gridHeight - 2) * blockSize;
	context.clearRect(0, 0, self.canvas.width, self.canvas.height);

	TetrisStore.getGhostTiles().forEach((tile) => {
		context.strokeStyle = tile.colour;
		context.strokeRect(tile.x * blockSize, (tile.y - 2) * blockSize, blockSize, blockSize);
	});

	TetrisStore.getTiles().forEach(function(tile) {
		if(tile.y >= 2) {
			context.strokeStyle = "black";
			context.fillStyle = tile.colour;
			context.fillRect(tile.x * blockSize, (tile.y - 2) * blockSize, blockSize, blockSize);
			context.strokeRect(tile.x * blockSize, (tile.y - 2) * blockSize, blockSize, blockSize);
		}
	});
});
