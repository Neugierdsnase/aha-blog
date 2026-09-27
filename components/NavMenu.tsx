import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cx } from "classix";

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
  const [openMenu, setOpenMenu] = useState<"nav" | "color" | null>(null);
  const isNavOpen = openMenu === "nav";

  return (
    <div className="relative flex">
      <div
        className={cx(
          "absolute right-0 top-full mt-2 grid w-max max-w-[calc(100vw-4rem)] overflow-hidden rounded-none bg-background shadow-lg transition-[grid-template-rows] duration-300 ease-out",
          "desktop:static desktop:mt-0 desktop:w-auto desktop:max-w-none desktop:border-0 desktop:bg-transparent desktop:shadow-none desktop:grid-rows-none desktop:transition-[grid-template-columns]",
          isNavOpen
            ? "grid-rows-[1fr] desktop:grid-cols-[1fr]"
            : "grid-rows-[0fr] desktop:grid-cols-[0fr]",
        )}
      >
        {isNavOpen &&
          <ul
            className="flex min-w-0 flex-col items-stretch gap-1 overflow-hidden p-1 desktop:flex-row desktop:items-center desktop:p-0"
          >
            {items.map((item) => (
              <li key={item.href}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start desktop:w-auto desktop:justify-center"
                  onClick={() => setOpenMenu(null)}
                >
                  <a
                    href={item.href}
                    aria-label={item.ariaLabel ?? item.label}
                    tabIndex={isNavOpen ? undefined : -1}
                  >
                    {item.label}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        }
      </div>
      <ButtonGroup>
        <Button
          variant="ghost"
          size="icon"
          aria-expanded={isNavOpen}
          aria-label={menuAriaLabel}
          onClick={() =>
            setOpenMenu((current) => (current === "nav" ? null : "nav"))
          }
        >
          {isNavOpen ? <X /> : <Menu />}
        </Button>
        <ColorModeToggle
          open={openMenu === "color"}
          onOpenChange={(open) => setOpenMenu(open ? "color" : null)}
        />
      </ButtonGroup>
    </div>
  );
};
