import { Dispatch } from 'redux';
import { usersAPI } from './../api/users-api.ts';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers.ts';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

//Иницилизация state reducer
let initialState = {
	users: [] as Array<UserType>,
	pageSize: 4,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, //array of users ids
};

//Reducer
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

//Actions
//пакуем в обьект чтобы было удобно типизировать
export const actions = {
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

//Санки
export const requestUsers = (page: number, pageSize: number): ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleIsFetching(true));
		dispatch(actions.setCurrentPage(page));
		let data = await usersAPI.getUsers(page, pageSize);
		dispatch(actions.toggleIsFetching(false));
		dispatch(actions.setUsers(data.items));
		dispatch(actions.setUsersTotalCount(data.totalCount));
	};
};

//Внутр универсал функция для подписки и отписки
const _followUnfollowFlow = async (
	dispatch: Dispatch<ActionsTypes>,
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

//Типы

//типизация иницилизации
type InitialStateType = typeof initialState;

//обобщаем типы экшенов и затем в редьюсер пишем обобщённый тип
type ActionsTypes = InferActionsTypes<typeof actions>;

//1 вариант типизации санок через переменные
type GetStateType = () => AppStateType;

//2 способ типизации Санок
// type ThunkType = ThunkAction<
// 	Promise<void>,
// 	AppStateType,
// 	unknown,
// 	ActionsTypes
// >;

//изменнеие 2 способа на baseType, чтобы не писать такую длинную запись
//Тип санок типизируем базовым тайпом с экшен тайпами
type ThunkType = BaseThunkType<ActionsTypes>;
