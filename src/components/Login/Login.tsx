import React from 'react';
import style from '../common/FormsControl/FormsControls.module.css';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Input, createdField } from '../common/FormsControl/FormsControls.tsx';
import { required } from '../../utils/validators/validators.ts';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer.ts';
import { Navigate } from 'react-router';
import { AppStateType } from './../../redux/redux-store';

type LoginFormOwnProps = {
	captchaUrl: string | null;
};

const LoginForm: React.FC<
	InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & //для редакс форм и второй раз для себя
		LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>
			{createdField<LoginFormValuesTypeKeys>(
				'email',
				'Email',
				Input,
				'email',
				[required]
			)}
			{createdField<LoginFormValuesTypeKeys>(
				'password',
				'Password',
				Input,
				'password',
				[required]
			)}

			{createdField<LoginFormValuesTypeKeys>(
				'checkbox',
				'none',
				'input',
				//@ts-ignore
				'none',
				[],
				'Remember me'
			)}
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl &&
				createdField<LoginFormValuesTypeKeys>(
					'input',
					'Symbols from image',
					Input,
					'captcha',
					[required]
				)}
			{error && <div className={style.formSummaryError}>{error} </div>}
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	);
};
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
	form: 'login',
})(LoginForm);

type MapStatePropsType = {
	captchaUrl: string | null;
	isAuth: boolean;
};
type MapDispatchPropsType = {
	login: (
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: any
	) => void;
};

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

export type LoginFormValuesType = {
	//для отправки формочки
	email: string;
	password: string;
	rememberMe: boolean;
	captcha: string;
};

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
	const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
