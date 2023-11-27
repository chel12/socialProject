import { stopSubmit } from 'redux-form';
import { ResultCodesEnum, ResultCodeWithCaptcha } from '../api/api';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ChatMessageType } from '../pages/Chat/ChatPage';
import { chatAPI } from '../api/chat-api';
import { Dispatch } from 'redux';

const MESSAGES_RECEVIED = 'SN/chat/MESSAGES_RECEVIED';
const GET_CAPTCHA_URL_SUCCESS = 'SN/auth/GET_CAPTCHA_URL_SUCCESS';

//иницилизация state reducer
let initialState = {
	messages: [] as ChatMessageType[],
};

//Reducer
const chatReducer = (
	state = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case MESSAGES_RECEVIED:
			return {
				...state, //копируем старый стейт
				messages: [
					...state.messages /*забираем старые*/,
					...action.payload.messages,
				], // и копируем новые
			};

		default:
			return state;
	}
};

//Action
//все Actions упаковываем в const actions
export const actions = {
	messagesReceived: (messages: ChatMessageType[]) =>
		({
			type: MESSAGES_RECEVIED,
			payload: { messages },
		} as const),
};

//Санки

//получение
//функция для мемоизации, принимает и возвращает ничего
//вторые скобки чтобы обозначить тип
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

// //функция высшего порядка, чтоб достучаться до диспатча
// const newMessageHandlerCreator = (dispatch: Dispatch) => {
// 	if (_newMessageHandler !== null) {
// 		//подобие сеттеров и геттеров
// 		return _newMessageHandler;
// 	}
// 	//иначе инициализируем этой переменной
// 	_newMessageHandler = (messages) => {
// 		dispatch(actions.messagesReceived(messages)); // и теперь благодаря замыканию функция может пользоваться диспатчем
// 	};
// 	return _newMessageHandler; //уже возвращаем проинициализированным
// };

//функция высшего порядка, чтоб достучаться до диспатча
const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = (messages) => {
			dispatch(actions.messagesReceived(messages)); // и теперь благодаря замыканию функция может пользоваться диспатчем
		};
	}

	return _newMessageHandler; //уже возвращаем проинициализированным
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
	//чатАПИ я хочу подписаться на твои новые сообщения, поэтому я возьму и подписываюсь
	//передаю тебе колбек, в который ты передашь мне сообщения и когда ты их передашь, я получу их и отправлю в store
	chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
//
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
	//чатАПИ я хочу подписаться на твои новые сообщения, поэтому я возьму и подписываюсь
	//передаю тебе колбек, в который ты передашь мне сообщения и когда ты их передашь, я получу их и отправлю в store
	chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
};

export default chatReducer;

//Типы
export type InitialStateType = typeof initialState;

//Типы для экшенов
//додумай экшен тайп на основе константы actions
type ActionsType = InferActionsTypes<typeof actions>;

//Типы для санок
type ThunkType = BaseThunkType<ActionsType>;
