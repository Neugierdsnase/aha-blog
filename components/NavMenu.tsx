import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ColorModeToggle } from "@/src/components/ColorModeToggle";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

export type NavMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type NavMenuProps = {
  items: NavMenuItem[];
  menuAriaLabel?: string;
};

export const NavMenu = ({
  items,
  menuAriaLabel = "Toggle navigation",
}: NavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="nav-panel" data-state={isOpen ? "open" : "closed"}>
        <ul
          className="flex min-w-0 flex-col items-stretch gap-1 overflow-hidden p-1 desktop:flex-row desktop:items-center desktop:p-0"
          aria-hidden={!isOpen}
        >
          {items.map((item) => (
            <li key={item.href}>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start desktop:w-auto desktop:justify-center"
                onClick={() => setIsOpen(false)}
              >
                <a
                  href={item.href}
                  aria-label={item.ariaLabel ?? item.label}
                  tabIndex={isOpen ? undefined : -1}
                >
                  {item.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <ButtonGroup>
        <Button
          variant="outline"
          size="icon"
          aria-expanded={isOpen}
          aria-label={menuAriaLabel}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
        <ColorModeToggle />
      </ButtonGroup>
    </div>
  );
};
