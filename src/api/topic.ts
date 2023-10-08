import { axiosInstance } from "./base";

export const getTopic = (id: string, page: number) => {
  return axiosInstance.get(`/topic/${id}?page=${page}`);
};
