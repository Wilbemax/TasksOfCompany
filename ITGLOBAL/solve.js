function distributeBalls(capacity, resources) {
	const totalBalls = resources.reduce((sum, count) => sum + count, 0);
	const proportions = resources.map((count) => count / totalBalls);

	let distribution = proportions.map((p) => Math.floor(p * capacity));

	let remainingCapacity =
		capacity - distribution.reduce((sum, count) => sum + count, 0);

	while (remainingCapacity > 0) {
		let maxIndex = proportions
			.map((p, i) => [p * capacity - distribution[i], i])
			.sort((a, b) => b[0] - a[0])[0][1];
		distribution[maxIndex]++;
		remainingCapacity--;
	}

	return distribution;
}

const capacity = 12;
const resources = [20, 10, 30];
console.log(distributeBalls(capacity, resources));
