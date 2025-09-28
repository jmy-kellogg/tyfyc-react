import React, { ReactElement, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  component: ReactElement;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, component }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} key={id} style={style} {...listeners} {...attributes}>
      {component}
    </div>
  );
};

export default SortableItem;
