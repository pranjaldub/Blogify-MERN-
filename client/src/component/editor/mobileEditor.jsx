import React, {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MobileTextEditor() {
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
    console.log(value);
  }, [value]);
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
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
