import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";

interface Props {
  editor: Editor;
}

const EditBtnMenu = ({ editor }: Props) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        canHighlight: ctx.editor.can().chain().toggleHighlight().run() ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isTaskList: ctx.editor.isActive("taskList") ?? false,
        canTaskList: ctx.editor.can().chain().toggleTaskList().run() ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        // ToDo: expand functionality
        // isCode: ctx.editor.isActive("code") ?? false,
        // canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        // canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        // isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        // isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        // isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        // isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        // isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        // isBlockquote: ctx.editor.isActive("blockquote") ?? false,
      };
    },
  });

  return (
    <div className="flex">
      <button
        className={`${editorState.isHeading1 ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isHeading2 ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 19.5H16.5v-1.609a2.25 2.25 0 0 1 1.244-2.012l2.89-1.445c.651-.326 1.116-.955 1.116-1.683 0-.498-.04-.987-.118-1.463-.135-.825-.835-1.422-1.668-1.489a15.202 15.202 0 0 0-3.464.12M2.243 4.492v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isHeading3 ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isBold ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinejoin="round"
            d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isItalic ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803"
          />
        </svg>
      </button>
      <button
        className={`${editorState.isUnderline ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5"
          />
        </svg>
      </button>
      <button
        className={`${editorState.isStrike ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isHighlight ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleHighlight({ color: "#FAF594" }).run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
          />
        </svg>
      </button>

      <button
        className={`p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().setHorizontalRule().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      <button
        className={`${editorState.isBulletList ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isTaskList ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().toggleTaskList().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isHeading2 ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().setTextAlign("left").run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isHeading2 ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().setTextAlign("center").run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <button
        className={`${editorState.isHeading2 ? "bg-indigo-400 text-white " : ""}p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        onClick={() => {
          editor.chain().focus().setTextAlign("right").run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </button>
      <button
        className={`p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        disabled={!editorState.canUndo}
        onClick={() => {
          editor.chain().focus().undo().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </button>
      <button
        className={`p-1 mr-1 hover:bg-gray-200 hover:cursor-pointer`}
        disabled={!editorState.canRedo}
        onClick={() => {
          editor.chain().focus().redo().run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
          />
        </svg>
      </button>
    </div>
  );
};

export default EditBtnMenu;
