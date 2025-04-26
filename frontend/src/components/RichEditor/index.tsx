import { useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";

import extensions from "./extensions";
import ButtonMenu from "./ButtonMenu";

interface Props {
  content: string;
  handleTextChange: (text: string) => void;
}

const RichEditor = ({ content, handleTextChange }: Props) => {
  const formattedContent = content[0] === "<" ? content : `<p>${content}</p>`;
  const editor = useEditor({
    extensions,
    content: formattedContent,
  });

  const handleBlur = () => {
    if (editor) handleTextChange(editor.getHTML());
  };

  useEffect(() => {
    const formattedContent = content[0] === "<" ? content : `<p>${content}</p>`;
    editor?.commands.setContent(formattedContent);
  }, [content, editor]);

  return (
    <>
      {editor && editor.on("blur", handleBlur) && (
        <div className="w-full min-h-auto bg-white rounded-sm border-1 border-gray-300">
          <div className="p-1 bg-white rounded-t-sm border-b-1 border-gray-400">
            <ButtonMenu editor={editor} />
          </div>
          <div className="m-3">
            <EditorContent editor={editor} />
          </div>
          <BubbleMenu editor={editor}>
            <div className="p-1 bg-white shadow-lg rounded-sm border-1 border-gray-400">
              <ButtonMenu editor={editor} />
            </div>
          </BubbleMenu>
        </div>
      )}
    </>
  );
};

export default RichEditor;
