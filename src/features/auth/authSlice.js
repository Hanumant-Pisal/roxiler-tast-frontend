import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk, fetchMe, logoutThunk, changePasswordThunk } from "./authThunks";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  initialized: false, // after first /me call resolves (success or fail)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    _setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload.user;
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error?.message;
      })
      // signup
      .addCase(signupThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(signupThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload.user;
      })
      .addCase(signupThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error?.message;
      })
      // me
      .addCase(fetchMe.pending, (s) => {})
      .addCase(fetchMe.fulfilled, (s, a) => {
        s.user = a.payload?.user || null;
        s.initialized = true;
      })
      .addCase(fetchMe.rejected, (s) => {
        s.user = null;
        s.initialized = true;
      })
      // logout
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null;
      })
      // change password
      .addCase(changePasswordThunk.fulfilled, (s) => {
        // nothing else
      });
  },
});

export const { _setUser } = authSlice.actions;
export default authSlice.reducer;
