'use client'
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function EditorForm({dataSet}) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      const dataForm = editorRef.current.getContent()
      console.log(dataForm)
      console.log(editorRef.current.getContent());
      console.log(editorRef.current)
      dataSet(dataForm)
    }
  };
  return (
    <>
      <Editor
        apiKey="pmg6n3xmbax2fb5hniqqejytfu1w1v0xszyln6rwlgy3yo2e"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<h2>Alcance de la Licitación:</h2></br></br></br></br></br><h2>Requisitos:</h2>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button
        className="bg-primary-500 text-white p-2 rounded-sm font-semibold"
        onClick={log}
      >
        Guardar
      </button>
    </>
  );
}
