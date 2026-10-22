import type { LanguageType, TagType } from "../types";
import {
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
} from "react";
import { Languages } from "lucide-react";
import { Dropdown } from "./Dropdown";

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
    <div className="navbar w-full flex-row items-center justify-between bg-base-100 p-8">
      <div className="flex gap-8 overflow-clip py-4">
        <p className="font-display text-3xl text-trim-both animated-heading hide-if-no-scroll-timeline">
          Konstantin Kovar
        </p>
        <p className="font-serif text-2xl animated-tagline hidden lg:block text-base-content/60 hide-if-no-scroll-timeline">
          Curriculum Vitae
        </p>
      </div>
      <div className="flex gap-2 py-4">
        <Dropdown
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          options={filterOptions}
        />
        <div
          className="tooltip tooltip-bottom"
          data-tip="Toggle German/English"
        >
          <button
            type="button"
            className="btn btn-outline"
            aria-label="Toggle between German and English"
            onClick={handleLanguageToggle}
          >
            <Languages />
          </button>
        </div>
      </div>
    </div>
  );
};
