import { useEffect } from "react";
import { getPosts } from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useAppDispatch } from "../../features/hooks";

export const useHomeModel = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
  // const [posts, setPosts] = useState<PostResponse[]>([])
  const posts = useSelector((state: RootState) => state.posts.posts);
  useEffect(() => {
    console.log("Stored token: ", token);
    dispatch(getPosts(token));
  }, []);
  return { posts };
};
