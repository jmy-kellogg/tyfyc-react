import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import extensions from "./extensions";
import ButtonMenu from "./ButtonMenu";

interface Props {
  content: string;
  onTextChange: (text: string) => void;
}

const RichEditor = ({ content, onTextChange }: Props) => {
  const formattedContent = content[0] === "<" ? content : `<p>${content}</p>`;
  const editor = useEditor({
    extensions,
    content: formattedContent,
  });

  useEffect(() => {
    return () => {
      if (editor) {
        onTextChange(editor.getHTML());
      }
    };
  }, [editor, onTextChange]);

  return (
    <>
      {editor && (
        <div className="w-full min-h-auto bg-white rounded-sm border-1 border-gray-300">
          <div className="px-3 py-1 border-b-1 border-gray-300">
            <ButtonMenu editor={editor} />
          </div>
          <div className="p-3">
            <EditorContent editor={editor} />
          </div>
        </div>
      )}
    </>
  );
};

export default RichEditor;
