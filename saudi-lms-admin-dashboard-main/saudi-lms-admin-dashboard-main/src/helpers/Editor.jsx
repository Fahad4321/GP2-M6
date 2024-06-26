import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ content, setContent }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      config={{
        placeholder: "Write Something...",
      }}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;
