interface API_ENDPOINTS_INTERFACE {
  USERS: string;
  POSTS: string;
  LOGIN: string;
  REGISTER: string;
}

export const API_ENDPOINTS: API_ENDPOINTS_INTERFACE = {
  USERS: "/users",
  POSTS: "/blog/posts",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};
