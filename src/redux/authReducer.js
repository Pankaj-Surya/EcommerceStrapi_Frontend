import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      //const us = action.payload
      //console.log(us)
     state.currentUser = action.payload;
     state.isFetching = false;
     state.error = false;
    },
    loginFailure: (state) => {
      state.error=true;
      state.isFetching=false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;