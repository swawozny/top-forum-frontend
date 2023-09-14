import { axiosInstance } from "./base";
import { UserData } from "../pages/SignUp";

export const signUp = (userData: UserData) => {
  return axiosInstance.post("/auth/signup", userData);
};

export const login = (email: string, password: string) => {
  return axiosInstance.post("/auth/login", {
    email,
    password
  });
};

export const confirmEmail = (email: string, activationCode: string) => {
  return axiosInstance.post("/auth/confirm-email", {
    email,
    activationCode
  });
};
