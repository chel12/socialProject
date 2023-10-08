const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
  messagesData: [
    { id: 1, message: "Hello" },
    { id: 2, message: "You Best" },
    { id: 3, message: "Ahaha,cool" },
  ],
  dialogsData: [
    { id: 1, name: "Dimas" },
    { id: 2, name: "Pavel" },
    { id: 3, name: "Piter" },
    { id: 4, name: "Kolya" },
    { id: 5, name: "Anna" },
    { id: 6, name: "Olga" },
    { id: 7, name: "Sveta" },
    { id: 8, name: "Yura" },
    { id: 9, name: "Pancho" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
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
export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
