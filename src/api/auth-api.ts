import { instance, ResultCodesEnum, ResultCodeWithCaptcha } from './api.ts';

//общий тип где будем уточнять какая дата
type ResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D;
	messages: Array<string>;
	resultCode: RC;
};
//для me
type MeResponseType = {
	id: number;
	email: string;
	login: string;
};
//для логина
type LoginResponseType = {
	userId: number;
};

export const authAPI = {
	me() {
		return instance
			.get<ResponseType<MeResponseType>>(`auth/me`)
			.then((res) => res.data); //так как get put post Дженерики
		//вернули промис не который гетом, а промис который вернгулся thenom
	},
	login(
		email: string,
		password: string,
		rememberMe = false,
		captcha: null | string = null
	) {
		return instance
			.post<ResponseType<LoginResponseType,ResultCodesEnum | ResultCodeWithCaptcha>>('auth/login', {
				email,
				password,
				rememberMe,
				captcha,
			})
			.then((res) => res.data);
	},
	logout() {
		return instance.delete('auth/login');
	},
};
