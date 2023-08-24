import {createSlice} from "@reduxjs/toolkit";

//slice to initiate login and logout process in global state
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    username: "",
    data: {},
  },
  reducers: {
    login: (state, action) => {
      const user = {
        ...state,
        isLoggedIn: true,
        name: action.payload.name,
        username: action.payload.username,
      };
      return user;
    },
    logout: (state) => {
      window.open(
        "https://blogify-backend-zzfj.onrender.com/auth/logout",
        "_self"
      );

      return {...state, isLoggedIn: false, name: "", username: ""};
    },
    loadData: (state, action) => {
      //console.log(action.payload.data);
      return {...state, data: action.payload.data};
    },
  },
});

//for dispatching actions (logging in)
export const {login, logout, loadData} = userSlice.actions;

//for configure store
export default userSlice.reducer;
