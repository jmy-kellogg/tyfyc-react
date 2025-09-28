import React, { useEffect } from "react";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";

import EditBtnMenu from "./EditBtnMenu.tsx";
import extensions from "./extensions";
interface PopupEditorProps {
  content: string;
  handleTextChange: (text: string) => void;
}

const PopupEditor: React.FC<PopupEditorProps> = ({
  content,
  handleTextChange,
}) => {
  const formattedContent: string =
    content[0] === "<" ? content : `<p>${content}</p>`;
  const editor = useEditor({
    extensions,
    content: formattedContent,
  });

  const handleBlur = (): void => {
    if (editor) {
      const text: string = editor.getHTML();
      handleTextChange(text);
    }
  };

  useEffect((): void => {
    const formattedContent: string =
      content[0] === "<" ? content : `<p>${content}</p>`;
    editor?.commands.setContent(formattedContent);
  }, [content, editor]);

  return (
    <>
      {editor && editor.on("blur", handleBlur) && (
        <>
          <div className="bg-white">
            <div className="m-3">
              <EditorContent editor={editor} />

              <BubbleMenu editor={editor}>
                <div className="p-1 bg-white shadow-lg rounded-sm border-1 border-gray-400">
                  <EditBtnMenu editor={editor} />
                </div>
              </BubbleMenu>

              <FloatingMenu editor={editor}>
                <EditBtnMenu editor={editor} />
              </FloatingMenu>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PopupEditor;
