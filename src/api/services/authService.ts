import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const fetchUsers = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.USERS);
  return data;
};

export const createUser = async (user: { name: string; email: string }) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.USERS, user);
  return data;
};
