import { profileAPI, usersAPI } from '../api/api';
const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
	postData: [
		{ id: 1, message: 'Hello', likeCount: 2 },
		{ id: 2, message: 'Moto Moto', likeCount: 12 },
		{ id: 3, message: 'Ahaha,cool', likeCount: 22 },
	],
	profile: null,
	status: '',
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 5,
				message: action.newPostText,
				likeCount: 0,
			};
			return {
				...state,
				postData: [...state.postData, newPost],
				newPostText: '',
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile,
			};
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status,
			};
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter((p) => p.postId != action.postId),
			};
		}
		default:
			return state;
	}
};
//Экшен Креатор функция-> возвращает обьект (action)
//(action) это обьект в который инкапсулированы все данные, для того чтобы
//редьюсер получил эти данные и применил изменения на state свой
//({type: SET_USER_PROFILE -- какое действие
// profile и где взять

export const addPostActionCreator = (newPostText) => ({
	type: ADD_POST,
	newPostText,
});
export const deletePost = (postId) => ({
	type: DELETE_POST,
	postId,
});
export const setUserProfile = (profile) => ({
	type: SET_USER_PROFILE,
	profile,
});
export const setStatus = (status) => ({
	type: SET_STATUS,
	status,
});

export const getUserProfile = (userId) => async (dispatch) => {
	let response = await usersAPI.getProfile(userId);
	dispatch(setUserProfile(response.data));
};
export const getStatus = (userId) => async (dispatch) => {
	let response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response.data));
};
export const updateStatus = (status) => async (dispatch) => {
	let response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setStatus(status));
	}
};

export default profileReducer;
