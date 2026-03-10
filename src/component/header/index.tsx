import { Hamburger, Tooltip } from "@fluentui/react-components";
import type React from "react";
import { useEffect, useState } from "react";

interface Prop {
  setIsOpen: () => void;
}

const Header: React.FC<Prop> = ({ setIsOpen }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  function setLiveTime() {
    setTime(new Date().toLocaleTimeString());
  }

  function displayClock() {
    setDate(new Date().toDateString());
  }

  useEffect(() => {
    setInterval(setLiveTime, 1000);
    setInterval(displayClock, 1000);
  }, []);

  return (
    <>
      <header
        className={
          "h-[8.3%] sticky top-0 z-50 backdrop-blur-sm bg-white/50 py-1 px-4 border-b flex flex-row items-center"
        }
      >
        <div className={"flex-1 font-Euclid flex flex-row items-center"}>
          <div className="mr-5">
            <Tooltip content="Close Navigation" relationship="label">
              <Hamburger onClick={setIsOpen} />
            </Tooltip>
          </div>

          <div className={"flex flex-row"}>
            <div
              className={
                "flex flex-row cursor-pointer p-1 rounded-lg bg-gray-100 mr-3 text-sm"
              }
            >
              {/* <CiCalendarDate size={22} className={"mr-1"}/> */}
              {date}
            </div>

            <div
              className={
                "flex flex-row cursor-pointer p-1 rounded-lg bg-gray-100 mr-3 text-sm"
              }
            >
              {/* <CiClock2 size={22} className={"mr-1"}/> */}
              {time}
            </div>
          </div>
        </div>

        <div
          className={
            "relative h-full w-max flex flex-row items-center justify-between"
          }
        >
          <img
            src={`https://res.cloudinary.com/dbqbeuvaw/image/upload/v1772346186/axvb52mldr9vt9jgjz1t.jpg`}
            className={
              "w-11 h-11 object-fill bg-center bg-cover rounded-[100%] mr-3"
            }
            alt={"user"}
            title={"profile photo"}
          />

          <div className="leading-4 mr-3 font-Euclid sm:block hidden">
            <h4 className="font-[600]">Dhanu</h4>
            <span className="text-xs text-gray-600">dhanu909ab@gmail.com</span>
          </div>

          {/* <BiSolidChevronDown className={"cursor-pointer"} size={22} /> */}

          {/*<div className={"h-full w-12 bg-[url(src/assets/images/people/1.jpg)] object-fill bg-center bg-cover rounded-[100%]"}>*/}

          {/*</div>*/}
        </div>
      </header>
    </>
  );
};

export default Header;
