//validator 형식
//[테스트 함수, 검사 결과 코드이름, 검사 결과 디폴트 메시지]
const validator1 = [
	() => {
	
	
	 },
	'bad-word',
	'비속어를 사용하지 말아주세요.'
];

//validators 역할
//validator의 코드이름을 key로 해서 각 validator를 저장
const validators = {
	[validator1[1]]: validator1,
};

//반환 형식: [result code, result default message]
//예시: ['not-fit', '1자 이상 10자 이하로 입력해주세요.']
export function validateSearch(text) {
	const myValidators = [

	];

	return executeValidators(myValidators, text);
}

export function validateReview(text) {
	const myValidators = [

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
