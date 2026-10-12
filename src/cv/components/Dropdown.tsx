import type { TagType } from "../types";
import {
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
} from "react";
import { Check, Funnel } from "lucide-react";

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
  const handleFilterClick = (option: TagType) => {
    setActiveFilters((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-outline">
        <Funnel />
        Filter
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-10 mt-2 w-48 bg-base-100 p-1.5 shadow-lg"
      >
        {options.map((item) => {
          const isChecked = activeFilters.includes(item);

          return (
            <li key={item}>
              <button type="button" onClick={() => handleFilterClick(item)}>
                {isChecked && <Check size={14} />}
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
