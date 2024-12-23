import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/endpoints";
import { CreatePostRequest, PostResponse } from "../../types/posts.types";

export const createPostAPI = async (token: string, post: CreatePostRequest) => {
  // const token = useSelector((state: RootState) => state.auth.token);
  const response = await axiosInstance.post(API_ENDPOINTS.POSTS, post, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data as PostResponse;
};

export const updatePostAPI = async (
  token: string,
  post_id: number,
  post: CreatePostRequest
) => {
  // const token = useSelector((state: RootState) => state.auth.token);
  const response = await axiosInstance.post(
    API_ENDPOINTS.POSTS + `/${post_id}`,
    post,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return response.data as PostResponse;
};

export const getPostAPI = async (token: string, post_id: number) => {
  // const token = useSelector((state: RootState) => state.auth.token);
  const response = await axiosInstance.get(
    API_ENDPOINTS.POSTS + `/${post_id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return response.data as PostResponse;
};

export const getPostsAPI = async (token: string) => {
  // const token = useSelector((state: RootState) => state.auth.token);
  const response = await axiosInstance.get(API_ENDPOINTS.POSTS, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data as PostResponse[];
};

export const deletePostAPI = async (token: string, post_id: number) => {
  // const token = useSelector((state: RootState) => state.auth.token);
  const response = await axiosInstance.delete(
    API_ENDPOINTS.POSTS + `/${post_id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return response.data as boolean;
};
