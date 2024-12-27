import { PostResponse } from "../../types/posts.types";

export const useListedPostModel = (post: PostResponse) => {
  return { ...post };
};
