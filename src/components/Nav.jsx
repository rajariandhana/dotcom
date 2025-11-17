import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Chip,
} from "@heroui/react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

const Nav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryMenuItems = [
    {
      label: "Projects",
      link: "/projects",
    },
    {
      label: "Experience",
      link: "/experience",
    },
    {
      label: "Photos",
      link: "/photos",
    },
  ];

  const secondaryMenuItems = [
    {
      label: "Try my AI Chatbot",
      link: "/chatbot",
    },
    {
      label: "Settings",
      link: "/settings",
    },
  ];

  return (
    <header className="sticky top-0 z-20 w-full">
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarBrand color="foreground">
            <Link to={"/"}>ralfazza.com</Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          {primaryMenuItems.map((item, index) => {
            let active = location.pathname.startsWith(item.link);
            return (
              <NavbarItem
                key={`${item.label}-${index}`}
                className={`${
                  isMenuOpen == false ? "hidden sm:flex" : "hidden"
                }`}
                isActive={active}
              >
                <Link to={item.link} className="nav-content-item">
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}

          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            justify="end"
          />
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem className="lg:ml-20 xl:ml-48" isActive={location.pathname === "/"}>
            <Link to={"/"} className="nav-menu-item">
              Home
            </Link>
          </NavbarMenuItem>
          {primaryMenuItems.map((item, index) => {
            let active = location.pathname.startsWith(item.link);
            return (
              <NavbarMenuItem className="lg:ml-20 xl:ml-48" key={`${item.label}-${index}`} isActive={active}>
                <Link to={item.link} className="nav-menu-item">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            );
          })}

          <div className="mt-8">
            {secondaryMenuItems.map((item, index) => {
              let active = location.pathname.startsWith(item.link);
              if (item.link === "/" && location.pathname !== "/") {
                active = false;
              }
              return (
                <NavbarMenuItem className="lg:ml-20 xl:ml-48"
                  key={`${item.label}-${index}`}
                  isActive={active}
                >
                  <Link to={item.link} className="nav-menu-item">
                    {item.label}{" "}
                    {item.label === "Try my AI Chatbot" ? (
                      <Chip color="primary" variant="flat" size="sm">
                        New!
                      </Chip>
                    ) : null}
                  </Link>
                </NavbarMenuItem>
              );
            })}
          </div>
        </NavbarMenu>
      </Navbar>
    </header>
  );
};
export default Nav;
