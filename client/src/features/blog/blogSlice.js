import {createSlice} from "@reduxjs/toolkit";
import {getBlogs} from "../../service/api";
// async function fetchBlogs() {
//   return await getBlogs();
// }
//slice to initiate login and logout process in global state
export const blogSlice = createSlice({
  name: "blog",
  initialState: {blogs: []},
  reducers: {
    fetch: async (state) => {
      const blogs = await getBlogs();
      console.log("fetching redux", blogs.data);
      return {...state, blogs: blogs.data};
    },
  },
});

//for dispatching actions (logging in)
export const {fetch} = blogSlice.actions;

//for configure store
export default blogSlice.reducer;
