import axios, * as others from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  follow(userId) {
    return instance.post(`follow/${userId}`, {});
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
};

export const getUsers2 = (currentPage, pageSize) => {
  return instance
    .get(`follow?page=${currentPage}&count=${pageSize}`)
    .then((response) => {
      return response.data;
    });
};