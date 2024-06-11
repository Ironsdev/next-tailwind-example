"use client";

import { FC, useState, DragEvent, Dispatch, SetStateAction } from "react";
import Card from "./Card";
import { filter, find, findIndex, map } from "lodash";
import { DEFAULT_CARDS } from "@/common/constants";
import {
  DropIndicator,
  clearHighlights,
  getIndicators,
  getNearestIndicator,
  highlightIndicator,
} from "@/common/helpers";

interface ColumnProps {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const Column: FC<ColumnProps> = ({ active, setActive }) => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  //drag event handlers for each case below
  const handleDragStart = (e: DragEvent, id: string) => {
    setActive(id);
    e.dataTransfer.setData("cardId", id);

    const el = document.getElementById(`${id}-draggable`);
    if (el) e.dataTransfer.setDragImage(el, 0, 0);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive("");
    clearHighlights();

    let tempEl = document.getElementById("draggable");
    if (tempEl?.parentNode) {
      tempEl.parentNode.removeChild(tempEl);
    }

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = find(copy, (c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer };

      copy = filter(copy, (c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = findIndex(copy, (el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  return (
    <div
      onMouseOut={() => setActive("")} //needed for case when leaving div/abandoning drag event
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className="bg-white text-black pt-3 pb-12 w-3/12 min-w-fit"
    >
      {map(cards, (cardProps) => {
        return (
          <Card
            active={active}
            key={cardProps.id}
            {...cardProps}
            handleDragStart={handleDragStart}
          />
        );
      })}
      <DropIndicator beforeId={null} />
    </div>
  );
};

export default Column;
