import React from 'react';
import style from '../common/FormsControl/FormsControls.module.css';
import { Field, reduxForm } from 'redux-form';
import { Input, createdField } from '../common/FormsControl/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer';
import { Navigate } from 'react-router';
const LoginForm = ({ handleSubmit, error }) => {
	return (
		<form onSubmit={handleSubmit}>
			
				{createdField('email', 'Email', Input, 'email', [required])}
				{/* <Field
					type={'email'}
					placeholder="Email"
					component={Input}
					name={'email'}
					validate={[required]}
				/> */}
			
				{createdField('password', 'Password', Input, 'password', [
					required,
				])}
				{/* <Field
					type={'password'}
					placeholder="Password"
					component={Input}
					name={'password'}
					validate={[required]}
				/> */}
			
				{createdField(
					'checkbox',
					'none',
					'input',
					'none',
					[],
					'Remember me'
				)}
				{/* <Field
					type="checkbox"
					component={'input'}
					name={'rememberMe'}
				/>
				remember me */}
			
			{error && <div className={style.formSummaryError}>{error} </div>}
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	);
};
const LoginReduxForm = reduxForm({
	form: 'login',
})(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe);
	};
	if (props.isAuth) {
		return <Navigate to={'/profile'} />;
	}
	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
