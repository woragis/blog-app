import { PostResponse } from "../../types/posts.types";

export const usePostListModel = (posts: PostResponse[]) => {
  return { posts };
};
