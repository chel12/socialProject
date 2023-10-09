import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControl/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer';
import { Navigate } from 'react-router';
const LoginForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					type={'email'}
					placeholder="Email"
					component={Input}
					name={'email'}
					validate={[required]}
				/>
			</div>
			<div>
				<Field
					type={'password'}
					placeholder="Password"
					component={Input}
					name={'password'}
					validate={[required]}
				/>
			</div>
			<div>
				<Field
					type="checkbox"
					component={'input'}
					name={'rememberMe'}
				/>
				remember me
			</div>
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
