import React from "react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const NavbarMenu: React.FC = () => {
  return (
    <nav className="">
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:block">
        <DesktopNav />
      </div>
    </nav>
  );
};

export default NavbarMenu;
