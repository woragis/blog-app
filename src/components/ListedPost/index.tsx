import { PostResponse } from "../../types/posts.types";
import { useListedPostModel } from "./model";
import { ListedPostView } from "./view";

const ListedPost = (post: PostResponse) => {
  const model = useListedPostModel(post);

  return <ListedPostView {...model} />;
};

export default ListedPost;
