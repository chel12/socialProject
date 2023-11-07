const SEND_MESSAGE = 'SEND_MESSAGE';

type MessagesDataType = {
	id: number;
	message: string;
};
type dialogsDataType = {
	id: number;
	name: string;
};

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

export type InitialStateType = typeof initialState;

const dialogsReducer = (
	state = initialState,
	action: any
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

type SendMessageCreatorActionType = {
	type: typeof SEND_MESSAGE;
	newMessageBody: string;
};

export const sendMessageCreator = (
	newMessageBody: string
): SendMessageCreatorActionType => ({
	type: SEND_MESSAGE,
	newMessageBody,
});

export default dialogsReducer;
