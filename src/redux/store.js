import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';

let store = {
	_state: {
		profilePage: {
			postData: [
				{ id: 1, message: 'Hello', likeCount: 2 },
				{ id: 2, message: 'Moto Moto', likeCount: 12 },
				{ id: 3, message: 'Ahaha,cool', likeCount: 22 },
			],
			newPostText: '',
		},
		dialogsPage: {
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
		this._state.dialogsPage = dialogsReducer(
			this._state.dialogsPage,
			action
		);
		this._state.profilePage = profileReducer(
			this._state.profilePage,
			action
		);
		this._callSubscriber = this._state;
	},
};




export default store;
window.store = store;
//store - OOP
