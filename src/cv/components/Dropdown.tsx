import type { TagType } from '../types';
import {
  useState,
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
} from 'react';
import { Check, Funnel } from 'lucide-react';

type DropdownProps = {
  options: TagType[];
  activeFilters: TagType[];
  setActiveFilters: Dispatch<SetStateAction<TagType[]>>;
};

export const Dropdown: FunctionComponent<DropdownProps> = ({
  options,
  activeFilters,
  setActiveFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFilterClick = (option: TagType) => {
    setActiveFilters((prev) => {
      if (prev.includes(option)) {
        return prev.filter((o) => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <div id="filter-dropdown-menu" className="dropdown-menu">
      <button
        type="button"
        id="filter-dropdown-menu-trigger"
        aria-haspopup="menu"
        aria-controls="filter-dropdown-menu-menu"
        aria-expanded="false"
        className="btn-outline"
        onClick={() => setIsOpen((p) => !p)}
      >
        <Funnel />
        Filter
      </button>
      {isOpen && (
        <div data-popover className="min-w-56">
          <div role="menu">
            <div role="group" aria-labelledby="filter-options">
              {options &&
                options.map((op) => {
                  const isChecked = activeFilters.includes(op);

                  return (
                    <div
                      key={op}
                      role="menuitemcheckbox"
                      className="w-full"
                      data-value={op}
                    >
                      <button
                        type="button"
                        className="flex h-full w-full gap-2"
                        onClick={() => handleFilterClick(op)}
                      >
                        <div className="flex size-4 items-center justify-center">
                          {isChecked && <Check />}
                        </div>
                        {op}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
