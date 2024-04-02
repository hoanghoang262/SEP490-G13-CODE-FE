interface TestCase {
	inputTypeInt: number | undefined;
	inputTypeString: string | undefined;
	expectedResultInt: number | undefined;
	expectedResultString: string | undefined;
	inputTypeBoolean: boolean | null | undefined;
	expectedResultBoolean: boolean | null | undefined;
	inputTypeArrayInt: string | undefined;
	inputTypeArrayString: string | undefined;
}

export function initTestCase(type: string): TestCase {
	switch (type) {
		case 'int':
			return {
				inputTypeInt: 0,
				inputTypeString: undefined,
				expectedResultInt: 0,
				expectedResultString: undefined,
				inputTypeBoolean: undefined,
				expectedResultBoolean: undefined,
				inputTypeArrayInt: undefined,
				inputTypeArrayString: undefined
			};
		case 'String':
			return {
				inputTypeInt: undefined,
				inputTypeString: 'string',
				expectedResultInt: undefined,
				expectedResultString: 'string',
				inputTypeBoolean: undefined,
				expectedResultBoolean: undefined,
				inputTypeArrayInt: undefined,
				inputTypeArrayString: undefined
			};
		case 'boolean':
			return {
				inputTypeInt: undefined,
				inputTypeString: undefined,
				expectedResultInt: undefined,
				expectedResultString: undefined,
				inputTypeBoolean: true,
				expectedResultBoolean: true,
				inputTypeArrayInt: undefined,
				inputTypeArrayString: undefined
			};
		case 'int[]':
			return {
				inputTypeInt: undefined,
				inputTypeString: undefined,
				expectedResultInt: undefined,
				expectedResultString: undefined,
				inputTypeBoolean: undefined,
				expectedResultBoolean: undefined,
				inputTypeArrayInt: undefined,
				inputTypeArrayString: undefined
			};
		case 'String[]':
			return {
				inputTypeInt: undefined,
				inputTypeString: undefined,
				expectedResultInt: undefined,
				expectedResultString: undefined,
				inputTypeBoolean: undefined,
				expectedResultBoolean: undefined,
				inputTypeArrayInt: undefined,
				inputTypeArrayString: undefined
			};
	}

	return {
		inputTypeInt: 0,
		inputTypeString: undefined,
		expectedResultInt: 0,
		expectedResultString: undefined,
		inputTypeBoolean: undefined,
		expectedResultBoolean: undefined,
		inputTypeArrayInt: undefined,
		inputTypeArrayString: undefined
	};
}

export interface answerOption {
	optionsText: string;
	correctAnswer: boolean;
}

export function initAnswer(correctAnswer: boolean): answerOption {
	return {
		optionsText: 'Answer',
		correctAnswer
	};
}

export interface answerExam {
	examId: number;
	optionsText: string;
	correctAnswer: boolean;
}

export function initAnswerExam(correctAnswer: boolean, examId: number): answerExam {
	return {
		examId,
		optionsText: 'Answer',
		correctAnswer
	};
}

export interface Question {
	contentQuestion: string;
	time: Number;
	answerOptions: answerOption[];
}

export function initQuestion(): Question {
	return {
		contentQuestion: 'Question',
		time: 3,
		answerOptions: [initAnswer(true), initAnswer(false)]
	};
}

export interface Lession {
	title: string;
	videoUrl: string;
	description: string;
	duration: Number;
	contentLesson: string;
	questions: Question[];
}

export function initLessions(): Lession {
	return {
		title: 'LessionsName',
		videoUrl: 'url',
		description: 'description',
		duration: 60 * 10,
		contentLesson: 'content',
		questions: [initQuestion()]
	};
}

export interface codeQuestion {
	description: string;
	codeForm: string;
	testCaseJava: string | undefined;
	testCaseC: string | undefined;
	testCaseCplus: string | undefined;
	//	testCases: TestCase[];
}

export function intitCodeQuestion(): codeQuestion {
	return {
		description: 'description',
		codeForm: '',
		testCaseJava: undefined,
		testCaseC: undefined,
		testCaseCplus: undefined
		//		testCases: [initTestCase('int')]
	};
}

export interface Chapter {
	Name: string;
	Description: string;
	Part: Number;
	codeQuestions: codeQuestion[];
	lessons: Lession[];
}

export function initChapter(): Chapter {
	return {
		Name: 'ChapterName',
		Description: 'Description',
		Part: 1,
		lessons: [initLessions()],
		codeQuestions: [intitCodeQuestion()]
	};
}

export interface questionExam {
	contentQuestion: string;
	answerExams: answerOption[] | answerExam[];
}

export function initQuestionExam(): questionExam {
	return {
		contentQuestion: 'contentQuestion',
		answerExams: [initAnswer(true), initAnswer(false)]
	};
}

export function initQuestionExam2(examId: number): questionExam {
	return {
		contentQuestion: 'contentQuestion',
		answerExams: [initAnswerExam(true, examId), initAnswerExam(false, examId)]
	};
}

export interface Exam {
	name: string;
	time: number;
	chapterId: number;
	percentageCompleted: number;
	questionExams: questionExam[];
}

export function initExam(chapterId: number): Exam {
	return {
		name: 'ExamName',
		time: 120,
		chapterId,
		percentageCompleted: 50,
		questionExams: [initQuestionExam()]
	};
}

export interface Message {
	msgCode: string;
	msgTextEN: string;
	msgTextVN: string;
}

export function initMessage(): Message {
	return {
		msgCode: '',
		msgTextEN: '',
		msgTextVN: ''
	};
}
