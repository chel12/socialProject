import React from 'react';
import { Field, Formik } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import { getTerm } from '../../redux/users-selectors';
import { useSelector } from 'react-redux';

type FormType = {
	term: string;
	friend: 'true' | 'false' | 'null';
};
type FriendFormType = 'true' | 'false' | 'null';
type PropsType = {
	onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchFormValidate = (values: any) => {
	//валидацию из формика перенесли сюды
	const errors = {};
	// if (!values.email) {
	// 	errors.email = 'Required';
	// } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
	// 	errors.email = 'Invalid email address';
	// }
	return errors;
};

type usersSearchFormValidate = {
	term: string;
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
	//соберет данные а потом  эти данные диспатчить нужно  в getUsers санку (можно сделать через Хук )
	const filter = useSelector(getTerm);
	const submit = (
		values: FormType,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void } //хз какой тип поэтому сделали, number и он подсказал какой тип должен быть
	) => {
		const filter: FilterType = {
			term: values.term,
			friend:
				values.friend === 'null'
					? null
					: values.friend === 'true'
					? true
					: false,
		};

		props.onFilterChanged(filter);
		setSubmitting(false);
	};
	return (
		<div>
			<Formik
				validate={UsersSearchFormValidate}
				initialValues={{
					term: filter.term,
					friend: String(filter.friend) as FriendFormType,
				}}
				onSubmit={submit}>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit}>
						<Field name="friend" as="select">
							<option value="null">All</option>
							<option value="true">Only followed</option>
							<option value="false">Only unfollowed </option>
						</Field>
						<input
							type="text" //типп
							name="term" //должен совпадать с initialValues
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.term}
						/>
						{errors.term && touched.term && errors.term}
						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
});
export default UsersSearchForm;