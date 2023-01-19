# temp

```

async function executeSample() {
	// import
	const { Rools, Rule } = require('rools');

	// facts
	const facts = {
		user: {
			name: 'frank',
			stars: 347,
		},
		weather: {
			temperature: 20,
			windy: true,
			rainy: false,
		},
	};

	// rules
	const ruleMoodGreat = new Rule({
		name: 'mood is great if 200 stars or more',
		when: (facts: any) => facts.user.stars >= 200,
		then: (facts: any) => {
			facts.user.mood = 'great';
		},
	});

	const ruleGoWalking = new Rule({
		name: 'go for a walk if mood is great and the weather is fine',
		when: [
			(facts: any) => facts.user.mood === 'great',
			(facts: any) => facts.weather.temperature >= 20,
			(facts: any) => !facts.weather.rainy,
		],
		then: (facts: any) => {
			facts.goWalking = true;
		},
	});

	// evaluation
	const rools = new Rools();
	await rools.register([ruleMoodGreat, ruleGoWalking]);
	const temp = await rools.evaluate(facts);

	console.dir(temp, {
		depth: null,
	});

	console.log('\n===================\n');

	console.dir(facts, {
		depth: null,
	});
}
```
