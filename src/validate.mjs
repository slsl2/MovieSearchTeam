//validator 형식
//[테스트 로직, 검사 결과 코드, 검사 결과 디폴트 메시지]
const validators = initializeValidators();

/*
* 반환 형식: [result code, result default message]
* 예시: ['not-fit-1-10', '1자 이상 10자 이하로 입력해주세요.']
*
* validatorsToUse에 추가된 validator 순서대로  
* 검증이 진행되고 먼저 미통과된 검증이 있으면 
* 그 검증을 반환하고 나머지 검증은 진행되지 않습니다.
*/
export function validateSearch(text) {
	const validatorsToUse = [
		validators['hacker'],
		validators['not-fit-1-10'],
	];

	return executeValidators(validatorsToUse, text);
}

export function validateReview(text) {
	const validatorsToUse = [
		validators['hacker'],
		validators['not-fit-2-20'],
		validators['bad-word'],
	];

	return executeValidators(validatorsToUse, text);
}

export function validatePassword(text) {
	const validatorsToUse = [
		validators['has-whitespace'],
		validators['hacker'],
		validators['not-fit-4-20'],
		validators['lack-alphanumspecial'],
	];

	return executeValidators(validatorsToUse, text);
}

export function validateNickname(text) {
	const validatorsToUse = [
		validators['has-whitespace'],
		validators['not-fit-4-20'],
		validators['has-non-alphanum-char'],
		validators['bad-word'],
		validators['hacker'],
	];

	return executeValidators(validatorsToUse, text);
}

function executeValidators(validators, testValue) {
	//전처리
	testValue = testValue.trim();

	for (const validator of validators) {
		if (!validator) {
			const e = new Error('존재하지 않는 validator 사용 ' +
				'validatorToUse 설정 부분 확인');
			console.error(e.stack);
		}

		const validateNotPassed = validator[0](testValue);
		//유효성 검사 비통과. 결과 코드와 디폴트 메시지 반환.
		if (validateNotPassed) {
			return [validator[1], validator[2]];
		}
	}
	// 유효성 검사 통과. 문제가 없기 때문에 메시지 없음.
	return ['ok'];
}

function initializeValidators() {
	//[테스트 로직, 검사 결과 코드, 검사 결과 디폴트 메시지]
	return {
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
		'not-fit-1-10': [
			(text) => text.length < 1 || text.length > 10,
			'not-fit-1-10',
			'1자 이상 10자 이하로 입력해주세요.'
		],
		'not-fit-2-20': [
			(text) => text.length < 2 || text.length > 20,
			'not-fit-2-20',
			'2자 이상 20자 이하로 입력해주세요.'
		],
		'not-fit-4-20': [
			(text) => text.length < 4 || text.length > 20,
			'not-fit-4-20',
			'4자 이상 20자 이하로 입력해주세요.'
		],
		'has-whitespace': [
			(text) => /\s/.test(text),
			'has-whitespace',
			'공백문자를 포함할 수 없습니다.',
		],
		'has-non-alphanum-char': [
			(text) => /[^0-9a-zA-Z]/.test(text),
			'has-non-alphanum-char',
			'특수문자는 사용할 수 없습니다.',
		],
		'lack-alphanumspecial': [
			(text) => !(/[0-9]/.test(text) &&
				/[a-zA-Z]/.test(text) &&
				/[!@#$%^&*()_=+?\-]/.test(text)),
			'lack-alphanumspecial',
			'숫자, 영문자, 특수문자(!@#$%^&*()_=+?- 중)를 모두 포함해주세요.',
		],
	};
}

//test();
function test() {
	logger(validateReview, '1');
	logger(validateReview, '<script>');
	logger(validateReview, '나쁜말');
	logger(validateReview, '          ');
	console.log('');

	logger(validateSearch, '');
	logger(validateSearch, '  ');
	logger(validateSearch, '<hackcode>');
	console.log('');

	logger(validatePassword, '123abc');
	logger(validatePassword, '123 abc');
	logger(validatePassword, '123!abc');
	logger(validatePassword, '1!Z');
	console.log('');

	logger(validateNickname, '123 abc');
	logger(validateNickname, 'abc!@#');
	logger(validateNickname, '나쁜말');
	logger(validateNickname, '나');
	logger(validateNickname, '    z    ');

	console.log('');

	function logger(validateFn, param) {
		const [code, msg] = validateFn(param);
		console.log(`${validateFn.name}('${param}')`);
		console.log(`  => ['${code}', '${msg}']`);
	}
}

