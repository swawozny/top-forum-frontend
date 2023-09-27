import { axiosInstance } from "./base";

export const getForums = () => {
  return axiosInstance.get("/forums");
};
