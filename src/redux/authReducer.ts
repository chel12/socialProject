import { stopSubmit } from 'redux-form';
import { ResultCodesEnum, ResultCodeWithCaptcha } from '../api/api.ts';
import { authAPI } from '../api/auth-api.ts';
import { securityAPI } from '../api/security-api.ts';
import { BaseThunkType, InferActionsTypes } from './redux-store.ts';

const SET_USER_DATA = 'SN/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'SN/auth/GET_CAPTCHA_URL_SUCCESS';

//иницилизация state reducer
let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null,
};

//Reducer
const authReducer = (
	state = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};

//Action
//все Actions упаковываем в const actions
export const actions = {
	setAuthUserData: (
		userId: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean
	) =>
		({
			type: SET_USER_DATA,
			payload: { userId, email, login, isAuth },
		} as const),

	getCaptchaUrlSuccess: (captchaUrl: string) =>
		({
			type: GET_CAPTCHA_URL_SUCCESS,
			payload: { captchaUrl },
		} as const),
};

//Санки
export const login =
	(
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: any
	): ThunkType =>
	async (dispatch) => {
		let loginData = await authAPI.login(
			email,
			password,
			rememberMe,
			captcha
		);

		if (loginData.resultCode === ResultCodesEnum.Success) {
			dispatch(getAuthUserData());
		} else {
			if (
				loginData.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired
			) {
				dispatch(getCaptchaUrl());
			}
			let message =
				loginData.messages.length > 0
					? loginData.messages[0]
					: 'Some error';
			dispatch(stopSubmit('login', { _error: message }));
		}
	};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	const data = await securityAPI.getCaptchaUrl();
	const captchaUrl = data.url;
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let meData = await authAPI.me();
	if (meData.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = meData.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	}
};

export default authReducer;

//Типы
export type InitialStateType = typeof initialState;

//Типы для экшенов
//додумай экшен тайп на основе константы actions
type ActionsType = InferActionsTypes<typeof actions>;

//Типы для санок
type ThunkType = BaseThunkType<ActionsType>;

//Это была отдельная типизация для экшенов
// type SetAuthUserDataActionPayloadType = {
// 	userId: number | null;
// 	email: string | null;
// 	login: string | null;
// 	isAuth: boolean;
// };
//Это была отдельная типизация для экшенов
// type SetAuthUserDataActionType = {
// 	type: typeof SET_USER_DATA;
// 	payload: SetAuthUserDataActionPayloadType;
// };
// type GetCaptchaUrlSuccessActionType = {
// 	type: typeof GET_CAPTCHA_URL_SUCCESS;
// 	payload: { captchaUrl: string };
// };
