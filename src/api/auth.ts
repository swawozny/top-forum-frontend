import { axiosInstance } from "./base";
import { UserData } from "../pages/SignUp";

export const signUp = (userData: UserData) => {
  return axiosInstance.post("/auth/signup", userData);
};
