import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IShippingField } from '../ReactHookForm/form-interface';
import { Navigate } from 'react-router';
import { login } from '../../redux/authReducer';

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		reset,
	} = useForm<IShippingField>({ mode: 'onBlur' });

	const onSubmit: SubmitHandler<IShippingField> = (data) => {
		props.login(data.email, data.password, data.rememberMe, data.captcha);
		if (props.isAuth) {
			reset({ email: '', password: '' });
		} else {
		}
	};
	if (props.isAuth) {
		return <Navigate to={'/profile'} />;
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						type="email"
						{...register('email', {
							required: 'Email is require field',
							pattern: {
								value: /.+@.+\..+/i,
								message: 'enter valide email',
							},
						})}
						placeholder="Email"
					/>
					{errors?.email && (
						<div style={{ color: 'red' }}>
							{errors.email.message}
						</div>
					)}
				</div>
				<div>
					<input
						type="password"
						{...register('password', {
							required: 'enter password required',
						})}
						placeholder="Password"
					/>

					{errors?.password && (
						<div style={{ color: 'red' }}>
							{errors.password.message}
						</div>
					)}
				</div>
				{props.captchaUrl && <img src={props.captchaUrl} />}
				{props.captchaUrl && (
					<input
						type="text"
						{...register('captcha', {
							required: true,
						})}
					/>
				)}

				<button type="submit" disabled={!isValid}>
					Send
				</button>
			</form>
			{watch('email')}
		</div>
	);
};

type MapDispatchPropsType = {
	login: (
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: any
	) => void;
};
type MapStatePropsType = {
	captchaUrl: string | null;
	isAuth: boolean;
};
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
