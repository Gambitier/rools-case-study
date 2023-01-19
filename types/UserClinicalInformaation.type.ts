export interface UserClinicalInformaation {
	userInfo: UserInfo;
	clinicalInfo: ClinicalInfo;
	forms: string[];
}

export interface ClinicalInfo {
	diseases: Disease[];
}

export interface Disease {
	name: string;
	firstDiagnosisOn: Date;
}

export interface UserInfo {
	firstName: string;
	lastName: string;
	age: number;
}
