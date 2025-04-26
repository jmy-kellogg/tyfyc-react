import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import extensions from "./extensions";

interface Props {
  content: string;
}

const ReadOnly = ({ content }: Props) => {
  const formattedContent = content[0] === "<" ? content : `<p>${content}</p>`;
  const editor = useEditor({
    extensions,
    content: formattedContent,
    editable: false,
  });

  useEffect(() => {
    const formattedContent = content[0] === "<" ? content : `<p>${content}</p>`;
    editor?.commands.setContent(formattedContent);
  }, [content, editor]);

  return <>{editor && <EditorContent editor={editor} />}</>;
};

export default ReadOnly;
