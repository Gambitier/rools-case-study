import * as _ from 'lodash';
import * as fs from 'fs';
import { UserClinicalInformaation } from './types/UserClinicalInformaation.type';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

async function main() {
	// await executeSample();
	await executeDiseaseUsecase();
}

main()
	.then(async () => {
		// await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		// await prisma.$disconnect();
		process.exit(1);
	});

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

async function executeDiseaseUsecase() {
	// import
	const { Rools, Rule } = require('rools');

	// facts
	const facts: UserClinicalInformaation[] = require('./facts.json');

	const rools = new Rools();

	for (const fact of facts) {
		await evaluateFact(Rule, rools, fact);
	}
}

async function evaluateFact(
	Rule: any,
	rools: any,
	fact: UserClinicalInformaation
) {
	const ruleFormProvidedShouldBeOfBloodPressure = new Rule({
		name: 'form subitted is for BP, if user has BP',
		when: (fact: UserClinicalInformaation) => {
			const userHasBP =
				fact.clinicalInfo.diseases.filter((disease) => disease.name == 'BP')
					.length > 0;

			return userHasBP;
		},
		then: (fact: UserClinicalInformaation) => {
			if (!fact.forms) {
				fact.forms = [];
			}
			fact.forms.push('BP');
		},
	});

	await rools.register([ruleFormProvidedShouldBeOfBloodPressure]);

	const temp = await rools.evaluate(fact);
	console.dir(temp, {
		depth: null,
	});
	console.log('\n===================\n');
	console.dir(fact, {
		depth: null,
	});
}
