class Direction {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	equals(direction) {
		return this.x === direction.x && this.y === direction.y;
	}
}

export default {
	left: new Direction(-1 , 0),
	right: new Direction(1 , 0),
	down: new Direction(0 , 1)
};
