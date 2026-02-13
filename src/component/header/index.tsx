import { Hamburger, Tooltip } from "@fluentui/react-components";
import type React from "react";

interface Prop {
  setIsOpen: () => void;
}

const Header: React.FC<Prop> = ({ setIsOpen }) => {
  return (
    <>
      <header
        className={
          "h-[8.3%] sticky top-0 z-50 backdrop-blur-sm bg-white/50 py-1 px-4 border-b flex flex-row items-center"
        }
      >
        <div>
          <Tooltip content="Close Navigation" relationship="label">
            <Hamburger onClick={setIsOpen} 
            />
            
          </Tooltip>
        </div>
      </header>
    </>
  );
};

export default Header;
