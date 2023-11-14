import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/api.ts';
import { PhotosType, UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType, InferActionsTypes } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

// type InitialStateType = {
// 	users: [] | Array<UserType>;
// 	pageSize: number | null;
// 	totalUsersCount: number | null;
// 	currentPage: number | null;
// 	isFetching: boolean;
// 	followingInProgress: [] | any;
// };

type InitialStateType = typeof initialState;

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 4,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, //array of users ids
};

const usersReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: true,
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: false,
				}),
			};
		case SET_USERS: {
			return { ...state, users: action.users };
		}
		case SET_CURRENT_PAGE: {
			return { ...state, currentPage: action.currentPage };
		}
		case SET_TOTAL_USERS_COUNT: {
			return { ...state, totalUsersCount: action.count };
		}
		case TOGGLE_IS_FETCHING: {
			return { ...state, isFetching: action.isFetching };
		}
		case TOGGLE_IS_FOLLOWING_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(
							(id: number) => id != action.userId
					  ),
			};
		}
		default:
			return state;
	}
};

//обобщаем типы экшенов и затем в редьюсер пишем обобщённый тип
type ActionsTypes = InferActionsTypes<typeof actions>;

// type FollowSuccessType = {
// 	type: typeof FOLLOW;
// 	userId: number;
// };
// type UnfollowSuccessType = {
// 	type: typeof UNFOLLOW;
// 	userId: number;
// };
// type SetUsersType = {
// 	type: typeof SET_USERS;
// 	users: [] | Array<UserType>;
// };
// type SetCurrentPageType = {
// 	type: typeof SET_CURRENT_PAGE;
// 	currentPage: number;
// };
// type SetUsersTotalCountType = {
// 	type: typeof SET_TOTAL_USERS_COUNT;
// 	count: number;
// };
// type ToggleIsFetchingType = {
// 	type: typeof TOGGLE_IS_FETCHING;
// 	isFetching: boolean;
// };
// type ToggleFollowingProgressType = {
// 	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
// 	isFetching: boolean;
// 	userId: number;
// };

export const actions = {
	//пакуем в обьект чтобы было удобно типизировать
	followSuccess: (userId: number) =>
		({
			type: FOLLOW,
			userId,
		} as const),
	unfollowSuccess: (userId: number) =>
		({
			type: UNFOLLOW,
			userId,
		} as const),
	setUsers: (users: [] | Array<UserType>) =>
		({
			type: SET_USERS,
			users,
		} as const),
	setCurrentPage: (currentPage: number) =>
		({
			type: SET_CURRENT_PAGE,
			currentPage,
		} as const),
	setUsersTotalCount: (totalUsersCount: number) =>
		({
			type: SET_TOTAL_USERS_COUNT,
			count: totalUsersCount,
		} as const),
	toggleIsFetching: (isFetching: boolean) =>
		({
			type: TOGGLE_IS_FETCHING,
			isFetching,
		} as const),

	toggleFollowingProgress: (isFetching: boolean, userId: number) =>
		({
			type: TOGGLE_IS_FOLLOWING_PROGRESS,
			isFetching,
			userId,
		} as const),
};

//1 вариант типизации санок через переменные
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;

export const requestUsers = (page: number, pageSize: number) => {
	//Санка креатор
	return async (dispatch: DispatchType, getState: GetStateType) => {
		// санка
		// let a = getState();
		dispatch(actions.toggleIsFetching(true));
		dispatch(actions.setCurrentPage(page));
		let data = await usersAPI.getUsers(page, pageSize);
		dispatch(actions.toggleIsFetching(false));
		dispatch(actions.setUsers(data.items));
		dispatch(actions.setUsersTotalCount(data.totalCount));
	};
};

const _followUnfollowFlow = async (
	dispatch: DispatchType,
	userId: number,
	apiMethod: any,
	actionCreator: (userId: number) => ActionsTypes
) => {
	dispatch(actions.toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actions.toggleFollowingProgress(false, userId));
};

//2 способ типизации Санок
type ThunkType = ThunkAction<
	Promise<void>,
	AppStateType,
	unknown,
	ActionsTypes
>;

export const follow = (userId: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.follow.bind(usersAPI),
			actions.followSuccess
		);
	};
};
export const unfollow = (userId: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.unfollow.bind(usersAPI),
			actions.unfollowSuccess
		);
	};
};

export default usersReducer;
