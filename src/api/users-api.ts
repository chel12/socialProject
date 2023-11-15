import { GetItemsType, instance, APIResponseType } from './api.ts';

//типизируем get вынос в api

export const usersAPI = {
	getUsers(currentPage, pageSize) {
		return instance
			.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
			.then((res) => {
				return res.data;
			});
	},
	follow(userId) {
		return instance
			.post<APIResponseType>(`follow/${userId}`)
			.then((res) => res.data);
	},
	unfollow(userId) {
		return instance
			.delete(`follow/${userId}`)
			.then((res) => res.data) as Promise<APIResponseType>;
	},
};
