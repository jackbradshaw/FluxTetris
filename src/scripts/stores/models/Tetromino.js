class Tetromino {
	constructor(minos, colour, position, rotationOffsetData, isCoordinateAvailable) {
		this.minos = minos;
		this.position = position;
		this.colour = colour;
		this.rotationOffsetData = rotationOffsetData;
		this.rotationState = 0;
		this.isCoordinateAvailable = isCoordinateAvailable;
	}

	move(direction) {
		let canMoveBlock = this.canMove(direction);
		if(canMoveBlock) {
			this.position.y += direction.y;
			this.position.x += direction.x;
		}
		return canMoveBlock;
	}

	drop() {
		let droppedOffset = this.getDroppedOffset();
		this.position.y += droppedOffset.y;
		this.position.x += droppedOffset.x;
	}

	canMove(offset) {
		return this.willFit(this.getOffsetCoordinates(offset));
	}

	getRotationState(direction) {
		direction = direction || 0;
		return (4 + this.rotationState + direction) % 4;
	}

	rotate(direction) {
		let rotated = false;
		let targetRotationState = this.getRotationState(direction);
		let rotationOffset = this.canRotate(targetRotationState);
		if(rotationOffset) {
			this.position.x += rotationOffset.x;
			this.position.y += rotationOffset.y;
			this.rotationState = targetRotationState;
			rotated = true;
		}
		return rotated;
	}

	canRotate(targetRotationState) {
		let rotationOffset;
		let sourceOffsets = this.rotationOffsetData[this.rotationState];
		let targetOffsets = this.rotationOffsetData[targetRotationState];
		for(let i = 0; i < targetOffsets.length && !rotationOffset; i++) {
			var offset = {
				x: sourceOffsets[i].x - targetOffsets[i].x,
				y: sourceOffsets[i].y - targetOffsets[i].y
			};
			if(this.willFit(this.getOffsetCoordinates(offset, targetRotationState))) {
				rotationOffset = offset;
			}
		}
		return rotationOffset;
	}

	willFit(coordinates) {
		return coordinates.every(this.isCoordinateAvailable);
	}

	getOffsetCoordinates(offset, rotationState) {
		offset = offset || { x: 0, y: 0 };
		rotationState = rotationState !== undefined ? rotationState : this.rotationState;

		let rotated = this.getRotated(rotationState);
		return rotated.map((coordinate) => {
			return {
				x: this.position.x + offset.x + coordinate.x,
				y: this.position.y + offset.y + coordinate.y
			};
		});
	}

	getDroppedOffset() {
		let y = 0;
		while(this.canMove({ x: 0, y: y + 1 })) {
			y++;
		}
		return { x: 0, y: y };
	}

	getDroppedCoordinates() {
		return this.getOffsetCoordinates(this.getDroppedOffset());
	}

	getRotated(rotationState) {
		let rotated = this.minos;
		for(let i = 0; i < rotationState; i++) {
			rotated = rotated.map((coordinate) => {
				return {
					x: coordinate.y,
					y: -coordinate.x
				};
			});
		}
		return rotated;
	}
}
export default Tetromino;
