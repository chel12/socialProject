import React from 'react';
import style from '../common/FormsControl/FormsControls.module.css';
import { Field, reduxForm } from 'redux-form';
import { Input, createdField } from '../common/FormsControl/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer.ts';
import { Navigate } from 'react-router';
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>
			{createdField('email', 'Email', Input, 'email', [required])}
			{createdField('password', 'Password', Input, 'password', [
				required,
			])}
			{createdField(
				'checkbox',
				'none',
				'input',
				'none',
				[],
				'Remember me'
			)}
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl &&
				createdField('input', 'Symbols from image', Input, 'captcha', [
					required,
				])}
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
		props.login(
			formData.email,
			formData.password,
			formData.rememberMe,
			formData.captcha
		);
	};
	if (props.isAuth) {
		return <Navigate to={'/profile'} />;
	}
	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
