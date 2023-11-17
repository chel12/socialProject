import { stopSubmit } from 'redux-form';
import { profileAPI } from './../api/profile-api';
import { PhotosType, PostDataType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
const ADD_POST = 'SN/PROFILE/ADD-POST';
const DELETE_POST = 'SN/PROFILE/DELETE_POST';
const SET_USER_PROFILE = 'SN/PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'SN/PROFILE/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SN/PROFILE/SAVE_PHOTO_SUCCESS';

//инициал state reducer
let initialState = {
	postData: [
		{ id: 1, message: 'Hello', likeCount: 2 },
		{ id: 2, message: 'Moto Moto', likeCount: 12 },
		{ id: 3, message: 'Ahaha,cool', likeCount: 22 },
	] as Array<PostDataType>,
	profile: null as ProfileType | null,
	status: '',
	newPostText: '',
};

// reducer
const profileReducer = (
	state = initialState,
	action: ActionsType
): InitialStateType => {
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
				postData: state.postData.filter((p) => p.id != action.postId),
			};
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: {
					...state.profile,
					photos: action.photos,
				} as ProfileType,
			};
		}
		default:
			return state;
	}
};

//action
export const actions = {
	addPostActionCreator: (newPostText: string) =>
		({
			type: ADD_POST,
			newPostText,
		} as const),
	setUserProfile: (profile: ProfileType) =>
		({
			type: SET_USER_PROFILE,
			profile,
		} as const),
	setStatus: (status: string) =>
		({
			type: SET_STATUS,
			status,
		} as const),
	deletePost: (postId: number) =>
		({
			type: DELETE_POST,
			postId,
		} as const),
	savePhotoSuccess: (photos: PhotosType) =>
		({
			type: SAVE_PHOTO_SUCCESS,
			photos,
		} as const),
};

//Санки
export const getUserProfile =
	(userId: number): ThunkType =>
	async (dispatch) => {
		const data = await profileAPI.getProfile(userId);
		dispatch(actions.setUserProfile(data));
	};

export const getStatus =
	(userId: number): ThunkType =>
	async (dispatch) => {
		let data = await profileAPI.getStatus(userId);
		dispatch(actions.setStatus(data));
	};

export const updateStatus =
	(status: string): ThunkType =>
	async (dispatch) => {
		try {
			let data = await profileAPI.updateStatus(status);
			if (data.resultCode === 0) {
				dispatch(actions.setStatus(status));
			}
		} catch (error) {}
	};

export const savePhoto =
	(file: File): ThunkType =>
	async (dispatch) => {
		let data = await profileAPI.savePhoto(file);
		if (data.resultCode === 0) {
			dispatch(actions.savePhotoSuccess(data.data.photos));
		}
	};

export const saveProfile =
	(profile: ProfileType): ThunkType =>
	async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const data = await profileAPI.saveProfile(profile);
		if (data.resultCode === 0) {
			if (userId != null) {
				dispatch(getUserProfile(userId));
			} else {
				throw new Error('userId can`t be null');
			}
		} else {
			//@ts-ignore
			dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
			return Promise.reject(data.messages[0]);
		}
	};

export default profileReducer;

//ТИПЫ
export type InitialStateType = typeof initialState;
//для экшен
type ActionsType = InferActionsTypes<typeof actions>;
// для санки
type ThunkType = BaseThunkType<ActionsType>;
