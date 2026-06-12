import type { TagType } from '../types';
import {
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
} from 'react';
import { Check, Funnel } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><Funnel />Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((item) => {
          const isChecked = activeFilters.includes(item);

          return (
            <DropdownMenuItem key={item} onClick={() => handleFilterClick(item)}>
              {isChecked && <Check />}
              {item}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

