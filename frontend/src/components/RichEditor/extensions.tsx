import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

const extensions = [
  StarterKit,
  Underline,
  Highlight.configure({ multicolor: true }),
  TaskItem.configure({ nested: true }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "taskList",
    },
  }),
];

export default extensions;
