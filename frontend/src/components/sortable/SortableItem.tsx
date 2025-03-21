import { ReactElement } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: string;
  component: ReactElement;
}

function SortableItem({ id, component }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} key={id} style={style} {...listeners} {...attributes}>
      {component}
    </div>
  );
}

export default SortableItem;
