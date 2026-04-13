import { stickyNav } from "@/src/common/utilits";
import { useEffect } from "react";
import DefaultHeader from "./DefaultHeader";

const Header = ({ header, transparent, headerTop, extarClass }) => {
  useEffect(() => {
    stickyNav(extarClass);
  }, []);

  switch (header) {
    case 1:
      return (
        <DefaultHeader
          transparent={transparent}
          headerTop={headerTop}
          extarClass={extarClass}
        />
      );

    default:
      return (
        <DefaultHeader
          transparent={transparent}
          headerTop={headerTop}
          extarClass={extarClass}
        />
      );
  }
};
export default Header;
