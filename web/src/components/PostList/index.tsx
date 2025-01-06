import { PostResponse } from "../../types/posts.types";
import { usePostListModel } from "./model";
import { PostListView } from "./view";

const PostList = ({ posts }: { posts: PostResponse[] }) => {
  const model = usePostListModel(posts);

  return <PostListView {...model} />;
};

export default PostList;
