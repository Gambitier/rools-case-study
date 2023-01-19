import * as _ from 'lodash';
import * as fs from 'fs';
import { UserClinicalInformaation } from './types/UserClinicalInformaation.type';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

async function main() {
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

async function executeDiseaseUsecase() {
	// facts
	const facts: UserClinicalInformaation[] = require('./facts.json');

	const promises = facts.map(async (fact) => await evaluateFact(fact));

	const evaluations = await Promise.all(promises);

	fs.writeFileSync('./evaluations.json', JSON.stringify(evaluations));
}

async function evaluateFact(fact: UserClinicalInformaation) {
	// import
	const { Rools, Rule } = require('rools');
	const rools = new Rools();
	const ruleFormProvidedShouldBeOfBloodPressure = new Rule({
		name: 'form subitted is for BP, if user has BP',
		when: (fact: UserClinicalInformaation) => {
			const userHasBP = fact.clinicalInfo.diseases.find(
				(disease) => disease.name == 'BP'
			);

			return !!userHasBP;
		},
		then: (fact: UserClinicalInformaation) => {
			if (!fact.forms) {
				fact.forms = [];
			}
			fact.forms.push('BP');
		},
	});

	await rools.register([ruleFormProvidedShouldBeOfBloodPressure]);

	const ruleFormProvidedShouldBeOfDiabetes = new Rule({
		name: 'form subitted is for diabetes, if user has diabetes',
		when: (fact: UserClinicalInformaation) => {
			const userHasDiabetes = fact.clinicalInfo.diseases.find(
				(disease) => disease.name == 'diabetes'
			);

			return !!userHasDiabetes;
		},
		then: (fact: UserClinicalInformaation) => {
			if (!fact.forms) {
				fact.forms = [];
			}
			fact.forms.push('diabetes');
		},
	});

	await rools.register([ruleFormProvidedShouldBeOfDiabetes]);

	const temp = await rools.evaluate(fact);
	console.dir(temp, {
		depth: null,
	});
	console.log('\n===================\n');
	console.dir(fact, {
		depth: null,
	});

	return fact;
}
