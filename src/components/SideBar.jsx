import { useState, useEffect } from "react";
import Group from "../assets/Group.svg";
import Path from "../assets/path.svg";
import LogoImage from "../assets/Logo_icon.svg";
import UserImage from "../assets/user.png";

function SideBar() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-screen z-[999] lg:block">
        <div className="w-[103px] h-[100vh] bg-[#373B53] rounded-tr-[20px] rounded-br-[20px] flex flex-col items-center justify-between overflow-hidden">
          <div className="rounded-tr-[20px] flex justify-center w-full">
            <img src={LogoImage} alt="logo" className="w-full object-contain" />
          </div>

          <div className="flex flex-col items-center w-full gap-[30px] mb-6">
            <button
              onClick={() => setDark(!dark)}
              className="p-3 hover:bg-[#494E6E] rounded-full transition-colors"
            >
              <img
                src={dark ? Group : Path}
                alt="theme"
                className="w-5 h-5 filter brightness-150"
              />
            </button>

            <div className="w-full flex justify-center pt-8 border-t border-[#494E6E]">
              <div className="p-1 rounded-full border-2 border-[#494E6E]">
                <img
                  src={UserImage}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden w-full h-[72px] bg-[#373B53] fixed top-0 left-0 flex items-center justify-between px-4 z-50">
        <img src={LogoImage} alt="logo" className="w-6 h-6" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 hover:bg-[#494E6E] rounded-full transition-colors"
          >
            <img
              src={dark ? Group : Path}
              alt="theme"
              className="w-5 h-5 filter brightness-150"
            />
          </button>
          <div className="p-1 rounded-full ">
            <img
              src={UserImage}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
