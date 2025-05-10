import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";

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

  const handleBlur = () => {
    if (editor) onTextChange(editor.getHTML());
  };

  return (
    <>
      {editor && (
        <div
          className="w-full min-h-auto bg-white rounded-sm border-1 border-gray-300"
          onBlur={handleBlur}
        >
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
