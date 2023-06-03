import React, {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MobileTextEditor({setBlog, blog}) {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{header: [1, 2, 3, false]}],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{list: "ordered"}, {list: "bullet"}, {indent: "-1"}, {indent: "+1"}],
      ["link", "image"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  useEffect(() => {
    console.log(blog);
  }, [blog]);
  return (
    <ReactQuill
      theme="snow"
      value={blog.content}
      onChange={(text) => {
        console.log(text);
        setBlog((prevState) => ({
          ...prevState,
          content: text,
        }));
      }}
      style={{height: "100%", width: "100%"}}
      modules={modules}
      formats={formats}
    />
  );
}
export default MobileTextEditor;
// toolbar: [
//     ["bold", "italic", "underline", "strike"], // toggled buttons
//     ["blockquote", "code-block"],

//     [{header: 1}, {header: 2}], // custom button values
//     [{list: "ordered"}, {list: "bullet"}],
//     [{script: "sub"}, {script: "super"}], // superscript/subscript
//     [{indent: "-1"}, {indent: "+1"}], // outdent/indent
//     [{direction: "rtl"}], // text direction

//     [{size: ["small", false, "large", "huge"]}], // custom dropdown
//     [{header: [1, 2, 3, 4, 5, 6, false]}],

//     [{color: []}, {background: []}], // dropdown with defaults from theme
//     [{font: []}],
//     [{align: []}],

//     ["clean"], // remove formatting button
//   ],
// };
