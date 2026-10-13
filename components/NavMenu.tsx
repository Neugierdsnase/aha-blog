import { Menu } from "lucide-react";

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
}: NavMenuProps) => (
  <div className="navbar w-auto gap-1 p-0">
    <div className="dropdown dropdown-end desktop:hidden">
      <div
        tabIndex={0}
        role="button"
        aria-label={menuAriaLabel}
        className="btn btn-ghost btn-sm btn-square"
      >
        <Menu />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-10 mt-2 w-48 bg-base-100 p-1 shadow-lg"
      >
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-label={item.ariaLabel ?? item.label}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <ul className="menu menu-horizontal hidden gap-1 p-0 desktop:flex">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} aria-label={item.ariaLabel ?? item.label}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
