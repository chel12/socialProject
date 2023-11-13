
import s from './FormsControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({  //для ошибок 
	input,
	meta: { touched, error },
	inputOrTextArea,
	...props
}) => {
	const hasError = touched && error;
	return (
		<div className={s.formControl + ' ' + (hasError ? s.error : '')}>
			<div className={hasError ? s.error : ''}>
				{inputOrTextArea ? (
					<textarea {...input} {...props} className={s.error} />
				) : (
					<input {...input} {...props} className={s.error} />
				)}
				<span>{hasError ? <div>{error}</div> : null}</span>
			</div>
		</div>
	);
};

export const TextArea = ({ input, meta, ...props }) => { //шаблон для текс ареа
	return (
		<FormControl
			{...props}
			{...props}
			meta={meta}
			input={input}
			inputOrTextArea={true}
		/>
	);
};

export const Input = ({ input, meta, props }) => { //шаблон для инпута 
	return (
		<FormControl
			{...props}
			meta={meta}
			input={input}
			inputOrTextArea={false}
		/>
	);
};

export const createdField = (  
	type,
	placeholder,
	component,
	name,
	validate,
	props = {},
	text = ''
) => (
	<div>
		<Field
			type={type}
			placeholder={placeholder}
			component={component}
			name={name}
			validate={validate}
			{...props}
		/>
		{text}
	</div>
);
