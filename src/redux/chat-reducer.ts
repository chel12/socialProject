import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ChatMessageType } from '../pages/Chat/ChatPage';
import { chatAPI, StatusType } from '../api/chat-api';
import { Dispatch } from 'redux';

const MESSAGES_RECEVIED = 'SN/chat/MESSAGES_RECEVIED';
const STATUS_CHANGED = 'SN/chat/STATUS_CHANGED';

//иницилизация state reducer
let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType,
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
		case STATUS_CHANGED:
			return {
				...state,
				status: action.payload.status,
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
	statusChanged: (status: StatusType) =>
		({
			type: STATUS_CHANGED,
			payload: { status },
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

//для статуса
let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = (status) => {
			dispatch(actions.statusChanged(status)); // и теперь благодаря замыканию функция может пользоваться диспатчем
		};
	}

	return _newMessageHandler; //уже возвращаем проинициализированным
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
	chatAPI.start();
	//чатАПИ я хочу подписаться на твои новые сообщения, поэтому я возьму и подписываюсь
	//передаю тебе колбек, в который ты передашь мне сообщения и когда ты их передашь, я получу их и отправлю в store
	chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch));
	//@ts-ignore
	chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};
//
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
	//чатАПИ я хочу подписаться на твои новые сообщения, поэтому я возьму и подписываюсь
	//передаю тебе колбек, в который ты передашь мне сообщения и когда ты их передашь, я получу их и отправлю в store
	chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch));
	//@ts-ignore
	chatAPI.unsubscribe(
		'status-changed',
		//@ts-ignore
		statusChangedHandlerCreator(dispatch)
	);
	chatAPI.stop();
};
export const sendMessage =
	(message: string): ThunkType =>
	async (dispatch) => {
		//чатАПИ я хочу подписаться на твои новые сообщения, поэтому я возьму и подписываюсь
		//передаю тебе колбек, в который ты передашь мне сообщения и когда ты их передашь, я получу их и отправлю в store
		chatAPI.sendMessage(message);
	};

export default chatReducer;

//Типы
export type InitialStateType = typeof initialState;

//Типы для экшенов
//додумай экшен тайп на основе константы actions
type ActionsType = InferActionsTypes<typeof actions>;

//Типы для санок
type ThunkType = BaseThunkType<ActionsType>;
