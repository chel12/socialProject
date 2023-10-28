import { createSelector } from 'reselect';

const getUsersSelector = (state) => {
	return state.usersPage.users;
};
export const getUsers = createSelector(getUsersSelector, (users) => {
	return users.filter((u) => true);
});
export const getPageSize = (state) => {
	return state.usersPage.pageSize;
};
export const getUsersTotalCount = (state) => {
	
	return state.usersPage.totalUsersCount;
};
export const getCurrentPage = (state) => {
	return state.usersPage.currentPage;
};
export const getIsFetching = (state) => {
	return state.usersPage.isFetching;
};
export const GetFollowingInProgress = (state) => {
	return state.usersPage.followingInProgress;
};

/* biblioteka reselect */
// export const getUsersSuper = createSelector(getUsers, (users) => {
//   users.filter((u) => true);
// });
