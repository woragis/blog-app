import { PostResponse } from "../../types/posts.types";
import ListedPost from "../ListedPost";
import { usePostListModel } from "./model";
import { PostsListContainer } from "./styles";

export const PostListView = ({
  posts,
}: ReturnType<typeof usePostListModel>) => {
  const postsComponent = [...posts, {} as PostResponse].map((post) => {
    return <ListedPost key={post.id + "_post_on_list"} {...post} />;
  });
  return <PostsListContainer>{postsComponent}</PostsListContainer>;
};
