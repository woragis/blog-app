import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPostAPI,
  getPostAPI,
  getPostsAPI,
  updatePostAPI,
  deletePostAPI,
} from "./postsAPI";
import {
  CreatePostRequest,
  PostResponse,
  PostsState,
  UpdatePostRequest,
} from "../../types/posts.types";

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (
    payload: { token: string; post: CreatePostRequest },
    { rejectWithValue }
  ) => {
    try {
      const newPostId = await createPostAPI(payload.token, payload.post);
      return newPostId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create new post"
      );
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (token: string, { rejectWithValue }) => {
    try {
      const posts = await getPostsAPI(token);
      return posts as PostResponse[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get posts"
      );
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    payload: { token: string; post_id: number; post: UpdatePostRequest },
    { rejectWithValue }
  ) => {
    try {
      const post = await updatePostAPI(
        payload.token,
        payload.post_id,
        payload.post
      );
      return post as PostResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update post"
      );
    }
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (payload: { token: string; post_id: number }, { rejectWithValue }) => {
    try {
      const post = await getPostAPI(payload.token, payload.post_id);
      return post as PostResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (payload: { token: string; post_id: number }, { rejectWithValue }) => {
    try {
      const deleted = await deletePostAPI(payload.token, payload.post_id);
      return deleted as boolean;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get posts cases
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || null;
      })

      // Create post cases
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || null;
      })

      // Get post cases
      .addCase(getPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || null;
      })

      // Update post cases
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || null;
      })

      // Delete post cases
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || null;
      });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
