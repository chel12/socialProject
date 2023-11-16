import { createSelector } from 'reselect';
import { AppStateType } from './redux-store.ts';

const getUsersSelector = (state: AppStateType) => {
	return state.usersPage.users;
};
export const getUsers = createSelector(getUsersSelector, (users) => {
	return users.filter((u) => true);
});
export const getPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize;
};
export const getUsersTotalCount = (state: AppStateType) => {
	return state.usersPage.totalUsersCount;
};
export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching;
};
export const GetFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress;
};

/* biblioteka reselect */
// export const getUsersSuper = createSelector(getUsers, (users) => {
//   users.filter((u) => true);
// });
