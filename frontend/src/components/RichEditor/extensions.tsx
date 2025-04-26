import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

const extensions = [
  Document,
  Paragraph,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Bold,
  Italic,
  Underline,
  Strike,
  Highlight.configure({ multicolor: true }),
  ListItem,
  BulletList.configure({
    itemTypeName: "listItem",
    HTMLAttributes: {
      class: "bulletList",
    },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "taskList",
    },
  }),
  TaskItem.configure({
    nested: true,
  }),
  HorizontalRule.configure({
    HTMLAttributes: {
      class: "horizonRule",
    },
  }),
];

export default extensions;
