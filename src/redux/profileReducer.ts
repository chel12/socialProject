import { stopSubmit } from 'redux-form';
import { profileAPI } from './../api/profile-api.ts';
import { PhotosType, PostDataType, ProfileType } from '../types/types';
const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export type InitialStateType = typeof initialState;

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

const profileReducer = (
	state = initialState,
	action: any
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

type AddPostActionCreatorType = {
	type: typeof ADD_POST;
	newPostText: string;
};

export const addPostActionCreator = (
	newPostText: string
): AddPostActionCreatorType => ({
	type: ADD_POST,
	newPostText,
});

type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE;
	profile: ProfileType;
};
type SetStatusActionType = {
	type: typeof SET_STATUS;
	status: string;
};
type DeletePostActionType = {
	type: typeof DELETE_POST;
	postId: number;
};
type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS;
	photos: PhotosType;
};

export const setUserProfile = (
	profile: ProfileType
): SetUserProfileActionType => ({
	type: SET_USER_PROFILE,
	profile,
});

export const setStatus = (status: string): SetStatusActionType => ({
	type: SET_STATUS,
	status,
});

export const deletePost = (postId: number): DeletePostActionType => ({
	type: DELETE_POST,
	postId,
});

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
	const data = await profileAPI.getProfile(userId);
	dispatch(setUserProfile(data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
	let data = await profileAPI.getStatus(userId);
	dispatch(setStatus(data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
	try {
		let data = await profileAPI.updateStatus(status);
		if (data.resultCode === 0) {
			dispatch(setStatus(status));
		}
	} catch (error) {}
};

export const savePhoto = (file: any) => async (dispatch: any) => {
	let data = await profileAPI.savePhoto(file);
	if (data.resultCode === 0) {
		dispatch(savePhotoSuccess(data.data.photos));
	}
};

export const saveProfile =
	(profile: ProfileType) => async (dispatch: any, getState: any) => {
		const userId = getState().auth.userId;
		const data = await profileAPI.saveProfile(profile);
		if (data.resultCode === 0) {
			dispatch(getUserProfile(userId));
		} else {
			dispatch(
				stopSubmit('edit-profile', {
					_error: data.messages[0],
				})
			);
			return Promise.reject(data.messages[0]);
		}
	};

export default profileReducer;
