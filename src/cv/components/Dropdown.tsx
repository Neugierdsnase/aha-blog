import type { TagType } from '../types';
import {
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
} from 'react';
import { Check } from 'lucide-react';
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type DropdownProps = {
  options: TagType[];
  activeFilters: TagType[];
  setActiveFilters: Dispatch<SetStateAction<TagType[]>>;
};

export const Dropdown: FunctionComponent<DropdownProps> = ({ options, activeFilters, setActiveFilters }) => {
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
    <Combobox items={options}>
      <ComboboxInput placeholder="Filter" />
      <ComboboxContent>
        <ComboboxList>
          {(item) => {
            const isChecked = activeFilters.includes(item);

            return (
              <ComboboxItem key={item} value={item} onClick={() => handleFilterClick(item)}>
                {isChecked && <Check />}
                {item}
              </ComboboxItem>
            )
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

