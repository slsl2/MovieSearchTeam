const validators = {
	//[테스트 함수, 검사 결과 코드, 검사 결과 디폴트 메시지]
	'bad-word': [
		(text) => text.includes('나쁜말'),
		'bad-word',
		'비속어를 사용하지 말아주세요.'
	],
	'hacker': [
		(text) => /[<>]/.test(text),
		'hacker',
		'<>문자는 입력할 수 없습니다'
	],
	'not-fit': [
		(text) => text.length < 1 || text.length > 10,
		'not-fit',
		'1자 이상 10자 이하로 입력해주세요.'
	],
	'not-fit-longer': [
		(text) => text.length < 2 || text.length > 20,
		'not-fit-longer',
		'2자 이상 20자 이하로 입력해주세요.'
	],
};

//반환 형식: [result code, result default message]
//예시: ['not-fit', '1자 이상 10자 이하로 입력해주세요.']
export function validateSearch(text) {
	const myValidators = [
		validators['hacker'],
		validators['not-fit'],
	];

	return executeValidators(myValidators, text);
}

export function validateReview(text) {
	const myValidators = [
		validators['hacker'],
		validators['not-fit-longer'],
		validators['bad-word'],
	];

	return executeValidators(myValidators, text);
}

function executeValidators(validators, testValue) {
	for (const validator of validators) {
		if (validator[0](testValue)) {
			return [validator[1], validator[2]];
		}
	}
	return ['ok'];
}

//demonstrate();
function demonstrate() {
	console.log(validateReview('1'));
	console.log(validateReview('<script>'));
	console.log(validateReview('나쁜말'));

	console.log(validateSearch(''));
	console.log(validateSearch('<hackcode>'));
}
