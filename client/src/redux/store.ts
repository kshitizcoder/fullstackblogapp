import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import { authSlice } from "./auth/authSlice";
import { userApi } from "./auth/userApi";
import { blogApi } from "./blog/blogApi";
import { categoryApi } from "./category/categoryApi";
import { homeApi } from "./home/homeApi";
import { commentApi } from "./comment/commentApi";
import { likeApi } from "./like/likeApi";
import { replyApi } from "./comment/replyApi";
import { savedBlogApi } from "./savedBlog/savedBlogApi";
import { adminApi } from "./admin/adminApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authSlice.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [replyApi.reducerPath]: replyApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [savedBlogApi.reducerPath]: savedBlogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userApi.middleware,
      blogApi.middleware,
      categoryApi.middleware,
      homeApi.middleware,
      commentApi.middleware,
      likeApi.middleware,
      replyApi.middleware,
      savedBlogApi.middleware,
      adminApi.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
