import React from "react";
import NavBar from "../component/navBar";
import Header from "../component/header";
import LanguageSwitcher from "../view/loca/LanguageSwitcher";

const AppLayout = ({ children }: any) => {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
      <div
        className="h-screen flex flex-row w-full font-[Poppins]!"
        // style={{ background: "red" }}
      >
        <div>{navOpen && <NavBar isNavOpen={navOpen} />}</div>

        <div className="flex flex-col flex-1 bg-amber-600/0">
          {/* HEADER */}
          <Header setIsOpen={() => setNavOpen(!navOpen)} />

          {/* overflow-auto */}
          <main className="flex-1 p-4 bg-[#fcfffc] overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <LanguageSwitcher />
    </>
  );
};

export default AppLayout;
