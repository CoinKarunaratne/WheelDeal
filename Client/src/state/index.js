import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  favoritePosts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      state.favoritePosts = [];
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFavoritePosts: (state, action) => {
      state.favoritePosts = action.payload.favoritePosts;
    },
  },
});

export const { setLogin, setLogout, setPosts, setUser, setFavoritePosts } =
  authSlice.actions;
export default authSlice.reducer;
