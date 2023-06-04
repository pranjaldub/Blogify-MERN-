import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getBlogsById} from "../../service/api";
const Blog = () => {
  const {blogId} = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchBlog() {
    setLoading(true);
    const data = await getBlogsById(blogId);
    setBlog(data.data[0].blog);
    setLoading(false);
  }
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div>
          <div>{blog.heading}</div>
          <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
        </div>
      )}
    </div>
  );
};

export default Blog;
