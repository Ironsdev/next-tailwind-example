import { forEach, reduce } from "lodash";
import React, { DragEvent } from "react";

export const getNearestIndicator = (
  e: DragEvent,
  indicators: HTMLElement[]
) => {
  const el = reduce(
    indicators,
    (closest, child) => {
      const box = child.getBoundingClientRect();

      const offset = e.clientY - box.top;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );

  return el;
};

export const getIndicators = () => {
  return Array.from(
    document.querySelectorAll(
      `[data-column="destinations"]`
    ) as unknown as HTMLElement[]
  );
};

export const clearHighlights = (els?: HTMLElement[]) => {
  const indicators = els || getIndicators();

  forEach(indicators, (i) => {
    i.style.opacity = "0";
  });
};

export const highlightIndicator = (e: DragEvent) => {
  const indicators = getIndicators();

  clearHighlights(indicators);

  const el = getNearestIndicator(e, indicators);

  el.element.style.opacity = "1";
};

type DropIndicatorProps = {
  beforeId: string | null;
};

export const DropIndicator = ({ beforeId }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column="destinations"
      className="my-0.5 h-0.5 w-full bg-blue-400 opacity-0"
    />
  );
};
