import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultipleOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultipleOpen = false }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(itemId => itemId !== id));
    } else {
      if (allowMultipleOpen) {
        setOpenItems([...openItems, id]);
      } else {
        setOpenItems([id]);
      }
    }
  };

  return (
    <div role="presentation" className="w-full">
      {items.map(({ id, title, content, disabled }) => (
        <div key={id} className="border-b border-gray-300">
          <button
            type="button"
            aria-expanded={openItems.includes(id)}
            aria-controls={`${id}-content`}
            id={`${id}-header`}
            disabled={disabled}
            onClick={() => toggleItem(id)}
            className={`w-full text-left px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <span>{title}</span>
            <span>{openItems.includes(id) ? '-' : '+'}</span>
          </button>
          {openItems.includes(id) && (
            <div
              id={`${id}-content`}
              role="region"
              aria-labelledby={`${id}-header`}
              className="px-4 py-3 bg-gray-50"
            >
              {content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;