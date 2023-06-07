import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getBlogsById, updateBlog} from "../../service/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MobileTextEditor from "../../component/editor/mobileEditor";
import {useSelector} from "react-redux";

const Blog = () => {
  const user = useSelector((state) => state.user);
  const {blogId} = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const [edit, toggleEdit] = useState(false);

  function toggleEditHandler() {
    toggleEdit((prevState) => !prevState);
  }
  const [data, setData] = useState({
    id: blogId,
    heading: "",
    description: "",
    content: "",
    category: "",
    author: "",
  });
  async function fetchBlog() {
    setLoading(true);
    const data = await getBlogsById(blogId);
    console.log("blogData", data);
    setBlog(data.data[0].blog);
    if (user.isLoggedIn) {
      setData({
        content: data.data[0].blog.content,
        heading: data.data[0].blog.heading,
        description: data.data[0].blog.description,
        author: data.data[0].blog.author,
        category: data.data[0].blog.category,
        id: blogId,
      });
    }
    setLoading(false);
  }
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    fetchBlog();
  }, []);

  async function updateHandler() {
    const updatedBlog = await updateBlog(data, user.username);
    console.log("updated", updatedBlog);
    setBlog(updatedBlog.data.blog);
    toggleEditHandler();
  }
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div style={{padding: 20}}>
          <div>{blog.heading}</div>
          {edit && (
            <div>
              {" "}
              <MobileTextEditor setBlog={setData} blog={data} />
              <button
                onClick={() => {
                  updateHandler();
                }}
              >
                update
              </button>
            </div>
          )}

          {!edit && (
            <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
          )}
          {blog.author === user.username && !edit && (
            <button onClick={() => toggleEditHandler()}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
