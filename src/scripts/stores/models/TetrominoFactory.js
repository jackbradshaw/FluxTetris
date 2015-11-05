import Tetromino from "./Tetromino";

class TetrominoFactory {
	constructor(position, isCoordinateAvailable) {
		this.bag = [];
		this.position = position;
		this.isCoordinateAvailable = isCoordinateAvailable;
	}

	makeTetromino() {
		if(this.bag.length === 0) {
			this.bag = this.makeBag();
		}
		let randomIndex = Math.floor(Math.random() * this.bag.length);
		return this.bag.splice(randomIndex, 1)[0];
	}

	makeBag() {
		return [
			this.makeO(),
			this.makeT(),
			this.makeL(),
			this.makeJ(),
			this.makeS(),
			this.makeZ(),
			this.makeI()
		];
	}

	make(minos, colour, rotationOffsetData) {
		return new Tetromino(
			minos,
			colour,
			{x: this.position.x, y: this.position.y},
			rotationOffsetData,
			this.isCoordinateAvailable
		);
	}

	makeO() {
		return this.make(
			[
				{x : 0, y: 0},
				{x : 0, y: 1},
				{x : 1, y: 0},
				{x : 1, y: 1}
			],
			"yellow",
			this.width2RotationOffsetData()
		);
	}

	makeT() {
		return this.make(
			[
				{x : -1, y: 0},
				{x : 0, y: 0},
				{x : 1, y: 0},
				{x : 0, y: -1}
			],
			"purple",
			this.width3RotationOffsetData()
		);
	}

	makeS() {
		return this.make(
			[
				{x : -1, y: 0},
				{x : 0, y: 0},
				{x : 0, y: -1},
				{x : 1, y: -1}
			],
			"green",
			this.width3RotationOffsetData()
		);
	}

	makeZ() {
		return this.make(
			[
				{x : -1, y: -1},
				{x : 0, y: -1},
				{x : 0, y: 0},
				{x : 1, y: 0}
			],
			"red",
			this.width3RotationOffsetData()
		);
	}

	makeL() {
		return this.make(
			[
				{x : -1, y: 0},
				{x : 0, y: 0},
				{x : 1, y: 0},
				{x : 1, y: 1}
			],
			"orange",
			this.width3RotationOffsetData()
		);
	}

	makeJ() {
		return this.make(
			[
				{x : -1, y: -1},
				{x : -1, y: 0},
				{x : 0, y: 0},
				{x : 1, y: 0}
			],
			"blue",
			this.width3RotationOffsetData()
		);
	}

	makeI() {
		return this.make(
			[
				{x : -1, y: 0},
				{x : 0, y: 0},
				{x : 1, y: 0},
				{x : 2, y: 0}
			],
			"cyan",
			this.width4RotationOffsetData()
		);
	}

	width3RotationOffsetData() {
		return [
			[{x: 0, y: 0 }, {x: 0, y: 0 }, {x: 0, y: 0 }, {x: 0, y: 0 }, {x: 0, y: 0 }],
			[{x: 0, y: 0 }, {x: 1, y: 0 }, {x: 1, y: -1 }, {x: 0, y: 2 }, {x: 1, y: 2 }],
			[{x: 0, y: 0 }, {x: 0, y: 0 }, {x: 0, y: 0 }, {x: 0, y: 0 },  {x: 0, y: 0 }],
			[{x: 0, y: 0 }, {x: -1, y: 0 }, {x: -1, y: -1 }, {x: 0, y: 2 }, {x: -1, y: 2 }]
		];
	}

	width4RotationOffsetData() {
		return [
			[{x: 0, y: 0 }, {x: -1, y: 0 }, {x: 2, y: 0 }, {x: -1, y: 0 }, {x: 2, y: 0 }],
			[{x: -1, y: 0 }, {x: 0, y: 0 }, {x: 0, y: 0 }, {x: 0, y: 1 }, {x: 0, y: -2 }],
			[{x: -1, y: 1 }, {x: 1, y: 1 }, {x: -2, y: 1 }, {x: 1, y: 0 }, {x: -2, y: 0 }],
			[{x: 0, y: 1 }, {x: 0, y: 1 }, {x: 0, y: 1 }, {x: 0, y: -1 }, {x: 0, y: 2 }]
		];
	}

	width2RotationOffsetData() {
		return [
			[{x: 0, y: 0 }],
			[{x: 0, y: -1 }],
			[{x: -1, y: -1 }],
			[{x: -1, y: 0 }]
		];
	}
}
export default TetrominoFactory;
