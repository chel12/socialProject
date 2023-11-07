import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';
const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

type PostDataType = {
	id: number;
	message: string;
	likeCount: number;
};

type ProfileType = {
	userId: number;
	lookingForAJob: boolean;
	lookingForAJobDescription: string;
	fullName: string;
	contacts: ContactsType;
	photos: PhotosType;
};

type ContactsType = {
	github: string;
	vk: string;
	facebook: string;
	instagram: string;
	twitter: string;
	website: string;
	youtube: string;
	mainLink: string;
};

type PhotosType = {
	small: string | null;
	large: string | null;
};

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
	let response = await usersAPI.getProfile(userId);
	dispatch(setUserProfile(response.data));
};
export const getStatus = (userId: number) => async (dispatch: any) => {
	let response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
	try {
		let response = await profileAPI.updateStatus(status);
		if (response.data.resultCode === 0) {
			dispatch(setStatus(status));
		}
	} catch (error) {}
};
export const savePhoto = (file: any) => async (dispatch: any) => {
	let response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
};
export const saveProfile =
	(profile: ProfileType) => async (dispatch: any, getState: any) => {
		const userId = getState().auth.userId;
		const response = await profileAPI.saveProfile(profile);
		if (response.data.resultCode === 0) {
			dispatch(getUserProfile(userId));
		} else {
			dispatch(
				stopSubmit('edit-profile', {
					_error: response.data.messages[0],
				})
			);
			return Promise.reject(response.data.messages[0]);
		}
	};

export default profileReducer;
