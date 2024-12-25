import { PostResponse } from "../../types/posts.types";
import ListedPost from "../ListedPost";
import { usePostListModel } from "./model";
import { PostsListContainer } from "./styles";

export const PostListView = ({
  posts,
}: ReturnType<typeof usePostListModel>) => {
  const postsComponent = [...posts, {} as PostResponse].map(
    ({ id, title, body, author_id, visibility, created_at, updated_at }) => {
      return <ListedPost key={id + "_post_on_list"} />;
    }
  );
  return <PostsListContainer>{postsComponent}</PostsListContainer>;
};
