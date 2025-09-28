import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import extensions from "./extensions";

interface ReadOnlyProps {
  content: string;
}

const ReadOnly: React.FC<ReadOnlyProps> = ({ content }) => {
  const formattedContent: string = content[0] === "<" ? content : `<p>${content}</p>`;
  const editor = useEditor({
    extensions,
    content: formattedContent,
    editable: false,
  });

  useEffect((): void => {
    const formattedContent: string = content[0] === "<" ? content : `<p>${content}</p>`;
    editor?.commands.setContent(formattedContent);
  }, [content, editor]);

  return <>{editor && <EditorContent editor={editor} />}</>;
};

export default ReadOnly;
