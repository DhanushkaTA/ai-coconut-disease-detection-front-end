import React from "react";
import NavBar from "../component/navBar";
import Header from "../component/header";

const AppLayout = ({ children }: any) => {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
      <div
        className="h-screen flex flex-row w-full font-[Poppins]!"
        style={{ background: "red" }}
      >
        <div>{navOpen && <NavBar isNavOpen={navOpen} />}</div>

        <div className="flex flex-col flex-1 bg-amber-600">
          {/* HEADER */}
          <Header setIsOpen={() => setNavOpen(!navOpen)} />

          <main className="flex-1 p-4 overflow-auto bg-white">{children}</main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
