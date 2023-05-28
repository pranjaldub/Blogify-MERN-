import {createSlice} from "@reduxjs/toolkit";

//slice to initiate login and logout process in global state
export const userSlice = createSlice({
  name: "user",
  initialState: {isLoggedIn: false, name: "", username: ""},
  reducers: {
    login: (state, action) => {
      const user = {
        isLoggedIn: true,
        name: action.payload.name,
        username: action.payload.username,
      };
      return user;
    },
    logout: (state) => {
      return {isLoggedIn: false, name: "", username: ""};
    },
  },
});

//for dispatching actions (logging in)
export const {login, logout} = userSlice.actions;

//for configure store
export default userSlice.reducer;
