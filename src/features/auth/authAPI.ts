import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/endpoints";
import { LoginInterface, RegisterInterface } from "../../types/auth.types";

export const loginAPI = async (credentials: LoginInterface) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
  return response.data as string;
};

export const registerAPI = async (newUser: RegisterInterface) => {
  const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, newUser);
  return response.data as string; // Expected to return user data
};
