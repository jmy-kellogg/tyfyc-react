// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
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

const content = "<p>Hello World!</p>";

const RichEditor = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <>
      {editor && (
        <>
          <div className="w-100 h-100 bg-white">
            <div className="m-3">
              <EditorContent editor={editor} />
              <FloatingMenu editor={editor}>
                <ButtonMenu editor={editor} />
              </FloatingMenu>
              <BubbleMenu editor={editor}>
                <div className="p-1 bg-white shadow-lg rounded-sm border-1 border-gray-400">
                  <ButtonMenu editor={editor} />
                </div>
              </BubbleMenu>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RichEditor;
