import React, { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import { SortableList } from "@/types";

interface DndSortProps {
  list: SortableList;
  direction: "horizontal" | "vertical";
  onSort: (list: SortableList) => void;
}

const DndSort: React.FC<DndSortProps> = ({ list, direction, onSort }) => {
  const [sortableList, setSortableList] = useState<SortableList>(list);
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const getItemPos = (id: UniqueIdentifier): number => {
    return sortableList.findIndex((item) => item.id === id);
  };

  const handelDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const originalPos = getItemPos(active.id);
      const newPos = getItemPos(over.id);
      onSort(arrayMove(sortableList, originalPos, newPos));
      setSortableList((sortableList: SortableList): SortableList => {
        return arrayMove(sortableList, originalPos, newPos);
      });
    }
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handelDragEnd}
        sensors={[mouseSensor]}
      >
        <SortableContext
          items={sortableList}
          strategy={
            direction === "horizontal"
              ? horizontalListSortingStrategy
              : verticalListSortingStrategy
          }
        >
          {sortableList.map(({ id, component }) => (
            <SortableItem key={id} id={id} component={component} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default DndSort;
