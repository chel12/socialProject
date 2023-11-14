import axios, * as others from 'axios';
import { UserType } from '../types/types';

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}
//enum перечисление для кодов ошибок

// новый обьект для типизации
export enum ResultCodeWithCaptcha {
	CaptchaIsRequired = 10,
}
//axios типизирован внутри
//get post put является genericom


//общий тип где будем уточнять какая дата
export type ResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D;
	messages: Array<string>;
	resultCode: RC;
};


export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export type GetItemsType = {
	items: Array<UserType>;
	totalCount: number;
	error: string | null;
};
