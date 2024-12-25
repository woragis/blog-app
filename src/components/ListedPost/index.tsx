import { useListedPostModel } from "./model";
import { ListedPostView } from "./view";

const ListedPost = () => {
  const model = useListedPostModel();

  return <ListedPostView {...model} />;
};

export default ListedPost;
