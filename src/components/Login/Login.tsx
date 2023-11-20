import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStateType } from '../../redux/redux-store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IShippingField } from '../ReactHookForm/form-interface';
import { Navigate } from 'react-router';
import { login } from '../../redux/authReducer';
import { AnyAction } from 'redux';

const Login: React.FC = (props) => {
	//пропсы из селекторов
	const captchaUrl = useSelector(
		(state: AppStateType) => state.auth.captchaUrl
	);
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

	//Диспатч
	const dispatch: AppDispatch = useDispatch(); //тип не забываем 
	//форма
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		reset,
	} = useForm<IShippingField>({ mode: 'onBlur' });

	const onSubmit: SubmitHandler<IShippingField> = (data) => {
		dispatch(
			login(
				data.email,
				data.password,
				data.rememberMe,
				data.captcha
			) as unknown as AnyAction // ну без этого не робит
		);
		if (isAuth) {
			reset({ email: '', password: '' });
		} else {
		}
	};
	if (isAuth) {
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
				{captchaUrl && <img src={captchaUrl} />}
				{captchaUrl && (
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

export default Login;
