import HeroSection from "../../components/HeroSection";
import { useHomeModel } from "./model";

export const HomeView = ({ posts }: ReturnType<typeof useHomeModel>) => {
  const postsComponent = posts.map((post) => {
    return (
      <li key={`posts_post_${post.id}`}>
        <header>
          <h3>{post.title}</h3>
          <p>Author: {post.author_id}</p>
          <p>Post visibility: {post.visibility}</p>
        </header>
        <div>{post.body}</div>
        <footer>
          created at: {post.created_at}
          <br />
          updated at: {post.updated_at}
          <br />
          post id: {post.id}
        </footer>
      </li>
    );
  });
  return (
    <div>
      <HeroSection />
      <hr />
      <h1>Posts</h1>
      {postsComponent}
    </div>
  );
};
