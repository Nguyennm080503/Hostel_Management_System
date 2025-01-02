import React, { useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps extends Omit<ReactQuillProps, "onChange"> {
  onChange: (value: string) => void;
  value: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  onChange,
  value,
  ...props
}) => {
  const [editorHtml, setEditorHtml] = useState<string>(value);

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={(content) => {
          setEditorHtml(content);
          onChange(content);
        }}
        modules={quillModules}
        {...props}
      />
    </div>
  );
};

export default QuillEditor;