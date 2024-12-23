import { ReduxStatus } from "./redux.types";

export enum PostVisibility {
  Visible = "visible",
  Hidden = "hidden",
  Private = "private",
}

export interface PostResponse {
  id: number;
  title: string;
  body: string;
  author_id: string;
  visibility: string;
  created_at: string;
  updated_at: string;
}

export interface PostsState {
  posts: PostResponse[];
  post: PostResponse | null;
  status: ReduxStatus;
  error: string | null;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  visibility: PostVisibility;
}
export interface UpdatePostRequest extends CreatePostRequest {}
