const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
	messagesData: [
		{ id: 1, message: 'Hello' },
		{ id: 2, message: 'You Best' },
		{ id: 3, message: 'Ahaha,cool' },
	],
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
	],
	newMessageBody: '',
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			state.newMessageBody = action.body;
			return state;
		case SEND_MESSAGE:
			let body = state.newMessageBody;
			state.newMessageBody = '';
			state.messagesData.push({ id: 8, message: body });
			return state;
		default:
			return state;
	}
};
export const sendMessageCreator = () => ({
	type: SEND_MESSAGE,
});
export const updateNewMessageBodyCreator = (body) => ({
	type: UPDATE_NEW_MESSAGE_BODY,
	body: body,
});
export default dialogsReducer;
