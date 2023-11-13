//так как валидаторы одинаковые, создаём тип для них
export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (values) => {
	if (values) return undefined;

	return 'Field is required';
};

export const maxLengthCreator =
	(maxLength: number): FieldValidatorType =>
	(values) => {
		if (values.length > maxLength)
			return `Max lenght is ${maxLength} symbols`;
		return undefined;
	};
