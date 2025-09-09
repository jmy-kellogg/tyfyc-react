import { ReactNode } from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";

import extensions from "./extensions";
import EditBtnMenu from "./EditBtnMenu.tsx";

interface Props {
  content: string;
  onTextChange: (text: string) => void;
  popupBtnMenu?: ReactNode;
}

const RichEditor = ({ content, onTextChange, popupBtnMenu }: Props) => {
  const formattedContent = content[0] === "<" ? content : `<p>${content}</p>`;
  const editor = useEditor({
    extensions,
    content: formattedContent,
    onUpdate({ editor }) {
      const text = editor.getHTML();
      onTextChange(text);
    },
  });

  return (
    <>
      {editor && (
        <div className="w-full min-h-auto bg-white rounded-sm border-1 border-gray-300">
          <div className="px-3 py-1 border-b-1 border-gray-300">
            <EditBtnMenu editor={editor} />
          </div>

          <div className="p-3">
            <EditorContent editor={editor} />
          </div>

          <BubbleMenu editor={editor}>
            <div className="w-max p-1 bg-white shadow-lg rounded-sm border-1 border-gray-400">
              {popupBtnMenu ? popupBtnMenu : <EditBtnMenu editor={editor} />}
            </div>
          </BubbleMenu>

          <FloatingMenu
            editor={editor}
            tippyOptions={{ placement: "bottom-start" }}
          >
            <div className="w-max p-1 bg-white shadow-lg rounded-sm border-1 border-gray-400">
              <EditBtnMenu editor={editor} />
            </div>
          </FloatingMenu>
        </div>
      )}
    </>
  );
};

export default RichEditor;
