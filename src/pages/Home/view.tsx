import HeroSection from "../../components/HeroSection";
import PostList from "../../components/PostList";
import { useHomeModel } from "./model";

export const HomeView = ({ posts }: ReturnType<typeof useHomeModel>) => {
  return (
    <div>
      <HeroSection />
      <hr />
      <h1>Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};
