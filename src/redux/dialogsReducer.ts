import { InferActionsTypes } from './redux-store';

const SEND_MESSAGE = 'SN/DIALOGS/SEND_MESSAGE';

//иниц state reducer
let initialState = {
	messagesData: [
		{ id: 1, message: 'Hello' },
		{ id: 2, message: 'You Best' },
		{ id: 3, message: 'Ahaha,cool' },
	] as Array<MessagesDataType>,
	dialogsData: [
		{ id: 1, name: 'Dimas' },
		{ id: 2, name: 'Pavel' },
		{ id: 3, name: 'Piter' },
		{ id: 4, name: 'Kolya' },
		{ id: 5, name: 'Anna' },
		{ id: 6, name: 'Olga' },
		{ id: 7, name: 'Sveta' },
		{ id: 8, name: 'Yura' },
		{ id: 9, name: 'Pancho' },
	] as Array<dialogsDataType>,
};

//Reducer
const dialogsReducer = (
	state = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case SEND_MESSAGE:
			let body = action.newMessageBody;
			return {
				...state,
				messagesData: [...state.messagesData, { id: 8, message: body }],
			};
		default:
			return state;
	}
};

// Action
export const actions = {
	sendMessageCreator: (newMessageBody: string) => ({
		type: SEND_MESSAGE,
		newMessageBody,
	}),
};

export default dialogsReducer;

//Типы
export type InitialStateType = typeof initialState;
type MessagesDataType = {
	id: number;
	message: string;
};
type dialogsDataType = {
	id: number;
	name: string;
};

type ActionsType = InferActionsTypes<typeof actions>;
