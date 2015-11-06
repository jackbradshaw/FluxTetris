function algorithm1(numbers) {
	var stop = false;
	while(!stop) {
		stop = true;
		for(var i = 1; i < numbers.length; i++) {
			if(numbers[i-1] > numbers[i]) {
				var temp = numbers[i];
				numbers[i] = numbers[i -1];
				numbers[i - 1] = temp;
				stop = false;
			}
		}
	}
}

function algorithm2(n) {
	if(n === 0) return 1;
	return n * algorithm2(n - 1);
}

function algorithm3(n, sortedNumbers, start, stop) {
	if(stop <= start) {
		return false;
	}
	var m = start + Math.floor((stop - start) / 2);
	if(sortedNumbers[m] > n) {
		return algorithm3(n, sortedNumbers, start, m);
	} else if(sortedNumbers[m] < n) {
		return algorithm3(n, sortedNumbers, m + 1, stop);
	} else {
		return true;
	}
}

var array = [1,2,3,2,1];
algorithm1(array);
console.log(array[0] === 1 && array[1] === 1 && array[2] === 2 && array[3] === 2 && array[4] === 3);
console.log(algorithm2(3) === 6);
console.log(algorithm3(3, [1,2,3,4,5], 0, 5) === true);
console.log(algorithm3(7, [1,2,3,4,5], 0, 5) === false);
