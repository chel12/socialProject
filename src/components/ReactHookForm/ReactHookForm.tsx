import { connect } from 'react-redux';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IShippingField } from './form-interface';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router';
import { AppStateType } from '../../redux/redux-store';

const ReactHookForm: React.FC<MapStatePropsType & MapDispatchPropsType> = (
	props
) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm<IShippingField>();

	const onSubmit: SubmitHandler<IShippingField> = (data) => {
		props.login(data.email, data.password, data.rememberMe, data.captcha);
		reset({ email: '', password: '' });
	};
	if (props.isAuth) {
		return <Navigate to={'/profile'} />;
	}
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
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
					<div style={{ color: 'red' }}>{errors.email.message}</div>
				)}
				<input
					type="password"
					{...register('password', {
						// тут аналогично как и выше
						required: ' enter password',
					})}
					placeholder="Password"
				/>
				{errors?.password && (
					<div style={{ color: 'red' }}>
						{errors.password.message}
					</div>
				)}
				<button type="submit">Send</button>
			</form>
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

export default connect(mapStateToProps, { login })(ReactHookForm);
