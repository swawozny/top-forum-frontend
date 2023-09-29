import { axiosInstance } from "./base";

export const getForums = () => {
  return axiosInstance.get("/forums");
};

export const getForum = (id: string) => {
  return axiosInstance.get(`/forum/${id}`);
};
