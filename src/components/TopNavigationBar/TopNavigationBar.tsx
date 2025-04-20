import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TopNavigationBarProps {
  items: NavItem[];
  onItemSelect?: (id: string) => void;
  selectedId?: string;
}

const TopNavigationBar: React.FC<TopNavigationBarProps> = ({ items, onItemSelect, selectedId }) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <ul className="flex space-x-4 px-4 py-3">
        {items.map(({ id, label, href, icon, disabled }) => {
          const isSelected = selectedId === id;
          return (
            <li key={id}>
              <a
                href={href}
                onClick={(e) => {
                  if (disabled) {
                    e.preventDefault();
                    return;
                  }
                  onItemSelect && onItemSelect(id);
                }}
                className={`inline-flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={isSelected ? 'page' : undefined}
                aria-disabled={disabled}
              >
                {icon && <span>{icon}</span>}
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TopNavigationBar;