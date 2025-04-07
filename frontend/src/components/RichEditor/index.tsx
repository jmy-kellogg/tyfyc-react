// src/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import ButtonMenu from "./ButtonMenu";

// define your extension array
const extensions = [
  StarterKit,
  Focus.configure({
    className: "no-focus",
    mode: "all",
  }),
];

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

  return (
    <>
      {editor && editor.on("blur", handleBlur) && (
        <>
          <div className="w-full h-full bg-white rounded-sm border-1 border-gray-300">
            <div className="p-1 bg-white rounded-t-sm border-b-1 border-gray-400">
              <ButtonMenu editor={editor} />
            </div>
            <div className="m-3">
              <EditorContent editor={editor} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RichEditor;
