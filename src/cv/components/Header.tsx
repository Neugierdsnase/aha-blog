import type { LanguageType, TagType } from "../types";
import {
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
} from "react";
import { Languages } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { Button } from "@/components/ui/button";
import { Menubar } from "@/components/ui/menubar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HeaderProps = {
  filterOptions: TagType[];
  setActiveLanguage: Dispatch<SetStateAction<LanguageType>>;
  activeFilters: TagType[];
  setActiveFilters: Dispatch<SetStateAction<TagType[]>>;
};

export const Header: FunctionComponent<HeaderProps> = ({
  filterOptions,
  setActiveLanguage,
  activeFilters,
  setActiveFilters,
}) => {
  const handleLanguageToggle = () =>
    setActiveLanguage((prev) => (prev === "en" ? "de" : "en"));

  return (
    <Menubar className="flex flex-row items-center justify-between p-8 bg-background">
      <div className="flex gap-8 overflow-clip py-4">
        <p className="font-display text-3xl text-trim-both animated-heading hide-if-no-scroll-timeline">
          Konstantin Kovar
        </p>
        <p className="font-serif text-2xl animated-tagline hidden lg:block text-muted-foreground hide-if-no-scroll-timeline">
          Curriculum Vitae
        </p>
      </div>
      <div className="flex gap-2 py-4">
        <Dropdown
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          options={filterOptions}
        />
        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant="outline"
              aria-label="Toggle between German and English"
              data-side="bottom"
              onClick={handleLanguageToggle}
            >
              <Languages />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle German/English</TooltipContent>
        </Tooltip>
      </div>
    </Menubar>
  );
};
