import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

interface Item {
  id: string;
  label: string;
  content: string;
}

function Accordion({ items }: { items: Item[] }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex: number) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nextIndex) {
        return -1;
      } else {
        return nextIndex;
      }
    });
  };

  const renderedItems = items.map(({ id, label, content }, index) => {
    const isExpanded = index === expandedIndex;
    const icon = <span className="text-2xl">
      {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
    </span>
    return (
      <div key={id}>
        <div className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer" onClick={() => handleClick(index)}>
          {label}
          {icon}
        </div>
        {isExpanded && <div className="border-b p-5">{content}</div>}
      </div>
    );
  });

  return <div className="border-x border-t rounded">{renderedItems}</div>;
}

export default Accordion;