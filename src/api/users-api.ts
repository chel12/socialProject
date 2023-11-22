import { GetItemsType, instance, APIResponseType } from './api';

//типизируем get вынос в api

export const usersAPI = {
	getUsers(currentPage: number, pageSize: number, term: string = '') {
		return instance
			.get<GetItemsType>(
				`users?page=${currentPage}&count=${pageSize}&term=${term}`
			)
			.then((res) => {
				return res.data;
			});
	},
	follow(userId: number) {
		return instance
			.post<APIResponseType>(`follow/${userId}`)
			.then((res) => res.data);
	},
	unfollow(userId: number) {
		return instance
			.delete(`follow/${userId}`)
			.then((res) => res.data) as Promise<APIResponseType>;
	},
};
