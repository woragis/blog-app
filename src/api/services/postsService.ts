import {
  CreatePostRequest,
  PostResponse,
  UpdatePostRequest,
} from "../../types/posts.types";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const fetchPosts = async () => {
  console.log("Post service: starting axios get request");
  const { data } = await axiosInstance.get(API_ENDPOINTS.POSTS);
  console.log("Post service: finished axios get request");
  return data as PostResponse;
};

export const createPost = async (post: CreatePostRequest) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.USERS, post);
  return data as PostResponse;
};

export const fetchPost = async (post_id: number) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.POSTS + `/${post_id}`);
  return data as PostResponse;
};

export const updatePost = async (
  post_id: number,
  updatedPost: UpdatePostRequest
) => {
  const { data } = await axiosInstance.put(
    API_ENDPOINTS.POSTS + `/${post_id}`,
    updatedPost
  );
  return data as PostResponse;
};

export const deletePost = async (post_id: number) => {
  const { data } = await axiosInstance.delete(
    API_ENDPOINTS.POSTS + `/${post_id}`
  );
  return data as boolean;
};
