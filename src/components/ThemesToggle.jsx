import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

function ThemesToggle() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.dataset.theme === "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  function toggleDarkMode() {
    setIsDark((prev) => !prev);
  }

  return (
    <div className="flex gap-5 items-center">
      <Button
        variant="ghost"
        className="text-[#7C5DFA] hover:bg-transparent"
        onClick={toggleDarkMode}
      >
        {isDark ? (
          <Moon className="w-[20px] h-[20px] " />
        ) : (
          <Sun className="w-[20px] h-[20px]" />
        )}
      </Button>
    </div>
  );
}

export default ThemesToggle;
