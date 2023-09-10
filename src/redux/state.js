const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";
let store = {
  _state: {
    profilePage: {
      postData: [
        { id: 1, message: "Hello", likeCount: 2 },
        { id: 2, message: "Moto Moto", likeCount: 12 },
        { id: 3, message: "Ahaha,cool", likeCount: 22 },
      ],
      newPostText: "",
    },
    dialogsPage: {
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
      newMessageBody: "",
    },
  },
  _callSubscriber() {},
  getState() {
    return this._state;
  },
  //   addPost() {
  //     let newPost = {
  //       id: 5,
  //       message: this._state.profilePage.newPostText,
  //       likeCount: 0,
  //     };
  //     this._state.profilePage.postData.push(newPost);
  //     this._state.profilePage.newPostText = "";
  //     this._callSubscriber(this._state);
  //   },
  //   updateNewPostText(newText) {
  //     this._state.profilePage.newPostText = newText;
  //     this._callSubscriber(this._state);
  //   },
  subscribe(observer) {
    this._callSubscriber = observer; //observer наблюдатель(патрон)
    //publisher-subscriber//addEventListener
    //патрон это наблюдатель который смотрит за обьектом и уведомляет если что-то произошло
  },
  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likeCount: 0,
      };
      this._state.profilePage.postData.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let body = this._state.dialogsPage.newMessageBody;
      this._state.dialogsPage.newMessageBody = "";
      this._state.dialogsPage.messagesData.push({ id: 8, message: body });
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};
export const sendMessageCreator = () => ({
  type: SEND_MESSAGE,
});
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default store;
window.store = store;
//store - OOP
