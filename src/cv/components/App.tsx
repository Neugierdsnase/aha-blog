import { useState } from "react";
import type { LanguageType, TagType } from "../types";
import data from "../data";
import { ALL_TAGS } from "../constants";
import { Header } from "./Header";
import { CvItemCard } from "./Card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Hero } from "./Hero";

export const App = () => {
  const [activeFilters, setActiveFilters] = useState<TagType[]>([
    "frontend",
    "backend",
    "devops/sre",
    "tech-health",
    "consulting",
  ]);

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>("en");

  const filteredJobItems = data.cvJobItems.items.filter((item) =>
    item.tags?.some((tag) => activeFilters.includes(tag)),
  );
  const filteredEduItems = data.cvEduItems.items.filter((item) =>
    item.tags?.some((tag) => activeFilters.includes(tag)),
  );

  return (
    <TooltipProvider>
      <div className="body mx-auto grid grid-cols-12 gap-4 w-11/12 md:w-5/6 **:print:bg-white **:print:text-black">
        <div className="col-span-full sticky top-4 z-1 mb-8 print:hidden">
          <Header
            filterOptions={ALL_TAGS}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            setActiveLanguage={setActiveLanguage}
          />
        </div>

        <Hero activeLanguage={activeLanguage} />

        <hr className="col-span-full" />
        <main className="gap-4 grid flex-col col-span-full lg:grid-cols-2 lg:[&>.card]:even:translate-y-14">
          {filteredJobItems.map((item) => (
            <CvItemCard
              key={item.label.en + item.time?.from}
              activeLanguage={activeLanguage}
              item={item}
            />
          ))}
          {filteredEduItems.map((item) => (
            <CvItemCard
              key={item.label.en + item.time?.from}
              activeLanguage={activeLanguage}
              item={item}
            />
          ))}
        </main>
      </div>
    </TooltipProvider>
  );
};
